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
 * Request Body: o corpo da requisição, utilizado para criar ou alterar recursos
 */

 /**
  * Tipos de Banco de dados
  */

app.get('/users/:id', (request, response) =>{
    const params = request.params;
    console.log(params);
    return response.json({
        evento: 'Be The Hero',
        trainee: 'douglasabnovato'
    });
});
app.listen(3333);