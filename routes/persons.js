const router = require('express').Router();
const controller = require('../controllers/api-persons');

router.get('/', controller.getAll);
router.get('/:id([0-9]+)', controller.getOne);
router.get('/:name', controller.getOneByName);
router.post('/', controller.insertOne);
router.delete('/:id([0-9]+)', controller.deleteOne);
router.put('/:id([0-9]+)', controller.updateOne);

module.exports = router;
