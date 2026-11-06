# MVP — be-the-hero

> Revisto em 06/11/2026 (ciclo de 03/11/2026). Nível: **Estudo (N1)**. Os critérios 5 e 7 não se aplicam ao N1 e saem da conta. Testado no Windows, com Node 24, no clone da `feature/2026-11-06`; a API roda só no CI, porque o `better-sqlite3` não compila nesta máquina. Não houve teste com pessoas nem em aparelho real.

**Finalizado: não.** Falta o critério 3 (fluxo na tela, #19). Os critérios 9 (#17) e 10 (#16) dependem do responsável.

## 1. Critérios: 7 de 10 aplicáveis atendidos

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

## 2. Hipótese (proposta)

Praticar API, web e app móvel: uma ONG cadastrar um caso em até 3 passos.

## 3. Fora do MVP

Doação pelo site e contas de doador.

## 4. Neste ciclo

CI nos PRs para `developer/**`; código antigo, specs de Jest que não rodavam e `yarn.lock` removidos; filtro `?uf=` na lista pública, com teste; documentação e 6 issues (#15 a #20).
