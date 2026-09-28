/* Raiz do app dos heróis: rotas e barra de status (Intl já é nativo no Hermes, o polyfill saiu) */
import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Routes />
    </>
  );
}
/* Fim de App.js */
