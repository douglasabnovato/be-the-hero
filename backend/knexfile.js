/* Configuração do Knex: SQLite (better-sqlite3) em desenvolvimento/testes e PostgreSQL quando DATABASE_URL existir */
require("dotenv").config();
const path = require("node:path");

const migrations = { directory: path.join(__dirname, "src", "database", "migrations") };

/* Escolhe o banco pela variável de ambiente */
function knexConfig(env = process.env) {
  if (env.DATABASE_URL) {
    return { client: "pg", connection: { connectionString: env.DATABASE_URL, ssl: env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false } }, pool: { min: 0, max: 5 }, migrations };
  }
  const filename = env.NODE_ENV === "test" ? ":memory:" : env.SQLITE_FILE || path.join(__dirname, "src", "database", "db.sqlite");
  return {
    client: "better-sqlite3",
    connection: { filename },
    useNullAsDefault: true,
    migrations,
    pool: { afterCreate: (conn, done) => { conn.pragma("foreign_keys = ON"); done(); } },
  };
}

module.exports = { development: knexConfig(), knexConfig };
/* Fim de knexfile.js */
