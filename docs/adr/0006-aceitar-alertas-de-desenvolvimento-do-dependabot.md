# ADR-06: Aceitar os alertas de desenvolvimento do Dependabot

- **Status:** Aceita
- **Data:** 16/11/2026
- **Numeração:** segue as ADR-01 a ADR-05 da tabela em [`docs/ARQUITETURA.md`](../ARQUITETURA.md#4-adrs).

## Contexto

Em 16/11/2026, às 14:39, `gh api "repos/douglasabnovato/be-the-hero/dependabot/alerts?state=open&per_page=100"` devolveu 2 alertas abertos, os dois em `mobile/package-lock.json`. API (`backend/`) e site (`frontend/`) não têm alerta.

Regra para os alertas, ordem do responsável repassada pelo DG líder em 16/11/2026:

> "Regra geral por ADR. alertas que nao atrapalham a producao, pode passar. os que atrapalham, entender, escolher a melhor estrategia para manter a funcionalidade"

"Produção" aqui é o que roda no site e na API do Render e o JavaScript que o Metro empacota no app. O app é de estudo (N1), não está congelado (Expo 57) e roda no Expo Go; não há build publicado em loja.

## Decisão

| Alerta | Pacote | Severidade | Quem o puxa | Por que não chega à produção |
|---|---|---|---|---|
| #3 | `minimatch` 10.2.6 (GHSA-g3hv-75wg-m249) | média | `expo` → `@expo/fingerprint` 0.20.16 | O `@expo/fingerprint` calcula o hash do projeto nativo durante o build e na CLI. Não entra no bundle: o mapa de fontes do `npx expo export` não tem nenhum módulo de `minimatch` nem de `@expo/fingerprint`. A correção só existe na versão 11, que o Expo 57 não aceita. |
| #1 | `deepmerge` 4.3.1 (GHSA-gcqx-w48m-w2h4) | baixa | `jest` → `@jest/core` → `jest-config` | Só roda nos testes (`npm test`), em dependência de desenvolvimento. Não há versão corrigida publicada. |

Prova, em 16/11/2026, no clone de `developer/sprint-2026-11-19`, pasta `mobile/`, depois de `npm ci`:

- `npm ls minimatch glob deepmerge --all`: `minimatch@10.2.6` só sob `@expo/fingerprint@0.20.16`; `deepmerge@4.3.1` só sob `jest-config@29.7.0`.
- `npx expo export --platform android --source-maps`: ok. O mapa de fontes lista 886 módulos; 0 de `minimatch`, 0 de `glob`, 0 de `deepmerge`, 0 de `@expo/fingerprint`, 0 de `jest`. O único arquivo de `@expo/cli` no bundle é `metro-require/require.js`, o carregador de módulos do Metro.
- `npm audit --omit=dev`: 3 moderados, todos na cadeia `expo` → `@expo/fingerprint` → `minimatch`. A correção sugerida é `expo@52`, uma volta de SDK, que o projeto não aceita (ADR-05).

Não se fecha nem se dispensa alerta pela API. Esta ADR só registra a decisão.

## Consequências

- O risco fica no ambiente de quem desenvolve e no CI (CLI do Expo e testes), não no site, na API nem no app empacotado.
- Os alertas #3 e #1 seguem abertos no GitHub. O critério 9 do `docs/MVP.md` conta os dois como cobertos por esta ADR.
- A issue #38 fica com esta ADR como resposta à opção 3. O histórico dos bancos (#17, `depende-do-responsavel`) segue fora desta ADR.

## Quando revisar

- Se `minimatch`, `deepmerge` ou `@expo/fingerprint` passarem a aparecer no mapa de fontes do `npx expo export`.
- Se sair correção sem versão maior (um `@expo/fingerprint` com `minimatch` 11 dentro do Expo 57, ou um `deepmerge` corrigido).
- Na migração para o Expo SDK 58.
