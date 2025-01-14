const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { readCSV } = require('./csvReader');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = process.env.PORT || 3001;

const csvDir = path.join(__dirname, 'data'); // Répertoire contenant les fichiers CSV

// Charger la documentation Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

app.use(express.json());

// Middleware multer pour traiter les fichiers envoyés dans les requêtes POST
const upload = multer({ storage: multer.memoryStorage() });

// Servir Swagger UI sur une route dédiée
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Endpoint pour lister tous les fichiers CSV dans le dossier data
 */
app.get('/api/files', async (req, res) => {
  try {
    // Vérifier que le répertoire existe
    await fs.promises.access(csvDir, fs.constants.R_OK);
    const files = await fs.promises.readdir(csvDir);
    const csvFiles = files.filter(file => file.endsWith('.csv'));
    res.json(csvFiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la lecture des fichiers CSV.' });
  }
});

/**
 * Endpoint pour lire un fichier CSV spécifique et renvoyer ses données
 */
app.get('/api/data', async (req, res) => {
  try {
    // Utilisation de path.basename pour éviter le path traversal
    const filename = path.basename(req.query.filename || 'data.csv');
    const filePath = path.join(csvDir, filename);
    
    // Vérifier si le fichier existe avant lecture
    await fs.promises.access(filePath, fs.constants.R_OK);
    
    const data = await readCSV(filePath);
    const processedData = data.map(item => {
      if (item.phone) {
        item.phone = item.phone.replace(/\D/g, '');
      }
      return item;
    });
    res.json(processedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la lecture du fichier CSV.' });
  }
});

/**
 * Nouveau endpoint pour recevoir un fichier CSV dans une requête POST
 */
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier envoyé.' });
    }

    const csvContent = req.file.buffer.toString('utf-8');
    const data = await readCSV(csvContent, true);
    const processedData = data.map(item => {
      if (item.phone) {
        item.phone = item.phone.replace(/\D/g, '');
      }
      return item;
    });

    res.json(processedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors du traitement du fichier CSV.' });
  }
});

// Démarrage du serveur uniquement si ce fichier est exécuté directement
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Serveur Node écoute sur le port ${port}`);
    console.log(`Swagger UI disponible sur http://localhost:${port}/api-docs`);
  });
}

// Exporter l'application pour les tests ou une utilisation en tant que module
module.exports = app;
