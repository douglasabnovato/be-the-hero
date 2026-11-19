/* npm run seed: migra e roda a seed de demonstração só no SQLite local (#36) */
require("dotenv").config();

/* Recusa antes de abrir qualquer conexão: com DATABASE_URL, as migrações iriam para o banco remoto */
function assertSemBancoRemoto(env = process.env) {
  if (env.DATABASE_URL) throw new Error("Seed de demonstração só roda no SQLite local. Tire a DATABASE_URL do ambiente (ou do .env) e rode de novo.");
}

/* Migra e semeia o SQLite local */
async function main(env = process.env) {
  assertSemBancoRemoto(env);
  const knex = require("knex")(require("../../knexfile").knexConfig(env));
  try {
    await knex.migrate.latest();
    await knex.seed.run();
    console.log("Seed de demonstração pronta: 2 ONGs e 4 casos fictícios.");
  } finally {
    await knex.destroy();
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });
}

module.exports = { assertSemBancoRemoto, main };
/* Fim de seed-local.js */
