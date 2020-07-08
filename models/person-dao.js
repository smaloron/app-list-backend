// Import du dao générique
const dao = require('./dao');

// Définir la table
dao.setTableName('persons');

dao.findOneDetailedById = async id => {
  const sql = 'SELECT * FROM view_person WHERE id= ?';
  const result = await dao.query(sql, [id]);
  return result[0][0];
};

dao.findAll = async () => {
  const sql = 'SELECT * FROM view_person';
  const result = await dao.query(sql);
  return result[0];
};

module.exports = dao;
