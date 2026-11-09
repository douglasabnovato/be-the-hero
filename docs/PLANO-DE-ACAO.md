# Plano de ação — Be The Hero

Timebox: 60 min.

| MoSCoW | Item | Ganho | Esforço | Status |
|---|---|---|---|---|
| Must | Remover `GET /ongs` e exigir token (D1, D2) | Alto | Baixo | ✅ |
| Must | Exclusão segura e 404 (D3) | Alto | Baixo | ✅ |
| Must | App voltar a compilar (D4) | Alto | Médio | ✅ código; ⏳ validar no celular |
| Should | Validação e FK (D5) | Médio | Baixo | ✅ |
| Should | Bancos e caches fora do Git (D6) | Médio | Baixo | ⏳ ação sua (lista de exclusão) |
| Should | Web acessível e responsivo, sem alert (D7) | Médio | Médio | ✅ axe 0 |
| Should | Postgres em produção + testes nos dois bancos | Médio | Médio | ✅ |
| Could | Login por e-mail e senha / recuperação de acesso | Alto | Médio | **Decisão sua** |
| Could | Editar caso e marcar como resolvido | Médio | Baixo | Próximo ciclo |

## Ciclo de 03/11/2026

> Executado em 06/11/2026. Branch `feature/2026-11-06` → `developer/sprint-2026-11-12` → `master`. Nível: Estudo (N1), 10 critérios aplicáveis.

### Produto

**Problema e público.** ONGs precisam divulgar casos que pedem ajuda; pessoas querem ajudar e não sabem onde. Projeto de estudo da Semana Omnistack 11.

