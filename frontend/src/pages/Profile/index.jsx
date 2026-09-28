/* Perfil da ONG: lista os casos com exclusão confirmada e sair da conta */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { api, brl } from "../../lib/api";
import { clearSession, getSession } from "../../lib/session";
import logoImg from "../../assets/logo.svg";
import "./styles.css";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [state, setState] = useState({ loading: true, error: "", notice: "" });
  const navigate = useNavigate();
  const name = getSession()?.name;

  /* Encerra a sessão */
  const logout = useCallback(() => { clearSession(); navigate("/"); }, [navigate]);

  useEffect(() => {
    let alive = true;
    api("/profile")
      .then((list) => alive && (setIncidents(list), setState({ loading: false, error: "", notice: "" })))
      .catch((err) => { if (!alive) return; if (err.status === 401) logout(); else setState({ loading: false, error: err.message, notice: "" }); });
    return () => { alive = false; };
  }, [logout]);

  /* Exclui um caso depois de confirmar */
  async function handleDelete(incident) {
    if (!window.confirm(`Excluir o caso "${incident.title}"?`)) return;
    try {
      await api(`/incidents/${incident.id}`, { method: "DELETE" });
      setIncidents((list) => list.filter((i) => i.id !== incident.id));
      setState((s) => ({ ...s, error: "", notice: "Caso excluído." }));
    } catch (err) {
      setState((s) => ({ ...s, error: err.message, notice: "" }));
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" width="157" height="64" />
        <span>Boas-vindas, {name}.</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={logout} type="button" aria-label="Sair" title="Sair">
          <FiPower size={18} color="#c81b38" aria-hidden="true" />
        </button>
      </header>
      <main>
        <h1>Casos cadastrados</h1>
        <p className="sr-only" role="status">{state.notice}</p>
        {state.error && <p className="form-error" role="alert">{state.error}</p>}
        {state.loading ? <p role="status">Carregando casos…</p> : incidents.length === 0 && !state.error ? (
          <p className="empty">Nenhum caso ainda. <Link to="/incidents/new">Cadastre o primeiro</Link>.</p>
        ) : (
          <ul>
            {incidents.map((incident) => (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>
                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>
                <strong>VALOR:</strong>
                <p>{brl(incident.value)}</p>
                <button onClick={() => handleDelete(incident)} type="button" aria-label={`Excluir o caso ${incident.title}`}>
                  <FiTrash2 color="#6b6b78" size={20} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
/* Fim de Profile/index.jsx */
