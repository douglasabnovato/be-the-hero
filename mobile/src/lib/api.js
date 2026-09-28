/* API pública de casos: URL por EXPO_PUBLIC_API_URL, formatação e mensagem de contato */
export const API_URL = (process.env.EXPO_PUBLIC_API_URL || "http://localhost:3333").replace(/\/$/, "");

/* Busca uma página de casos; devolve { items, total } */
export async function fetchIncidents(page) {
  const res = await fetch(`${API_URL}/incidents?page=${page}`);
  if (!res.ok) throw new Error("Não foi possível carregar os casos.");
  return { items: await res.json(), total: Number(res.headers.get("x-total-count")) || 0 };
}

export const brl = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

/* Texto enviado à ONG por WhatsApp ou e-mail */
export function contactMessage(incident) {
  return `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${brl(incident.value)}.`;
}

/* Link do WhatsApp com DDI 55 e texto codificado (antes o texto ia sem codificar e sem DDI) */
export function whatsappUrl(incident) {
  return `whatsapp://send?phone=55${incident.whatsapp}&text=${encodeURIComponent(contactMessage(incident))}`;
}
/* Fim de api.js */
