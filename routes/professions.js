const router = require('express').Router();
const controller = require('../controllers/api-professions');

router.get('/', controller.getAll);
router.get('/:id([0-9]+)', controller.getOne);
router.get('/:name', controller.getOneByName);
router.post('/', controller.insertOne);

module.exports = router;
