const fs = require('fs').promises;
const FILE_PATH = './data/list.json';

const getFileContent = (req, res, next) => {
  fs.readFile(FILE_PATH, 'utf8')
    .then(data => {
      // Stockage du fichier dessérialisé dans une variable de req
      req.list = JSON.parse(data.toString());
      next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};

const getOneById = (req, res, next) => {
  // Recherche de l'index en fonction de l'id
  const index = req.list.findIndex(item => item.id == req.params.id);
  req.itemIndex = index;
  next();
};

const processForm = (req, res, next) => {
  tobeSaved = false;
  if (req.method == 'POST') {
    const item = { item: req.params.name, id: new Date().getTime() };
    req.list.push(item);
    tobeSaved = true;
  } else if (req.method == 'DELETE') {
    console.log(req.params);
    req.list.splice(req.itemIndex, 1);
    tobeSaved = true;
  } else if (req.method == 'PUT') {
    console.log(req.params);
    req.list[req.itemIndex].item = req.params.name;
    tobeSaved = true;
  }

  // Sauvegarde seulement s'il y a lieu
  if (tobeSaved) {
    // Ecriture du fichier
    fs.writeFile(FILE_PATH, JSON.stringify(req.list)).catch(err => {
      return res.status(500).json({ message: err });
    });
  }
  console.log('prepare to next');
  // passage de la requête aux routes
  next();
};

const showList = (req, res) => {
  res.status(200).json(req.list);
};

const showOne = (req, res) => {
  res.status(200).json(req.list[req.itemIndex]);
};

module.exports = {
  getFileContent,
  getOneById,
  processForm,
  showList,
  showOne,
};
