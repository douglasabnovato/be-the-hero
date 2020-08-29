const express = require('express');
const app = express();

app.use(express.json());
 
app.post('/users', (request, response) =>{
    const body = request.body; 
    return response.json({
        evento: 'Be The Hero',
        trainee: 'douglasabnovato'
    });
});
app.listen(3333);