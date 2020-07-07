// Importation du module Express
const express = require('express');
const { request, response } = require('express');
const fs = require('fs').promises;

// Création de l'application
// en exécutant la fonction express
const app = express();

app.get('/hello/test/a-la-con', (request, response) => {
  response.status(200).send('Un test');
});

app.get('/hello/:id([0-9]+)/:age([0-9]+)', (request, response) => {
  response.status(200).send(`<h1>Hello votre id est ${request.params.id} 
                              vous avez ${request.params.age} ans </h1>`);
});

app.get('/hello/:name/:age', (request, response) => {
  response.status(200).send(`<h1>Hello ${request.params.name} 
                              vous avez ${request.params.age} ans </h1>`);
});

app.get('/hello', (request, response) => {
  const name = request.query.name || 'inconnu';
  response.status(200).send(`Hello ${name}`);
});

app.get('/article/:title', (request, response) => {
  const page = request.query.page || 1;
  const title = request.params.title;
  response.status(200).send(`article ${title} page ${page}`);
});

app.get('/addition/:n1([0-9]+)/:n2([0-9]+)', (request, response) => {
  const result = parseInt(request.params.n1) + parseInt(request.params.n2);
  response.status(200).send(` la résultat est : ${result}`);
});

app.get('/division/:n1([0-9]+)/:n2([1-9]+)', (request, response) => {
  const result = request.params.n1 / request.params.n2;
  response.status(200).send(` la résultat est : ${result}`);
});

app.get('/file/:fileName', async (request, response) => {
  // Chemin du fichier
  const path = './data/' + request.params.fileName;

  try {
    // Lecture du fichier
    const fileContent = await fs.readFile(path, 'utf8');
    response.status(200).send(fileContent);
  } catch (err) {
    // Erreur ENOENT = fichier introuvable
    if (err.code === 'ENOENT') {
      response.status(404).send('Le fichier est introuvable');
    } else {
      response.status(500).send('Impossible de lire le fichier');
    }
  }
});

app.get('/user', (req, res) => {
  res.status(200).json({ userName: 'Jane', id: 1 });
});

// Lancement du serveur
app.listen(3000, () => console.log('server started'));
