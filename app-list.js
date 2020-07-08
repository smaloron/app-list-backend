const app = require('express')();

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs');
// création d'un flux d'octets dirigé vers un fichier
const morganStream = fs.createWriteStream('access.log', { flags: 'a' });

// Middlewares

app.use(morgan('short', { stream: morganStream }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(require('./routes/list'));
app.use('/profession', require('./routes/professions'));
app.use('/person', require('./routes/persons'));

// Gestion des erreurs
app.use(require('./routes/errors'));

app.listen(3000, () => console.log('server started'));
