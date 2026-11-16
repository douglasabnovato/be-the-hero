# MVP — be-the-hero

> Revisto em 16/11/2026 (ciclo de 16/11/2026). Nível: **Estudo (N1)**. Os critérios 5 e 7 não se aplicam ao N1 e saem da conta. Testado no Windows com Node 24 e no CI (Ubuntu, Node 22), no clone da `feature/2026-11-16`. Não houve teste com pessoas nem em aparelho real.

**Resumo:** 9 de 10 aplicáveis atendidos

**Finalizado:** sim — o único critério aplicável que falta é o 9, que depende do responsável (#17, rótulo `depende-do-responsavel`).

Antes deste ciclo: a tabela de 09/11 dizia 9 de 10, mas o critério 8 estava "Atende" sem axe dentro do teste Playwright. Conferida contra a régua, eram 8 de 10.

| # | Critério | Como verificar | Situação | Evidência e data |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: ONGs divulgam casos que precisam de ajuda, e heróis acham o caso e falam com a ONG. | README e seção "Hipótese", 16/11/2026 |
| 2 | Hipótese a validar | Aposta escrita, com meta | Atende: seção "Hipótese", com meta e "saberemos quando"; sem validação com pessoas. | Seção "Hipótese", 16/11/2026 |
| 3 | Fluxo principal completo | Teste de ponta a ponta no navegador (Playwright) no CI | Atende: no navegador, a ONG se cadastra e vê o ID, entra com ele, cadastra um caso, o caso aparece na lista pública da API filtrada por UF e é excluído com confirmação. A tela do app não foi aberta (sem aparelho). | `npm run test:e2e` em `frontend`: 3 passed, local em 16/11/2026 e no job `e2e` do [run 43802988864](https://github.com/douglasabnovato/be-the-hero/actions/runs/43802988864) (PR #30, commit a52c56a) |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: seção "Fora do MVP". | 16/11/2026 |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1). | Decisão 2 do processo |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta | Atende: sem API, o logon mostra "Sem conexão com o servidor"; ID inexistente mostra o erro da API no navegador; lista vazia mostra "Nenhum caso ainda"; botão em "Entrando…" durante a espera; UF inválida devolve 400. | `npm test` em `frontend` (7 passed, com falta de rede e espera) e `npm run test:e2e` (3 passed), run 43802988864, 16/11/2026 |
| 7 | Desempenho aceitável | LCP até 2,5 s no celular | Não se aplica (N1). Fora do ar: `be-the-hero-web.onrender.com` respondeu 404 (`x-render-routing: no-server`). | `curl`, 16/11/2026; #15 |
| 8 | Acessibilidade básica | axe e teclado | Atende: axe (WCAG 2.1 A e AA) sem violações no logon, no cadastro, no novo caso e no perfil com um caso real, em largura de desktop; teste de teclado: Tab passa pelo ID, pelo botão e pelo link com contorno de 3 px, e Enter abre o cadastro. O app não tem tema escuro próprio (nenhum `prefers-color-scheme` no CSS), por isso o axe roda só no claro. Não há diálogo próprio para testar Esc (a exclusão usa o `confirm` do navegador). | `frontend/e2e/fluxo.e2e.js`: 3 passed, run 43802988864, 16/11/2026. Conferido que falha: sem o `alt` do logo, `npx playwright test -g "ONG cadastra" --retries=0` acusou `logon: image-alt (1)`, local, 16/11/2026 |
| 9 | Segurança e conformidade | `npm audit --omit=dev`, Dependabot, segredos, dados pessoais | Parcial: API e web sem alertas; app com 3 moderados (`minimatch`, que só sai rebaixando o Expo para o 52); nenhum segredo no código; testes, seed e README só com dados fictícios. Falta o que só o responsável decide: bancos com e-mail e WhatsApp no histórico e alertas do Dependabot desligados. | `npm audit --omit=dev`: API 0, web 0, app 3 moderados; `gh api .../dependabot/alerts` = 403, 16/11/2026; #17 |
| 10 | Entrega confiável | CI nos PRs e principal protegida | Atende: o workflow `CI` roda em PR e push para `master` e `developer/**`; a `master` tem o ruleset `principal-protegida` ativo, com PR obrigatório, sem force push nem exclusão e com os jobs `backend`, `frontend`, `mobile` e `e2e` exigidos. | `gh api repos/douglasabnovato/be-the-hero/rulesets/26932502`, 16/11/2026 |
| 11 | Testes dos fluxos críticos | Testes no CI, sem `# skipped` | Atende: API 17 no SQLite (13 do `api.test.js` e 4 da seed) e os 13 do `api.test.js` também no PostgreSQL 16 (a seed só roda no SQLite), web 7, app 3 e ponta a ponta 3. | Run 43802988864: `# pass 17` e `# skipped 0` nos dois passos, 16/11/2026 |
| 12 | Documentação honesta | README com comandos conferidos | Atende: comandos conferidos com o `package.json` dos três pacotes, inclusive `npm run seed` e `npm run test:e2e`; aviso de estudo; estado e próximos passos; sem link publicado, porque nada responde. | README, 16/11/2026 |

## Hipótese

Acreditamos que uma ONG nova consegue se cadastrar, entrar e publicar um caso em até 3 formulários, sem ajuda, e que o caso aparece na lista pública que o herói consulta no app.

- **Meta:** o percurso cadastro → logon → caso → lista pública completo, com axe sem violações nas 4 telas.
- **Saberemos quando:** o teste de ponta a ponta passar em todo PR (job `e2e`) e uma pessoa de fora repetir o percurso sem ajuda. A primeira parte está feita; a segunda não foi testada.

## Fora do MVP

Doação pelo site, contas de doador, login com e-mail e senha (o acesso pelo ID é regra do curso) e publicação nas lojas.

## Neste ciclo (16/11/2026)

axe e teclado dentro do Playwright (#24); seed de demonstração e dados só fictícios nos testes (#29); `npm ci` da API no Windows sem compilar (#22); testes da API também no PostgreSQL no CI; nome livre para a API no `render.yaml`; dependências em dia (patch e minor). PR #30.

## Histórico

### Tabela de 09/11/2026 (ciclo de 07/11/2026): declarava 9 de 10; conferida em 16/11, eram 8 de 10

| # | Critério | Situação | Evidência e data |
|---|---|---|---|
| 1 | Problema e público claros | Atende | README, 09/11/2026 |
| 2 | Hipótese a validar | Atende (sem "saberemos quando") | Seção "Hipótese", 09/11/2026 |
| 3 | Fluxo principal completo | Atende | `npm run test:e2e`: 2 passed, 09/11/2026 |
| 4 | Escopo enxuto | Atende | 09/11/2026 |
| 5 | Medição de uso | Não se aplica (N1) | Decisão 2 do processo |
| 6 | Falhas tratadas | Atende | `npm test` (5) e `npm run test:e2e` (2), 09/11/2026 |
| 7 | Desempenho aceitável | Não se aplica (N1) | `curl`, 09/11/2026 |
| 8 | Acessibilidade básica | Declarado "Atende", mas o axe era manual (02/11/2026), fora do Playwright: Parcial pela régua | Ciclo de 02/11/2026 |
| 9 | Segurança e conformidade | Parcial | #17 |
| 10 | Entrega confiável | Atende desde 10/11/2026 | ruleset `principal-protegida`; #16 |
| 11 | Testes dos fluxos críticos | Atende | API 13, web 5, app 3, e2e 2, 09/11/2026 |
| 12 | Documentação honesta | Atende | README, 09/11/2026 |

### Tabela de 06/11/2026 (ciclo de 03/11/2026): 7 de 10 aplicáveis atendidos

| # | Critério | Como verificar | Situação | Evidência e data |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: ONGs divulgam casos e recebem contato de quem quer ajudar. | README, 06/11/2026 |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: proposta na seção 2; sem validação com pessoas. | Seção 2 |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Parcial: no navegador, sem API, logon e cadastro abriram. O fluxo com banco só é coberto pelos testes da API no CI. | #19 |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: seção 3. | 06/11/2026 |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1). | Decisão 2 do processo |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: sem API, o logon mostra "Sem conexão com o servidor"; erros da API em português; UF inválida no filtro devolve 400. | `frontend/src/__tests__`, `backend/tests/api.test.js`, 06/11/2026 |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1). O painel respondeu 404 em 06/11/2026. | #15 |
| 8 | Acessibilidade básica | axe e teclado | Atende: axe sem violações em 2 telas; foco visível; sem rolagem em 375 px. | Ciclo de 02/11/2026 |
| 9 | Segurança e conformidade | Riscos decididos | Parcial: bancos com e-mail e WhatsApp fora do Git desde 02/11, mas no histórico; alertas do Dependabot desligados (API 403). | #17 |
| 10 | Entrega confiável | CI verde antes de entrar na principal | Parcial: CI roda em PR e push para `master` e `developer/**`, mas a `master` não tem proteção. | #16 |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 14 testes da API (SQLite no CI), 5 no web, testes do app. | CI do #14, 06/11/2026 |
| 12 | Documentação honesta | O README ensina a rodar | Atende: comandos conferidos com o `package.json`; link da API de outro projeto retirado; seção de estado e próximos passos. | README, 06/11/2026 |

