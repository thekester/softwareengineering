const csv = require('csv-parser');
const { Readable } = require('stream');
const fs = require('fs');

function readCSV(input, isRaw = false) {
  return new Promise((resolve, reject) => {
    const results = [];
    let stream;

    if (isRaw) {
      // Si le contenu est brut, créer un flux à partir de la chaîne
      stream = Readable.from(input);
    } else {
      // Si c'est un chemin de fichier, créer un flux à partir du fichier
      stream = fs.createReadStream(input);
    }

    stream
      .pipe(csv())
      .on('data', data => results.push(data))
      .on('end', () => resolve(results))
      .on('error', err => reject(err));
  });
}

module.exports = { readCSV };
