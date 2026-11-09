/* Teste de ponta a ponta no navegador: sobe a API com um SQLite temporário e o web do Vite */
import os from "node:os";
import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

/* Portas próprias para não colidir com o `npm run dev` de quem estiver programando */
const API_PORT = 3343;
const WEB_PORT = 5183;
/* Banco descartável a cada execução, fora do repositório */
const sqliteFile = path.join(os.tmpdir(), `be-the-hero-e2e-${Date.now()}.sqlite`);

export default defineConfig({
  testDir: "e2e",
  testMatch: /.*\.e2e\.js$/,
  timeout: 60_000,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${WEB_PORT}`, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    { command: "npm start --prefix ../backend", url: `http://localhost:${API_PORT}/health`, env: { SQLITE_FILE: sqliteFile, PORT: String(API_PORT), CORS_ORIGINS: `http://localhost:${WEB_PORT}` }, reuseExistingServer: !process.env.CI, timeout: 60_000 },
    { command: `npm run dev -- --port ${WEB_PORT} --strictPort`, url: `http://localhost:${WEB_PORT}`, env: { VITE_API_URL: `http://localhost:${API_PORT}` }, reuseExistingServer: !process.env.CI, timeout: 60_000 },
  ],
});
/* Fim de playwright.config.js */