**Hipótese e meta.** Uma ONG cadastra um caso em até 3 passos, e um herói acha um caso perto de si. Meta de estudo: fluxo completo na tela e nos testes.

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| Plataformas de voluntariado filtram oportunidades por cidade, CEP ou raio, porque a pessoa ajuda melhor perto de casa | A API ganhou `GET /incidents?uf=SC` neste ciclo; a tela do app virou a #18 | [Benevity: filtros do catálogo](https://b-hive.benevity.com/hc/articles/37331168533652), [NLvoorelkaar: como buscar](https://www.nlvoorelkaar.nl/en/helpcentrum/artikel/210300385) |
| Filtros por causa e por habilidade ajudam a combinar pessoa e oportunidade | Fica para depois do filtro por UF; anotado no backlog | [VolunteerMatch no GetApp](https://www.getapp.co.uk/software/110693/yourmatch) |
| Oportunidade encerrada precisa sair da lista para não gerar contato à toa | Virou a #20: marcar caso como resolvido | [LinkedIn for Nonprofits: encontrar voluntários](https://nonprofit.linkedin.com/blog/2021/11/how-to-find-the-right-volunteers-for-your-nonprofit) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | CI nos PRs para a `developer` | Alto | Baixo | Este ciclo |
| 2 | Tirar código antigo, specs de Jest e `yarn.lock` | Médio | Baixo | Este ciclo |
| 3 | Filtro por UF na API | Médio | Baixo | Este ciclo |
| 4 | Tirar do README o link que serve a API de outro projeto | Alto | Baixo | Este ciclo |
| 5 | Filtro por UF no app | Médio | Baixo | #18 |
| 6 | Fluxo completo na tela | Alto | Médio | #19 |
| 7 | Editar e resolver caso | Médio | Médio | #20 |
| 8 | Publicar ou ficar só local | Médio | Baixo | Responsável (#15) |
| 9 | Proteger a `master` | Alto | Baixo | Responsável (#16) |
| 10 | Histórico dos bancos e alertas do Dependabot | Alto | Baixo | Responsável (#17) |

**Fora do escopo.** Doação pelo site, contas de doador, filtro por causa.

### Engenharia

**Arquitetura.** API Express em `backend/src/app.js` com Knex: SQLite no desenvolvimento e nos testes, PostgreSQL em produção, mesmas migrações. Validação com `zod` em `lib/validation.js`. Web em Vite + React 18 (`frontend/src`); app em Expo 57 (`mobile/`), que lê a lista pública.

**Riscos.**
- O endereço `be-the-hero-api.onrender.com` serve a API de outro projeto; usar o mesmo nome no `render.yaml` vai falhar ou confundir (#15).
- O `better-sqlite3` precisa compilar; no Windows sem ferramentas de C++ a API não roda localmente.
- Sem proteção na `master` e sem alertas do Dependabot (#16, #17).

**Qualidade.**
- Testes: 14 na API (`node --test`, inclui o filtro por UF), 5 no web (Vitest), testes de `mobile/src/lib`.
- CI: agora também em PR e push para `developer/**`.
- Acessibilidade: axe sem violações em 2 telas (ciclo de 02/11).
- Segurança: a rota que expunha os IDs de acesso saiu na versão 2.0; sem dados pessoais novos.

**Definição de pronto.** `npm ci` e `npm test` em `backend`, `frontend` e `mobile`; `npm run build` no web; CI verde no PR; `docs/MVP.md` e README atualizados.

### Plano de ação

**Este ciclo executa.**
1. CI nos PRs e pushes para `developer/**`.
2. Remove o código antigo que nada importava (`backend/src/routes.js`, `controllers`, `jest.config.js`, specs de Jest, arquivos do CRA no web, `mobile/src/services`) e os `yarn.lock`. O `docs/DEPLOY.md` já mandava apagar.
3. `GET /incidents?uf=` com teste.
4. README sem o link da API de outro projeto; `docs/MVP.md` com régua N1 e critério 10 em "Parcial".

**Vira issue.** #15, #16 e #17 (responsável); #18, #19 e #20 (agente).

## Ciclo de 07/11/2026

> Executado em 09/11/2026. Branch `feature/2026-11-07` → `developer/sprint-2026-11-12` → `master` (o PR para a `master` fica aberto para o responsável). Nível: Estudo (N1), 10 critérios aplicáveis. Antes: 7 de 10.

### Produto

**Problema e público.** Os mesmos do ciclo anterior: ONGs divulgam casos; heróis encontram quem ajudar e falam com a ONG.

**Hipótese e meta.** Uma ONG cadastra um caso em até 3 passos. Meta deste ciclo: ver o fluxo inteiro rodar no navegador, com banco de verdade, e não só nos testes da API.

**O que a pesquisa trouxe.**

| Ideia | O que levamos para o projeto | Fonte |
|---|---|---|
| O link "clique para conversar" `wa.me/<número>?text=` usa o número só com dígitos e DDI, sem `+` nem zero, e abre o WhatsApp ou o navegador | O app passa de `whatsapp://send` (falhava sem o app instalado) para `https://wa.me/55...`, limpando máscara e zero inicial | [Linkly: gerador de links do WhatsApp](https://linklyhq.com/blog/whatsapp-link-generator), [Wati: links click to chat](https://support.wati.io/en/articles/11462980-how-to-create-whatsapp-click-to-chat-links) |
| O Playwright descarta diálogos sozinho; para aceitar um `confirm`, o ouvinte (`page.once("dialog")`) tem de existir antes do clique | O teste de ponta a ponta aceita a confirmação da exclusão do caso | [Playwright: dialogs](https://playwright.dev/docs/dialogs) |
| O `better-sqlite3` antigo não tem binário pronto para o Node 24, e a versão 13 trocou o carregador; no Windows sem ferramentas de C++ a instalação falha | Contorno local registrado no README; o CI (Node 22) segue com o lock | [Troubleshooting do better-sqlite3](https://www.github.com/WiseLibs/better-sqlite3/blob/master/docs/troubleshooting.md), [issue #1382](https://github.com/WiseLibs/better-sqlite3/issues/1382) |

**Backlog priorizado (impacto × esforço).**

| Prioridade | Item | Impacto | Esforço | Destino |
|---|---|---|---|---|
| 1 | Fluxo principal no navegador, com teste no CI | Alto | Médio | Este ciclo (#19) |
| 2 | `zod` vulnerável fora do app sem trocar de SDK | Alto | Baixo | Este ciclo |
| 3 | WhatsApp por `wa.me` | Médio | Baixo | Este ciclo |
| 4 | Filtro por UF no app | Médio | Baixo | #18 |
| 5 | Editar caso e marcar como resolvido | Médio | Médio | #20 |
| 6 | Publicação, proteção da `master`, histórico e Dependabot | Alto | Baixo | Responsável (#15, #16, #17) |

**Fora do escopo.** Doação pelo site, contas de doador, teste em aparelho.

### Engenharia

**Arquitetura.** Sem mudança de forma: API Express com Knex (SQLite no desenvolvimento, PostgreSQL em produção), web em Vite e app em Expo 57. O teste de ponta a ponta sobe a API com `npm start` e um arquivo SQLite temporário (`SQLITE_FILE`), nas portas 3343 e 5183 para não colidir com o `npm run dev`.

**Riscos.**
- O teste de ponta a ponta faz o papel do app pela lista pública da API; a tela do app segue sem teste em aparelho.
- `wa.me` exige um número com WhatsApp ativo; com número errado, o WhatsApp avisa na própria página.
- Alertas do Dependabot desligados: ninguém é avisado de dependência vulnerável (#17).

**Qualidade.** API 13 testes, web 5, app (`mobile/src/lib`), ponta a ponta 2 (Playwright 1.65). `npm audit`: API e web sem alertas; app sem alto.

**Definição de pronto.** `npm test` nos três pacotes, `npm run build` no web, `npm run test:e2e` verde, CI verde no PR para a sprint, `docs/MVP.md` e README atualizados.

### Plano de ação

**Este ciclo executa.**
1. Teste Playwright do fluxo principal, com job `e2e` no CI (#19).
2. `expo` 57.0.32 no app (sai o `zod` 3 vulnerável), `shell-quote` corrigido (alerta crítico, só no lock) e `vitest` 5.1 no web (só no lock).
3. WhatsApp por `wa.me`, com testes.
4. `docs/MVP.md` com uma tabela só e README com o estado do ciclo.

**Vira issue.** O que ficou para depois está nas issues abertas (#15 a #18, #20) e nas novas listadas no README.
