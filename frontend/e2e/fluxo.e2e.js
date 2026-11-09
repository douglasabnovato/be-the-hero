/* Fluxo principal na tela: ONG se cadastra, entra com o ID, cadastra um caso, o caso aparece na lista pública e é excluído */
import { test, expect } from "@playwright/test";

const API = "http://localhost:3343"; /* mesma porta do playwright.config.js */
const run = Date.now().toString(36);
const ong = { name: `ONG Demo ${run}`, email: `contato-${run}@demo.test`, whatsapp: "48999990000", city: "Florianópolis", uf: "SC" };
const caso = { title: `Cão atropelado ${run}`, description: "Precisa de cirurgia na pata traseira.", value: "120,50" };

test("ONG cadastra, entra, cria e exclui um caso", async ({ page, request }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Não tenho cadastro" }).click();
  await page.getByLabel("Nome da ONG").fill(ong.name);
  await page.getByLabel("E-mail").fill(ong.email);
  await page.getByLabel("WhatsApp com DDD").fill(ong.whatsapp);
  await page.getByLabel("Cidade").fill(ong.city);
  await page.getByLabel("UF").fill(ong.uf);
  await page.getByRole("button", { name: "Cadastrar" }).click();

  const concluido = page.locator(".created");
  await expect(concluido).toContainText("Cadastro concluído!");
  const id = (await concluido.locator("code").innerText()).trim();
  expect(id).toMatch(/^[0-9a-f]{8,}$/i);

  await concluido.getByRole("link", { name: "Ir para o logon" }).click();
  await page.getByLabel("ID da ONG").fill(id);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByText(`Boas-vindas, ${ong.name}.`)).toBeVisible();
  await expect(page.getByText(/Nenhum caso ainda/)).toBeVisible();

  await page.getByRole("link", { name: "Cadastrar novo caso" }).click();
  await page.getByLabel("Título do caso").fill(caso.title);
  await page.getByLabel("Descrição").fill(caso.description);
  await page.getByLabel("Valor em reais").fill(caso.value);
  await page.getByRole("button", { name: "Cadastrar" }).click();
  await expect(page).toHaveURL(/\/profile$/);
  const item = page.locator("li").filter({ hasText: caso.title });
  await expect(item).toContainText(/R\$\s?120,50/);

  /* O herói (app móvel) vê o caso na lista pública filtrada pela UF */
  const pub = await request.get(`${API}/incidents?uf=SC`);
  expect(pub.ok()).toBeTruthy();
  expect((await pub.json()).some((i) => i.title === caso.title && i.name === ong.name)).toBeTruthy();

  page.once("dialog", (d) => d.accept());
  await item.getByRole("button", { name: `Excluir o caso ${caso.title}` }).click();
  await expect(item).toHaveCount(0);
  await expect(page.getByRole("status").filter({ hasText: "Caso excluído." })).toBeAttached();

  await page.reload();
  await expect(page.getByText(/Nenhum caso ainda/)).toBeVisible();
});

test("ID inexistente mostra o erro da API no logon", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("ID da ONG").fill("naoexiste");
  const resposta = page.waitForResponse((r) => r.url().endsWith("/sessions") && r.request().method() === "POST");
  await page.getByRole("button", { name: "Entrar" }).click();
  const r = await resposta;
  expect(r.status()).toBe(400);
  const { errors } = await r.json();
  await expect(page.getByRole("alert")).toHaveText(errors.join(" "));
  await expect(page).not.toHaveURL(/\/profile$/);
});
/* Fim de fluxo.e2e.js */
