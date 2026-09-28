/* Build com Vite (substitui react-scripts 3) e testes com Vitest */
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: { outDir: "build" },
  test: { environment: "jsdom" },
});
/* Fim de vite.config.js */
