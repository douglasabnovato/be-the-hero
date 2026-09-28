/* Esquemas de entrada (zod): ONG, sessão, caso e paginação */
const { z } = require("zod");

const UFS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

/* Remove tudo que não é dígito e o prefixo 55 opcional */
function onlyDigits(v) {
  const d = String(v || "").replace(/\D/g, "");
  return d.length > 11 && d.startsWith("55") ? d.slice(2) : d;
}

const ong = z.object({
  name: z.string().trim().min(2, "Informe o nome da ONG.").max(80),
  email: z.string().trim().toLowerCase().email("Informe um e-mail válido.").max(120),
  whatsapp: z.string().transform(onlyDigits).refine((d) => d.length === 10 || d.length === 11, "WhatsApp com DDD: 10 ou 11 dígitos."),
  city: z.string().trim().min(2, "Informe a cidade.").max(60),
  uf: z.string().trim().toUpperCase().refine((u) => UFS.includes(u), "UF inválida."),
});

const session = z.object({ id: z.string().trim().regex(/^[0-9a-f]{8}([0-9a-f]{8})?$/i, "ID inválido.").transform((s) => s.toLowerCase()) });

/* Valor em reais: aceita "1.234,56", "1234.56" ou número; guarda com 2 casas */
function parseMoney(v) {
  if (typeof v === "number") return v;
  const s = String(v || "").trim().replace(/\s|R\$/g, "");
  const normalized = s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s;
  return /^\d+(\.\d{1,2})?$/.test(normalized) ? Number(normalized) : NaN;
}

const incident = z.object({
  title: z.string().trim().min(3, "Informe o título do caso.").max(100),
  description: z.string().trim().min(10, "Descreva o caso (mínimo de 10 caracteres).").max(1000),
  value: z.union([z.string(), z.number()]).transform(parseMoney)
    .refine((n) => Number.isFinite(n) && n > 0 && n <= 1_000_000, "Informe o valor em reais (ex.: 120,00)."),
});

const page = z.object({ page: z.coerce.number().int().min(1).max(10_000).default(1) });

/* Mensagens legíveis de um erro do zod */
const messages = (error) => error.issues.map((i) => i.message);

module.exports = { ong, session, incident, page, parseMoney, onlyDigits, messages, UFS };
/* Fim de validation.js */
