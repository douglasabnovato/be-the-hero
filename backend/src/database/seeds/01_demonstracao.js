/* Seed de demonstração: 2 ONGs e 4 casos fictícios para ver a lista cheia no web e no app (#29) */

/* Fictícios por construção: domínio reservado (RFC 2606) e DDD 00, que não existe. IDs fixos para entrar no web */
const ONGS = [
  { id: "de0000000000a001", name: "ONG Patas Fictícias", email: "contato@patas-ficticias.test", whatsapp: "00900000001", city: "Florianópolis", uf: "SC" },
  { id: "de0000000000a002", name: "Instituto Exemplo do Bem", email: "ola@instituto-exemplo.test", whatsapp: "00900000002", city: "Belo Horizonte", uf: "MG" },
];

const INCIDENTS = [
  { ong_id: ONGS[0].id, title: "Cão atropelado", description: "Precisa de cirurgia na pata traseira.", value: 120.5 },
  { ong_id: ONGS[0].id, title: "Ração para o abrigo", description: "Um mês de ração para 30 cães.", value: 450 },
  { ong_id: ONGS[1].id, title: "Material escolar", description: "Kits para 20 crianças do reforço escolar.", value: 300 },
  { ong_id: ONGS[1].id, title: "Conserto do telhado", description: "Telhas e mão de obra para a sala de aula.", value: 980.9 },
];

/* Os IDs da seed são públicos: nunca rodar contra o banco de produção */
function assertLocal(client) {
  if (client !== "better-sqlite3") throw new Error("Seed de demonstração só roda no SQLite local, nunca no banco de produção.");
}

/* Recria só as linhas da demonstração; não apaga ONGs cadastradas por outra pessoa */
async function seed(knex) {
  assertLocal(knex.client.config.client);
  const ids = ONGS.map((o) => o.id);
  await knex("incidents").whereIn("ong_id", ids).del();
  await knex("ongs").whereIn("id", ids).del();
  const created_at = new Date();
  await knex("ongs").insert(ONGS.map((o) => ({ ...o, created_at })));
  await knex("incidents").insert(INCIDENTS.map((i) => ({ ...i, created_at })));
}

module.exports = { seed, assertLocal, ONGS, INCIDENTS };
/* Fim de 01_demonstracao.js */
