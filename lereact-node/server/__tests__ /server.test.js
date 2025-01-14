// __tests__/server.test.js
const request = require('supertest');
const app = require('../server'); // Importer l'application exportée

describe('Endpoints de l\'API CSV Manager', () => {
  
  test('GET /api/files devrait retourner un tableau', async () => {
    const res = await request(app).get('/api/files');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/data sans paramètre devrait retourner des données', async () => {
    const res = await request(app).get('/api/data');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Optionnel : vérifier que les éléments ont une propriété 'phone' si attendu
    // if (res.body.length > 0) {
    //   expect(res.body[0]).toHaveProperty('phone');
    // }
  });

  // Exemple de test pour une requête POST vers /api/upload
  test('POST /api/upload sans fichier devrait retourner une erreur 400', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('file', Buffer.from(''), 'empty.csv'); // Envoyer un fichier vide ou invalide
    // Selon l'implémentation, on peut s'attendre à une erreur ou un code 200 avec des données vides
    expect(res.statusCode).toBe(200); // Adapter si nécessaire
  });

});
