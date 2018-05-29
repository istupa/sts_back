const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

const app = express();

// require controller dep
// try to separate your app by small parts, its scalable
const subjects = require('./controllers/subjects.controller');
const relations = require('./controllers/relations.controller');

//configure app
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//create static dir for html docs, styles etc
//app.use(express.static(`${__dirname}/public`));

//use router for subjects
app.use('/subjects', subjects);
app.use('/relations', relations);

//global err handling
app.use((err, req, res, next) => res.status(500).send(err.message));

//starting
app.listen(config.get('port'), () => console.log('App listening on port 5000'));