const router = require('express').Router();

// Log des erreurs
router.use((err, req, res, next) => {
  console.log(err);
  // passage de l'erreur au prochain gestionnaire
  next(err);
});

// Erreurs AJAX, on doit retourner du json
router.use((err, req, res, next) => {
  if (req.xhr) {
    res.status(500).json({ error: err });
  } else {
    next(err);
  }
});
// Gestionnaire final
router.use((err, req, res, next) => {
  res.status(500).send('Oups désolé');
});

module.exports = router;
