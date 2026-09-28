/* Cliente HTTP: URL por VITE_API_URL, token Bearer e mensagens de erro da API */
import { clearSession, getSession } from "./session";

export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3333").replace(/\/$/, "");

/* Chama a API e devolve o JSON (ou null em 204) */
export async function api(path, { method = "GET", body } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getSession()?.token;
  if (token) headers.Authorization = `Bearer ${token}`;
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  } catch {
    throw Object.assign(new Error("Sem conexão com o servidor. Tente novamente."), { status: 0 });
  }
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (res.status === 401) clearSession();
  if (!res.ok) throw Object.assign(new Error(data?.errors?.join(" ") || "Algo deu errado. Tente novamente."), { status: res.status });
  return data;
}

export const brl = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
/* Fim de api.js */
