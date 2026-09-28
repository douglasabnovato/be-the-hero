/* Configuração por variáveis de ambiente (12-Factor) */
require("dotenv").config();

/* Lê e valida a configuração */
function loadConfig(env = process.env) {
  const production = env.NODE_ENV === "production";
  const authSecret = env.AUTH_SECRET || (production ? "" : "dev-secret-troque-em-producao-0123456789");
  if (authSecret.length < 32) throw new Error("AUTH_SECRET precisa ter 32+ caracteres.");
  return {
    port: Number(env.PORT) || 3333,
    authSecret,
    tokenTtl: env.TOKEN_TTL || "7d",
    corsOrigins: (env.CORS_ORIGINS || "http://localhost:5173").split(",").map((s) => s.trim()).filter(Boolean),
  };
}

module.exports = { loadConfig };
/* Fim de config.js */
