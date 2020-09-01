const connection = require('../database/connection');
const { create } = require('./OngController');
module.exports = {
    async create(request, response) {
        const { title, descript, value } = request.body;
        //cabeçalho: autenticação do usuário
        const ong_id = request.headers.authorization;
        const [ id ] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    }
};