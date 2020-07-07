const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Modèle
const users = [
  { id: 5, name: 'Joe' },
  { id: 3, name: 'Jane' },
  { id: 2, name: 'Clémentine' },
  { id: 8, name: 'Sidonie' },
];

// Middlewares

// Sécurisation avec une clef d'API
app.use('/user*', (req, res, next) => {
  if (req.query.KEY === '123') {
    next();
  } else {
    res.status(403).json({ message: 'Clef API non valide' });
  }
});

// gestion des données postées

// Données provenant d'un requête ajax
app.use(bodyParser.json());

// Données provenant d'un formulaire web
app.use(bodyParser.urlencoded({ extended: true }));

// Exposition des ressources statiques
app.use(express.static('public'));
app.use('/files', express.static('downloads'));

// Autorisation des requêtes provenant d'un  autre domaine
app.use(cors());

// Middleware personnalisé pour ajouter la date
// qui sera disponible pour toutes les routes
app.use((req, res, next) => {
  req.now = new Date().toLocaleDateString();
  next();
});
// Middelware qui recherche un utilisateur en fonction de son id
// et injecte l'index dans le tableau ainsi que l'objet user dans la requête
app.use('/user/:id([0-9]+)', (req, res, next) => {
  // Recherche l'utilisateur en fonction de son index
  const index = users.findIndex(item => item.id == req.params.id);

  if (index === -1) {
    res.status(404).send('Utilisateur inconnu');
  } else {
    req.user = users[index];
    req.userIndex = index;
    next();
  }
});

// Définition des routes

app.get('/user', (req, res) => {
  res.status(200).json({ userList: users, currentDate: req.now });
});

// Obtention d'un utilisateur en fonction de son id
app.get('/user/:id([0-9]+)', (req, res) => {
  // Recherche de l'utilisateur
  res.status(200).json(req.user);
});

// Obtention d'un utilisateur en fonction de son nom
app.get('/user/:name', (req, res) => {
  // Recherche de l'utilisateur
  const user = users.find(item => item.name == req.params.name);
  if (!user) {
    return res.status(404).send('Utilisateur inconnu');
  }
  res.status(200).json(user);
});

// Suppression d'un utilisateur en fonction de son id
app.delete('/user/:id([0-9]+)', (req, res) => {
  // suppression à l'index trouvé
  const deleted = users.splice(req.userIndex, 1);
  res.status(200).json({ message: 'Utilisateur supprimé', user: deleted });
});

// Ajout d'un utilisateur
app.post('/user', (req, res) => {
  // Création de l'utilisateur
  const user = { name: req.body.name, id: new Date().getTime() };
  // Ajout de l'utilisateur au tableau
  users.push(user);
  // Envoi de la réponse
  res.status(200).json({ message: 'Utilisateur ajouté', user: user });
});

// Modification d'un utilisateur
app.put('/user/:id([0-9]+)', (req, res) => {
  req.user.name = req.body.name;
  // redirection vers la liste des utilisateurs
  res.redirect('/user');
});

app.listen(3000, () => console.log('server started'));

$.post('http://localhost:3000/list/java');

$.post('http://localhost:3000/list', { item: 'java' });
