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

// Endpoint pour afficher Swagger UI
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint pour lister tous les fichiers CSV dans le dossier data
app.get('/api/files', (req, res) => {
  fs.readdir(csvDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la lecture des fichiers CSV.' });
    }
    const csvFiles = files.filter(file => file.endsWith('.csv'));
    res.json(csvFiles);
  });
});

// Endpoint pour lire un fichier CSV spécifique et renvoyer ses données
app.get('/api/data', async (req, res) => {
  try {
    const filename = req.query.filename || 'data.csv'; // Nom du fichier passé en paramètre ou par défaut
    const filePath = path.join(csvDir, filename);
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

// Nouveau endpoint pour recevoir un fichier CSV dans une requête POST
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier envoyé.' });
    }

    // Lire et traiter le fichier CSV directement à partir du buffer
    const csvContent = req.file.buffer.toString('utf-8');
    const data = await readCSV(csvContent, true); // Adapter readCSV pour supporter le contenu brut
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

app.listen(port, () => {
  console.log(`Serveur Node écoute sur le port ${port}`);
  console.log(`Swagger UI disponible sur http://localhost:${port}/api-docs`);
});
