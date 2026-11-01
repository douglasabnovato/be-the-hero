/* Testes da mensagem e do link de contato com a ONG */
import { contactMessage, whatsappUrl } from "./api";

const CASO = { name: "ONG", title: "Cão ferido", value: 120, whatsapp: "32999999999" };

test("contactMessage cita a ONG e o caso", () => {
  expect(contactMessage(CASO)).toContain('Olá ONG');
  expect(contactMessage(CASO)).toContain('"Cão ferido"');
});

test("whatsappUrl usa DDI 55 e codifica o texto", () => {
  const url = whatsappUrl(CASO);
  expect(url.startsWith("whatsapp://send?phone=5532999999999&text=")).toBe(true);
  expect(url).not.toContain(" ");
});
/* Fim de api.test.js */
