/* Testes da API em SQLite em memória (e no PostgreSQL quando TEST_DATABASE_URL estiver definido) */
const { test, describe, before, after } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createApp } = require("../src/app");
const { createConnection } = require("../src/database/connection");
const { loadConfig } = require("../src/config");
const generateUniqueId = require("../src/utils/generateUniqueId");
const { parseMoney, onlyDigits } = require("../src/lib/validation");

const env = process.env.TEST_DATABASE_URL ? { DATABASE_URL: process.env.TEST_DATABASE_URL, DATABASE_SSL: "false" } : { NODE_ENV: "test" };
const db = createConnection(env);
const app = createApp({ db, config: loadConfig({ AUTH_SECRET: "k".repeat(32) }) });
const ONG = { name: "APAD", email: "contato@apad.org", whatsapp: "(47) 99999-0000", city: "Blumenau", uf: "sc" };

/* Cadastra uma ONG e devolve { id, token } */
async function newOng(extra = {}) {
  const { body } = await request(app).post("/ongs").send({ ...ONG, ...extra });
  const s = await request(app).post("/sessions").send({ id: body.id });
  return { id: body.id, token: s.body.token };
}
/* Cria um caso para a ONG autenticada */
const newIncident = (token, data = {}) => request(app).post("/incidents").set("Authorization", `Bearer ${token}`)
  .send({ title: "Cadelinha atropelada", description: "Precisa de cirurgia na pata traseira.", value: "120,50", ...data });

before(async () => {
  await db.migrate.rollback(undefined, true);
  await db.migrate.latest();
});
after(() => db.destroy());

describe("regras puras", () => {
  test("ID com 16 caracteres hexadecimais", () => assert.match(generateUniqueId(), /^[0-9a-f]{16}$/));
  test("valor em reais em vários formatos", () => {
    assert.equal(parseMoney("1.234,56"), 1234.56);
    assert.equal(parseMoney("R$ 120,5"), 120.5);
    assert.equal(parseMoney("99.90"), 99.9);
    assert.ok(Number.isNaN(parseMoney("12,345")));
  });
  test("WhatsApp só com dígitos e sem 55", () => assert.equal(onlyDigits("+55 (47) 99999-0000"), "47999990000"));
});

describe("ONGs e sessão", () => {
  test("cadastra ONG normalizando WhatsApp e UF", async () => {
    const r = await request(app).post("/ongs").send(ONG);
    assert.equal(r.status, 201);
    assert.match(r.body.id, /^[0-9a-f]{16}$/);
    const row = await db("ongs").where("id", r.body.id).first();
    assert.equal(row.whatsapp, "47999990000");
    assert.equal(row.uf, "SC");
  });

  test("recusa dados inválidos com mensagens em português", async () => {
    const r = await request(app).post("/ongs").send({ ...ONG, uf: "XX", whatsapp: "123" });
    assert.equal(r.status, 400);
    assert.deepEqual(r.body.errors, ["WhatsApp com DDD: 10 ou 11 dígitos.", "UF inválida."]);
  });

  test("a listagem de ONGs (que expunha todos os IDs de acesso) não existe mais", async () => {
    const r = await request(app).get("/ongs").set("Authorization", "qualquer-coisa");
    assert.equal(r.status, 404);
  });

  test("login com ID devolve nome e token; ID inexistente é recusado", async () => {
    const { id } = (await request(app).post("/ongs").send(ONG)).body;
    const ok = await request(app).post("/sessions").send({ id: id.toUpperCase() });
    assert.equal(ok.status, 200);
    assert.equal(ok.body.name, "APAD");
    assert.ok(ok.body.token);
    const bad = await request(app).post("/sessions").send({ id: "0000000000000000" });
    assert.equal(bad.status, 400);
  });
});

describe("casos", () => {
  let a, b;
  before(async () => {
    a = await newOng({ name: "ONG A" });
    b = await newOng({ name: "ONG B" });
  });

  test("rotas da ONG exigem token (antes bastava o ID no header)", async () => {
    const r = await request(app).post("/incidents").set("Authorization", a.id).send({ title: "x" });
    assert.equal(r.status, 401);
  });

  test("cria caso com valor normalizado e lista no perfil", async () => {
    const r = await newIncident(a.token);
    assert.equal(r.status, 201, JSON.stringify(r.body));
    const p = await request(app).get("/profile").set("Authorization", `Bearer ${a.token}`);
    assert.equal(p.body.length, 1);
    assert.equal(p.body[0].value, 120.5);
  });

  test("valida título, descrição e valor", async () => {
    const r = await newIncident(a.token, { title: "", description: "curta", value: "-3" });
    assert.equal(r.status, 400);
    assert.equal(r.body.errors.length, 3);
  });

  test("lista pública paginada de 5 em 5 com X-Total-Count e dados de contato", async () => {
    for (let i = 0; i < 6; i += 1) await newIncident(b.token, { title: `Caso ${i}` });
    const p1 = await request(app).get("/incidents");
    assert.equal(p1.headers["x-total-count"], "7");
    assert.equal(p1.body.length, 5);
    assert.equal(p1.body[0].name, "ONG B");
    assert.equal(p1.body[0].whatsapp, "47999990000");
    const p2 = await request(app).get("/incidents?page=2");
    assert.equal(p2.body.length, 2);
    assert.equal((await request(app).get("/incidents?page=0")).status, 400);
  });

  test("só a dona apaga o caso; inexistente responde 404 (antes derrubava a API)", async () => {
    const { body } = await newIncident(a.token, { title: "Para apagar" });
    const other = await request(app).delete(`/incidents/${body.id}`).set("Authorization", `Bearer ${b.token}`);
    assert.equal(other.status, 403);
    const ok = await request(app).delete(`/incidents/${body.id}`).set("Authorization", `Bearer ${a.token}`);
    assert.equal(ok.status, 204);
    const none = await request(app).delete(`/incidents/${body.id}`).set("Authorization", `Bearer ${a.token}`);
    assert.equal(none.status, 404);
  });
});
/* Fim de api.test.js */
