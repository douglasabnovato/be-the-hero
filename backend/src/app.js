/* API Express 5 do Be The Hero: cadastro de ONGs, sessão por ID com token assinado e casos paginados */
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const v = require("./lib/validation");
const generateUniqueId = require("./utils/generateUniqueId");

const PAGE_SIZE = 5;

/* Monta a API com a conexão Knex e a configuração injetadas */
function createApp({ db, config }) {
  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors({ origin: config.corsOrigins, exposedHeaders: ["X-Total-Count"], allowedHeaders: ["Authorization", "Content-Type"] }));
  app.use(express.json({ limit: "20kb" }));

  const strict = rateLimit({ windowMs: 15 * 60_000, limit: 20, standardHeaders: "draft-7", legacyHeaders: false, message: { errors: ["Muitas tentativas. Aguarde alguns minutos."] } });

  /* Valida a entrada e responde 400 no formato { errors: [] } */
  function parse(schema, data, res) {
    const r = schema.safeParse(data);
    if (!r.success) { res.status(400).json({ errors: v.messages(r.error) }); return null; }
    return r.data;
  }

  /* Exige token Bearer e coloca o id da ONG em req.ongId */
  function auth(req, res, next) {
    const h = String(req.headers.authorization || "");
    try {
      req.ongId = jwt.verify(h.startsWith("Bearer ") ? h.slice(7) : "", config.authSecret).sub;
      return next();
    } catch {
      return res.status(401).json({ errors: ["Sessão expirada. Entre novamente com o ID da ONG."] });
    }
  }

  /* Caso no formato da API: valor numérico com 2 casas */
  const out = (i) => ({ ...i, value: Math.round(Number(i.value) * 100) / 100 });

  app.get("/health", (req, res) => res.json({ status: "ok" }));

  app.post("/ongs", strict, async (req, res) => {
    const data = parse(v.ong, req.body, res);
    if (!data) return;
    const id = generateUniqueId();
    await db("ongs").insert({ id, ...data, created_at: new Date() });
    res.status(201).json({ id });
  });

  app.post("/sessions", strict, async (req, res) => {
    const data = parse(v.session, req.body, res);
    if (!data) return;
    const ong = await db("ongs").where("id", data.id).select("id", "name").first();
    if (!ong) return res.status(400).json({ errors: ["Nenhuma ONG encontrada com esse ID."] });
    const token = jwt.sign({ sub: ong.id }, config.authSecret, { expiresIn: config.tokenTtl });
    res.json({ name: ong.name, token });
  });

  app.get("/profile", auth, async (req, res) => {
    const list = await db("incidents").where("ong_id", req.ongId).orderBy("id", "desc").select("id", "title", "description", "value", "created_at");
    res.json(list.map(out));
  });

  app.post("/incidents", auth, async (req, res) => {
    const data = parse(v.incident, req.body, res);
    if (!data) return;
    const exists = await db("ongs").where("id", req.ongId).first("id");
    if (!exists) return res.status(401).json({ errors: ["ONG não encontrada. Entre novamente."] });
    const [row] = await db("incidents").insert({ ...data, ong_id: req.ongId, created_at: new Date() }).returning("id");
    res.status(201).json({ id: typeof row === "object" ? row.id : row });
  });

  app.get("/incidents", async (req, res) => {
    const q = parse(v.page, req.query, res);
    if (!q) return;
    const [{ count }] = await db("incidents").count({ count: "*" });
    const list = await db("incidents")
      .join("ongs", "ongs.id", "=", "incidents.ong_id")
      .orderBy("incidents.id", "desc")
      .limit(PAGE_SIZE)
      .offset((q.page - 1) * PAGE_SIZE)
      .select("incidents.id", "incidents.title", "incidents.description", "incidents.value", "ongs.name", "ongs.email", "ongs.whatsapp", "ongs.city", "ongs.uf");
    res.header("X-Total-Count", String(count));
    res.json(list.map(out));
  });

  app.delete("/incidents/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ errors: ["ID do caso inválido."] });
    const incident = await db("incidents").where("id", id).first("ong_id");
    if (!incident) return res.status(404).json({ errors: ["Caso não encontrado."] });
    if (incident.ong_id !== req.ongId) return res.status(403).json({ errors: ["Este caso pertence a outra ONG."] });
    await db("incidents").where("id", id).delete();
    res.status(204).send();
  });

  app.use((req, res) => res.status(404).json({ errors: ["Rota não encontrada."] }));

  /* Erro inesperado: registra e responde sem detalhes internos */
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    if (err.type === "entity.parse.failed") return res.status(400).json({ errors: ["JSON inválido."] });
    console.error(err);
    return res.status(500).json({ errors: ["Erro interno. Tente novamente."] });
  });

  return app;
}

module.exports = { createApp, PAGE_SIZE };
/* Fim de app.js */
