/* Cria a conexão Knex a partir da configuração do ambiente */
const knex = require("knex");
const { knexConfig } = require("../../knexfile");

/* Nova instância (os testes usam uma por suíte, em memória) */
function createConnection(env = process.env) {
  return knex(knexConfig(env));
}

module.exports = { createConnection };
/* Fim de connection.js */
