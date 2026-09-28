/* Logon da ONG com o ID de acesso recebido no cadastro */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { api } from "../../lib/api";
import { saveSession } from "../../lib/session";
import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";
import "./styles.css";

export default function Logon() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  /* Troca o ID por um token de sessão */
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { name, token } = await api("/sessions", { method: "POST", body: { id } });
      saveSession({ name, token });
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <main className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" width="260" height="106" />
        <form onSubmit={handleLogin} noValidate>
          <h1>Faça seu logon</h1>
          <label htmlFor="ong-id" className="sr-only">ID da ONG</label>
          <input id="ong-id" placeholder="Seu ID" autoComplete="username" spellCheck={false} value={id} onChange={(e) => setId(e.target.value)}
            aria-invalid={Boolean(error)} aria-describedby={error ? "logon-error" : undefined} />
          {error && <p id="logon-error" className="form-error" role="alert">{error}</p>}
          <button className="button" type="submit" disabled={busy}>{busy ? "Entrando…" : "Entrar"}</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#c81b38" aria-hidden="true" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img className="heroes" src={heroesImg} alt="" width="600" height="585" />
    </main>
  );
}
/* Fim de Logon/index.jsx */
