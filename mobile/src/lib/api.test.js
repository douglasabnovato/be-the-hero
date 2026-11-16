/* Testes da mensagem e do link de contato com a ONG */
import { contactMessage, whatsappUrl } from "./api";

const CASO = { name: "ONG", title: "Cão ferido", value: 120, whatsapp: "32999999999" };

test("contactMessage cita a ONG e o caso", () => {
  expect(contactMessage(CASO)).toContain('Olá ONG');
  expect(contactMessage(CASO)).toContain('"Cão ferido"');
});

test("whatsappUrl usa wa.me com DDI 55 e codifica o texto", () => {
  const url = whatsappUrl(CASO);
  expect(url.startsWith("https://wa.me/5532999999999?text=")).toBe(true);
  expect(url).not.toContain(" ");
  expect(decodeURIComponent(url.split("?text=")[1])).toBe(contactMessage(CASO));
});

test("whatsappUrl limpa máscara e zero inicial e não duplica o DDI", () => {
  expect(whatsappUrl({ ...CASO, whatsapp: "(032) 99999-9999" })).toMatch(/^https:\/\/wa\.me\/5532999999999\?/);
  expect(whatsappUrl({ ...CASO, whatsapp: "5532999999999" })).toMatch(/^https:\/\/wa\.me\/5532999999999\?/);
});
/* Fim de api.test.js */
