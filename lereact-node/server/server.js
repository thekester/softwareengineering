const express = require('express');
const fs = require('fs');
const path = require('path');
const { readCSV } = require('./csvReader');
const app = express();
const port = process.env.PORT || 3001;

const csvDir = path.join(__dirname, 'data'); // Répertoire contenant les fichiers CSV

app.use(express.json());

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
      if(item.phone) {
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

app.listen(port, () => {
  console.log(`Serveur Node écoute sur le port ${port}`);
});
