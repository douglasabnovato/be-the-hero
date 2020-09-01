const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const routes = express.Router();

routes.post('/ongs', OngController.create); 
routes.get('/ongs', OngController.index);   

routes.post('/incidents', IncidentController.create); 
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;