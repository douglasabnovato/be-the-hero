/* Gera o ID de acesso da ONG: 16 caracteres hexadecimais (64 bits), antes eram 8 (32 bits, fácil de adivinhar) */
const crypto = require("node:crypto");

/* ID aleatório criptograficamente seguro */
module.exports = function generateUniqueId() {
  return crypto.randomBytes(8).toString("hex");
};
/* Fim de generateUniqueId.js */
