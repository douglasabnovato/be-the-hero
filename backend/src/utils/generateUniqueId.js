const crypto = require('crypto');
/**
 * Teste unitário é para uma funcionalidade muito específica
 * criar id único 
 */
module.exports = function generateUniqueid(){
    return crypto.randomBytes(4).toString('HEX');
};