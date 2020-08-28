const express = require('express');
const app = express();
app.get('/', (req, res) =>{
    return res.json({
        evento: 'beHero',
        trainee: 'douglasabnovato'
    });
});
app.listen(3333);