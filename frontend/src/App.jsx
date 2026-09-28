/* Rotas do painel: logon, cadastro, perfil e novo caso (os dois últimos exigem sessão) */
import { Navigate, Route, Routes } from "react-router-dom";
import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewIncident from "./pages/NewIncident";
import { getSession } from "./lib/session";
import "./global.css";

/* Redireciona ao logon quando não há sessão */
function Private({ children }) {
  return getSession()?.token ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Logon />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Private><Profile /></Private>} />
      <Route path="/incidents/new" element={<Private><NewIncident /></Private>} />
      <Route path="*" element={<main className="not-found"><h1>Página não encontrada</h1><a className="back-link" href="/">Voltar ao início</a></main>} />
    </Routes>
  );
}
/* Fim de App.jsx */
