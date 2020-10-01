const request = require('supertest');
const app = require('../../src/app');
describe('ONG', () => {
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name:"APAD2",
                email:"contato@contato.test.br",
                whatsapp:"47000000000",
                city:"Rio de Janeiro",
                uf:"SC"
            })
    });
});