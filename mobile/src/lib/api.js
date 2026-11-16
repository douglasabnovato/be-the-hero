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

/* Link "clique para conversar" (wa.me): número só com dígitos e DDI 55, texto codificado.
   Abre o app se estiver instalado e o navegador se não estiver (o esquema whatsapp:// falhava sem o app). */
export function whatsappUrl(incident) {
  const digits = String(incident.whatsapp || "").replace(/\D/g, "").replace(/^0+/, "");
  const phone = digits.startsWith("55") && digits.length > 11 ? digits : `55${digits}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(contactMessage(incident))}`;
}
/* Fim de api.js */
