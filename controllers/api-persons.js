const dao = require('../models/person-dao');

exports.getAll = async (req, res) => {
  const rows = await dao.findAll();
  res.json(rows);
};

exports.getOne = async (req, res) => {
  const rows = await dao.findOneDetailedById(req.params.id);
  res.status(200).json(rows);
};

/**
 * GET /profession/photographe
 */
exports.getOneByName = async (req, res) => {
  const rows = await dao.findOneBy('person_name', req.params.name);
  res.status(200).json(rows);
};

exports.insertOne = async (req, res) => {
  const data = {
    person_name: req.body.name,
    first_name: req.body.firstName,
    profession_id: req.body.professionId,
  };
  // Tester l'existence de la profession
  const test = await dao.findOneBy('person_name', data.person_name);
  if (test && 'id' in test) {
    res.status(200).json({ id: test.id });
  } else {
    const result = await dao.insertOne(data);
    console.log(result);
    res.status(200).json({ id: result.insertId });
  }
};

exports.deleteOne = async (req, res) => {
  const result = await dao.deleteOneById(req.params.id);
  res.status(200).json(result);
};

exports.updateOne = async (req, res) => {
  const data = req.body;
  const result = await dao.updateOne(data, req.params.id);
  res.status(200).json(result);
};
