const mysql = require('../database/mysql');
exports.getAll = async (req, res) => {
  const db = await mysql.db;
  const rows = await db.query('SELECT * FROM professions');
  res.json(rows[0]);
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  const db = await mysql.db;
  const rows = await db.query('SELECT * FROM professions WHERE id=?', [id]);

  if (rows[0].length === 0) {
    res.status(404).json({ message: 'Non trouvé' });
  }
  res.json(rows[0][0]);
};

/**
 * GET /profession/photographe
 */
exports.getOneByName = async (req, res) => {
  const name = req.params.name;
  const db = await mysql.db;
  const rows = await db.query(
    'SELECT * FROM professions WHERE profession_name=?',
    [name]
  );

  if (rows[0].length === 0) {
    res.status(404).json({ message: 'Non trouvé' });
  }
  res.json(rows[0][0]);
};

exports.insertOne = async (req, res) => {
  const data = {
    profession_name: req.body.profession,
  };
  const sql = 'INSERT INTO professions SET ?';
  const sql_test = 'SELECT id FROM professions WHERE profession_name = ?';
  const db = await mysql.db;

  // Tester l'existence de la profession
  const test = await db.query(sql_test, [data.profession_name]);
  if (test[0].length > 0) {
    res.status(200).json(test[0][0].id);
  } else {
    const result = await db.query(sql, [data]);
    res.status(200).json(result[0].insertId);
  }
};
