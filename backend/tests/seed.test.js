/* Testes da seed de demonstração: só dados fictícios, idempotente e bloqueada fora do SQLite (#29) */
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const { createApp } = require("../src/app");
const { createConnection } = require("../src/database/connection");
const { loadConfig } = require("../src/config");
const { seed, assertLocal, ONGS, INCIDENTS } = require("../src/database/seeds/01_demonstracao");

/* Domínios reservados pela RFC 2606: nunca existem na internet */
const reservado = (email) => /@([a-z0-9-]+\.)*(test|example|invalid|localhost)$/.test(email) || /@example\.(com|org|net)$/.test(email);

const db = createConnection({ NODE_ENV: "test" });
const app = createApp({ db, config: loadConfig({ AUTH_SECRET: "k".repeat(32) }) });

before(async () => {
  await db.migrate.latest();
});
after(() => db.destroy());

test("e-mails só em domínio reservado e WhatsApp com DDD 00, que não existe", () => {
  for (const o of ONGS) {
    assert.ok(reservado(o.email), `e-mail fora de domínio reservado: ${o.name}`);
    assert.match(o.whatsapp, /^00\d{8,9}$/);
  }
  assert.equal(reservado("contato@gmail.com"), false);
  assert.equal(reservado("contato@example.org.br"), false);
});

test("cria 2 ONGs e 4 casos e pode rodar de novo sem duplicar", async () => {
  await seed(db);
  await seed(db);
  assert.equal(ONGS.length, 2);
  assert.equal(INCIDENTS.length, 4);
  const [{ n: ongs }] = await db("ongs").count({ n: "*" });
  const [{ n: casos }] = await db("incidents").count({ n: "*" });
  assert.equal(Number(ongs), 2);
  assert.equal(Number(casos), 4);
});

test("a ONG da demonstração entra pelo ID e os casos aparecem na lista pública", async () => {
  await seed(db); /* não depende do teste anterior */
  const s = await request(app).post("/sessions").send({ id: ONGS[0].id });
  assert.equal(s.status, 200);
  assert.equal(s.body.name, ONGS[0].name);
  const pub = await request(app).get("/incidents?uf=MG");
  assert.equal(pub.status, 200);
  assert.equal(pub.body.length, 2);
});

test("recusa rodar fora do SQLite local (IDs públicos não vão para produção)", () => {
  assert.throws(() => assertLocal("pg"), /nunca no banco de produção/);
  assert.doesNotThrow(() => assertLocal("better-sqlite3"));
});
/* Fim de seed.test.js */
