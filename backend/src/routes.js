const express = require('express');
const routes = express.Router();

routes.post('/users', (request, response) =>{
    const body = request.body; 
    return response.json({
        evento: 'Be The Hero',
        trainee: 'douglasabnovato'
    });
});

module.exports = routes;