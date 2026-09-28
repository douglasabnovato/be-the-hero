/* Ponto de entrada: aplica as migrações, sobe a API e encerra com elegância */
const { loadConfig } = require("./config");
const { createApp } = require("./app");
const { createConnection } = require("./database/connection");

/* Inicializa banco e servidor */
async function main() {
  const config = loadConfig();
  const db = createConnection();
  await db.migrate.latest();
  const server = createApp({ db, config }).listen(config.port, () => console.log(`API em http://localhost:${config.port}`));
  const stop = () => server.close(() => db.destroy().finally(() => process.exit(0)));
  process.on("SIGTERM", stop);
  process.on("SIGINT", stop);
}

main().catch((err) => {
  console.error("Falha ao iniciar:", err.message);
  process.exit(1);
});
/* Fim de server.js */
