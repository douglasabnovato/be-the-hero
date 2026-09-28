/* Sessão da ONG no navegador (token e nome), com acesso ao storage protegido */
const KEY = "bethehero.session";

/* Sessão salva ou null */
export function getSession() {
  try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; }
}

/* Guarda a sessão após o logon */
export function saveSession(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage indisponível */ }
}

/* Encerra a sessão */
export function clearSession() {
  try { localStorage.removeItem(KEY); } catch { /* nada a limpar */ }
}
/* Fim de session.js */
