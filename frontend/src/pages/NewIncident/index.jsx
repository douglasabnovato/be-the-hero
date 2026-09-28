/* Cadastro de caso com validação da API exibida no formulário */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { api } from "../../lib/api";
import logoImg from "../../assets/logo.svg";
import "./styles.css";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  /* Envia o caso e volta ao perfil */
  async function handleNewIncident(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api("/incidents", { method: "POST", body: { title, description, value } });
      navigate("/profile");
    } catch (err) {
      if (err.status === 401) return navigate("/");
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <main className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" width="260" height="106" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#c81b38" aria-hidden="true" />
            Voltar para o perfil
          </Link>
        </section>
        <form onSubmit={handleNewIncident} noValidate>
          <label htmlFor="title" className="sr-only">Título do caso</label>
          <input id="title" placeholder="Título do caso" maxLength={100} value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="description" className="sr-only">Descrição</label>
          <textarea id="description" placeholder="Descrição" maxLength={1000} value={description} onChange={(e) => setDescription(e.target.value)} />
          <label htmlFor="value" className="sr-only">Valor em reais</label>
          <input id="value" inputMode="decimal" placeholder="Valor em reais (ex.: 120,00)" value={value} onChange={(e) => setValue(e.target.value)} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button" type="submit" disabled={busy}>{busy ? "Cadastrando…" : "Cadastrar"}</button>
        </form>
      </div>
    </main>
  );
}
/* Fim de NewIncident/index.jsx */
