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
