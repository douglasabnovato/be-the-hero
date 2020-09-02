const connection = require('../database/connection');
const { response } = require('express');

module.exports = {
    async create(request, response){
        const { id } = request.body;
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        if (!ong){
            return response.status(400).json({ error: "No ONG found with thi ID." })
        }
        return response.json(ong);
    }    
}