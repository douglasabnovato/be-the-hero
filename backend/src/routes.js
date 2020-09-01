const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/incidentController');
const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);                                                                             
routes.post('/incidents'); 

module.exports = routes;