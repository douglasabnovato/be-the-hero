/* Cadastro da ONG: mostra o ID de acesso na tela (antes aparecia só em um alert) */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { api } from "../../lib/api";
import logoImg from "../../assets/logo.svg";
import "./styles.css";

const EMPTY = { name: "", email: "", whatsapp: "", city: "", uf: "" };

export default function Register() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [createdId, setCreatedId] = useState("");
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  /* Atualiza um campo do formulário */
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  /* Envia o cadastro */
  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { id } = await api("/ongs", { method: "POST", body: form });
      setCreatedId(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  /* Copia o ID para a área de transferência */
  async function copy() {
    try { await navigator.clipboard.writeText(createdId); setCopied(true); } catch { setCopied(false); }
  }

  return (
    <main className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" width="260" height="106" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#c81b38" aria-hidden="true" />
            Já tenho cadastro
          </Link>
        </section>

        {createdId ? (
          <div className="created" role="status">
            <h2>Cadastro concluído!</h2>
            <p>Guarde seu ID de acesso. Ele é a sua senha para entrar:</p>
            <code>{createdId}</code>
            <button type="button" className="button" onClick={copy}>{copied ? "ID copiado" : "Copiar ID"}</button>
            <Link className="back-link" to="/">Ir para o logon</Link>
          </div>
        ) : (
          <form onSubmit={handleRegister} noValidate>
            <label htmlFor="name" className="sr-only">Nome da ONG</label>
            <input id="name" placeholder="Nome da ONG" value={form.name} onChange={set("name")} autoComplete="organization" />
            <label htmlFor="email" className="sr-only">E-mail</label>
            <input id="email" type="email" placeholder="E-mail" value={form.email} onChange={set("email")} autoComplete="email" />
            <label htmlFor="whatsapp" className="sr-only">WhatsApp com DDD</label>
            <input id="whatsapp" type="tel" inputMode="tel" placeholder="WhatsApp com DDD" value={form.whatsapp} onChange={set("whatsapp")} autoComplete="tel" />
            <div className="input-group">
              <label htmlFor="city" className="sr-only">Cidade</label>
              <input id="city" placeholder="Cidade" value={form.city} onChange={set("city")} autoComplete="address-level2" />
              <label htmlFor="uf" className="sr-only">UF</label>
              <input id="uf" placeholder="UF" maxLength={2} className="uf" value={form.uf} onChange={set("uf")} autoComplete="address-level1" />
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="button" type="submit" disabled={busy}>{busy ? "Cadastrando…" : "Cadastrar"}</button>
          </form>
        )}
      </div>
    </main>
  );
}
/* Fim de Register/index.jsx */
