# MVP — be-the-hero

> Revisto em 09/11/2026 (ciclo de 07/11/2026). Nível: **Estudo (N1)**. Os critérios 5 e 7 não se aplicam ao N1 e saem da conta. Testado no Windows, com Node 24, no clone da `feature/2026-11-07`. A API rodou localmente com `npm ci --ignore-scripts && npm i --no-save better-sqlite3@12`, porque o `better-sqlite3` 13 do lock não compila nesta máquina. Não houve teste com pessoas nem em aparelho real.

**Resumo:** 8 de 10 aplicáveis atendidos

**Finalizado:** sim — os dois critérios aplicáveis que faltam dependem do responsável: 9 (#17) e 10 (#16), ambos com o rótulo `depende-do-responsavel`.

| # | Critério | Como verificar | Situação | Evidência e data |
|---|---|---|---|---|
| 1 | Problema e público claros | Dá para explicar em uma frase | Atende: ONGs divulgam casos e recebem contato de quem quer ajudar. | README, 09/11/2026 |
| 2 | Hipótese a validar | Existe uma aposta escrita, com meta | Atende: seção "Hipótese"; sem validação com pessoas. | Seção "Hipótese", 09/11/2026 |
| 3 | Fluxo principal completo | Uma pessoa conclui sem ajuda | Atende: no navegador, a ONG se cadastra e vê o ID na tela, entra com ele, cadastra um caso, o caso aparece na lista pública filtrada por UF (a que o app usa) e é excluído com confirmação; ID errado mostra o erro da API. A tela do app não foi aberta (sem aparelho). | `npm run test:e2e` em `frontend` (Playwright 1.65, Chromium local, API `npm start` com SQLite temporário, dados de demonstração criados pelo teste): 2 passed, 09/11/2026; job `e2e` no CI |
| 4 | Escopo enxuto | O que não entra está registrado | Atende: seção "Fora do MVP". | 09/11/2026 |
| 5 | Medição de uso | A métrica principal é coletada | Não se aplica (N1). | Decisão 2 do processo |
| 6 | Falhas tratadas | Erro, vazio e carregamento têm resposta clara | Atende: sem API, o logon mostra "Sem conexão com o servidor"; erros da API em português, também no navegador de verdade (ID inexistente); UF inválida devolve 400; no app, falha ao abrir o WhatsApp mostra alternativa. | `npm test` em `frontend` (5 passed) e `npm run test:e2e` (2 passed), 09/11/2026 |
| 7 | Desempenho aceitável | LCP de até 2,5 s no celular | Não se aplica (N1). `be-the-hero-web.onrender.com` respondeu 404 e a API não respondeu em 60 s em 09/11/2026. | `curl`, 09/11/2026; #15 |
| 8 | Acessibilidade básica | axe e teclado | Atende: axe sem violações em 2 telas; foco visível; sem rolagem em 375 px. O teste de ponta a ponta acha todos os campos pelos rótulos. | Ciclo de 02/11/2026; `fluxo.e2e.js`, 09/11/2026 |
| 9 | Segurança e conformidade | Riscos decididos | Parcial: o `zod` 3 vulnerável (GHSA-mrhx-c7xc-m3w5) saiu do app com o `expo` 57.0.32, o `shell-quote` com alerta crítico (GHSA-pqg4-j6r4-53mv) foi corrigido no lock, e o web foi para `vitest` 5.1; API sem alertas. Falta o que só o responsável decide: bancos com e-mail e WhatsApp no histórico e alertas do Dependabot desligados (API 403). | `npm audit` na API e no web: 0; no app: 0 crítico, 0 alto, 4 moderados, 8 baixos; `gh api .../dependabot/alerts` = 403, 09/11/2026; #17 |
| 10 | Entrega confiável | CI verde antes de entrar na principal | Parcial: CI roda em PR e push para `master` e `developer/**`, mas a `master` não tem proteção. | API `branches/master/protection` = 404, 09/11/2026; #16 |
| 11 | Testes dos fluxos críticos | Testes automatizados no CI | Atende: 13 na API, 5 no web, 3 no app e 2 de ponta a ponta no navegador. | `npm test` (API 13 pass, web 5 pass, app 3 pass) e `npm run test:e2e` (2 pass), 09/11/2026 |
| 12 | Documentação honesta | O README ensina a rodar | Atende: comandos conferidos com o `package.json`, inclusive `npm run test:e2e` e o contorno do `better-sqlite3` no Windows; aviso de estudo; estado e próximos passos. | README, 09/11/2026 |

## Hipótese (proposta)

Praticar API, web e app móvel: uma ONG cadastrar um caso em até 3 passos.

## Fora do MVP

Doação pelo site e contas de doador.

## Neste ciclo (07/11/2026)

Fluxo principal percorrido no navegador com Playwright e job `e2e` no CI (#19); contato por WhatsApp com link `wa.me`, que abre mesmo sem o app instalado; `zod` vulnerável fora do app sem trocar de SDK; `vitest` 5.1 no web.

## Histórico

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

