const express = require('express');
const app = express();

/**
 * Rota e Recurso
 */

 /**
  * Métodos HTTP:
  * 
  * GET: buscar uma informação do back-end
  * POST: criar uma informação no back-end
  * PUT: alterar uma informação no back-end
  * DELETE: deletar uma informação no back-end
  */

/**
 * Tipos de Parâmetros
 * 
 * Query Params: parâmetros nomeados enviados na rota após "?" (filtros e paginação)
 * Route Params: parâmetros utilizados para identificar recursos
 * Request Body: o corpo da requisição
 */
app.get('/users', (request, response) =>{
    const params = request.query;
    console.log(params);
    return response.json({
        evento: 'BeTheHero',
        trainee: '@douglasabnovato'
    });
});
app.listen(3333);