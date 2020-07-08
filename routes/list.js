const router = require('express').Router();
const controller = require('../controllers/api-list-controllers');

// Lecture du fichier json pour toutes les routes
router.use('/list*', controller.getFileContent);

// Recherche d'un élément dans la liste
router.use('/list/:id([0-9]+)*', controller.getOneById);

const changeRoutes = [
  '^/list/:name$',
  '^/list/:id([0-9]+)$',
  '^/list/:id([0-9]+)/:name$',
];
// Traitement des données pour ajout, suppression ou modification
router.use(changeRoutes, controller.processForm);

// routes

router.get('/list', controller.showList);
router.get('/list/:id([0-9]+)', controller.showOne);
router.put('/list/:id([0-9]+)/:name', controller.showList);
router.delete('/list/:id([0-9]+)', controller.showList);
router.post('/list/:name', controller.showList);

module.exports = router;
