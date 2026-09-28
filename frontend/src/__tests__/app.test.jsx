/* Testes do painel: cadastro mostra o ID, logon, perfil com exclusão e erros da API */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

let routes;
beforeEach(() => {
  cleanup();
  localStorage.clear();
  routes = {};
  globalThis.fetch = vi.fn(async (url, opts = {}) => {
    const [status, body] = routes[`${opts.method || "GET"} ${new URL(url).pathname}`] || [404, { errors: ["Rota não encontrada."] }];
    return { ok: status < 400, status, json: async () => body };
  });
});

/* Renderiza em uma rota */
const renderAt = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);

describe("cadastro e logon", () => {
  it("cadastro exibe o ID na tela em vez de alert()", async () => {
    routes["POST /ongs"] = [201, { id: "a1b2c3d4e5f60718" }];
    renderAt("/register");
    await userEvent.type(screen.getByLabelText("Nome da ONG"), "APAD");
    await userEvent.click(screen.getByRole("button", { name: "Cadastrar" }));
    expect(await screen.findByText("a1b2c3d4e5f60718")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Copiar ID" })).toBeTruthy();
  });

  it("erros de validação da API aparecem no formulário", async () => {
    routes["POST /ongs"] = [400, { errors: ["UF inválida."] }];
    renderAt("/register");
    await userEvent.click(screen.getByRole("button", { name: "Cadastrar" }));
    expect((await screen.findByRole("alert")).textContent).toBe("UF inválida.");
  });

  it("logon guarda o token e abre o perfil", async () => {
    routes["POST /sessions"] = [200, { name: "APAD", token: "t" }];
    routes["GET /profile"] = [200, []];
    renderAt("/");
    await userEvent.type(screen.getByLabelText("ID da ONG"), "a1b2c3d4e5f60718");
    await userEvent.click(screen.getByRole("button", { name: "Entrar" }));
    expect(await screen.findByText("Boas-vindas, APAD.")).toBeTruthy();
    expect(screen.getByText(/Nenhum caso ainda/)).toBeTruthy();
  });

  it("perfil sem sessão volta ao logon", () => {
    renderAt("/profile");
    expect(screen.getByRole("heading", { name: "Faça seu logon" })).toBeTruthy();
  });
});

describe("perfil", () => {
  beforeEach(() => localStorage.setItem("bethehero.session", JSON.stringify({ name: "APAD", token: "t" })));

  it("lista casos com valor em reais e exclui após confirmar", async () => {
    routes["GET /profile"] = [200, [{ id: 7, title: "Cadelinha", description: "Cirurgia", value: 1234.5 }]];
    routes["DELETE /incidents/7"] = [204, null];
    vi.spyOn(window, "confirm").mockReturnValue(true);
    renderAt("/profile");
    const item = (await screen.findByText("Cadelinha")).closest("li");
    expect(item.textContent).toMatch(/R\$\s?1\.234,50/);
    await userEvent.click(within(item).getByRole("button", { name: "Excluir o caso Cadelinha" }));
    expect(screen.queryByText("Cadelinha")).toBeNull();
    expect(screen.getByRole("status").textContent).toBe("Caso excluído.");
  });
});
/* Fim de app.test.jsx */
