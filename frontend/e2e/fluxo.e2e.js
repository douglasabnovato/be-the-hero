/* Fluxo principal na tela: ONG se cadastra, entra com o ID, cadastra um caso, o caso aparece na lista pública e é excluído; axe em cada tela */
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const API = "http://localhost:3343"; /* mesma porta do playwright.config.js */
const run = Date.now().toString(36);
/* Dados fictícios por construção: domínio reservado (RFC 2606) e DDD 00, que não existe */
const ong = { name: `ONG Demo ${run}`, email: `contato-${run}@ong-exemplo.test`, whatsapp: "00900000001", city: "Florianópolis", uf: "SC" };
const caso = { title: `Cão atropelado ${run}`, description: "Precisa de cirurgia na pata traseira.", value: "120,50" };

/* Falha com qualquer violação WCAG 2.x A ou AA na tela atual; o app não tem tema escuro próprio, por isso só o claro */
async function semViolacoes(page, tela) {
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(violations.map((v) => `${tela}: ${v.id} (${v.nodes.length})`)).toEqual([]);
}

test("ONG cadastra, entra, cria e exclui um caso", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Faça seu logon" })).toBeVisible();
  await semViolacoes(page, "logon");
  await page.getByRole("link", { name: "Não tenho cadastro" }).click();
  await expect(page.getByLabel("Nome da ONG")).toBeVisible();
  await semViolacoes(page, "cadastro");
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
  await expect(page.getByLabel("Título do caso")).toBeVisible();
  await semViolacoes(page, "novo caso");
  await page.getByLabel("Título do caso").fill(caso.title);
  await page.getByLabel("Descrição").fill(caso.description);
  await page.getByLabel("Valor em reais").fill(caso.value);
  await page.getByRole("button", { name: "Cadastrar" }).click();
  await expect(page).toHaveURL(/\/profile$/);
  const item = page.locator("li").filter({ hasText: caso.title });
  await expect(item).toContainText(/R\$\s?120,50/);
  await semViolacoes(page, "perfil com caso");

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
test("teclado: Tab chega ao ID, ao botão e ao link, com foco visível, e Enter abre o cadastro", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Faça seu logon" })).toBeVisible();
  const ordem = [page.getByLabel("ID da ONG"), page.getByRole("button", { name: "Entrar" }), page.getByRole("link", { name: "Não tenho cadastro" })];
  for (const alvo of ordem) {
    await page.keyboard.press("Tab");
    await expect(alvo).toBeFocused();
    /* :focus-visible do global.css: contorno azul de 3 px */
    await expect(alvo).toHaveCSS("outline-style", "solid");
    await expect(alvo).toHaveCSS("outline-width", "3px");
  }
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/register$/);
  await expect(page.getByLabel("Nome da ONG")).toBeVisible();
});
/* Fim de fluxo.e2e.js */
