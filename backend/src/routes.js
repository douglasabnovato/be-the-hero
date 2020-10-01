const express = require('express');
const { Joi, Segments, celebrate } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const { join } = require('./database/connection');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), OngController.create); 

routes.get('/ongs', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), OngController.index);   

routes.get('/profile', ProfileController.index); 

routes.post('/incidents', IncidentController.create); 
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;