/**
 * Teste unitário teste algo muito específico
 * criar id único com teste unitário
 */

const crypto = require('crypto');

export default function generateUniqueid(){
    return crypto.randomBytes(4).toString('HEX');
};