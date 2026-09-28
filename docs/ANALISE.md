# Análise — Be The Hero

## 1. Especificação

ONGs cadastram casos que precisam de ajuda financeira; heróis veem os casos no app e entram em contato por WhatsApp ou e-mail.

| Ator | Canal | Objetivo |
|---|---|---|
| ONG | Web | Cadastrar-se, entrar com o ID, cadastrar e excluir casos |
| Herói | App | Ver casos e falar com a ONG |

### Requisitos funcionais

| ID | Requisito | Critério de aceite | Antes |
|---|---|---|---|
| RF01 | Cadastrar ONG | Dados validados; ID de acesso exibido na tela | ⚠️ ID só em `alert()` |
| RF02 | Logon | ID válido abre o perfil | ⚠️ ID usado direto como credencial em toda requisição |
| RF03 | Cadastrar caso | Título, descrição e valor válidos | ❌ sem validação |
| RF04 | Excluir caso | Só a dona; inexistente responde 404 | ❌ derrubava a API |
| RF05 | Listar casos (app) | 5 por página, total no cabeçalho | ✅ (app não abria) |
| RF06 | Contatar ONG | WhatsApp com DDI e texto codificado; e-mail | ⚠️ link quebrado |

## 2. Defeitos encontrados

| # | Severidade | Defeito | Referência |
|---|---|---|---|
| D1 | Crítica | `GET /ongs` devolvia todas as ONGs com o **ID de acesso**: qualquer pessoa entrava como qualquer ONG | OWASP A01:2025 |
| D2 | Alta | ID de 8 hex (32 bits) usado como senha, sem limite de tentativas | OWASP A07:2025 |
| D3 | Alta | `DELETE /incidents/:id` inexistente → `TypeError` (API cai) | OWASP A10:2025 |
| D4 | Alta | App não compilava: `fontWeight= 'bold'`, texto dentro de `<View>`, `Constants` sem import, cor `'41414d'` sem `#`, `background` inválido no botão | — |
| D5 | Média | Casos sem validação; `ong_id` do header aceito sem existir (FK não ativa no SQLite) | — |
| D6 | Média | `db.sqlite` e `test.sqlite` versionados (dados de ONGs no Git); 348 arquivos de cache `.expo/` versionados | LGPD |
| D7 | Média | `alert()` para erros e para exibir o ID; inputs sem rótulo; `outline: 0` global | WCAG 2.2 2.4.7, 1.3.1 |
| D8 | Baixa | knexfile com credenciais de exemplo de Postgres nunca usadas; CRA 3 | — |

## 3. Baseline automatizado

| Verificação | Antes | Depois |
|---|---|---|
| Testes | 2 (1 unitário, 1 integração) | 12 API (SQLite **e** PostgreSQL) + 5 web |
| `npm audit` | vários (Express 4, Knex 0.21, CRA 3) | API 0, web 0 |
| axe-core | não medido | 0 violações em 4 telas |
| Migração do banco original | — | testada numa cópia do `db.sqlite` versionado: 14 ONGs e 28 casos preservados, coluna `created_at` criada (você aplica no seu com `npx knex migrate:latest`) |

## Rubrica v2 (grupo fullstack)

Aprovação: média ponderada ≥ 7,0 **e** C1 e C4 (eliminatórios) ≥ 5. Regras: nota sem evidência vale no máximo 6; C1 limitado a 7 para parte não executada de ponta a ponta; C9 ≥ 8 só com URL publicada e CI verde.

| # | Critério | Referência | Peso | Antes | Depois | Evidência | Justificativa |
|---|---|---|---|---|---|---|---|
| C1 | Núcleo de valor | MVP (Ries); SWEBOK Requirements | 16% | 3 | 7 | E2E web+API em SQLite real (Playwright): cadastro → logon → caso → perfil | API e web rodam de ponta a ponta; mobile não executado (limite 7) |
| C2 | Estados e condições excepcionais | Nielsen; OWASP A10:2025 | 8% | 2 | 8 | testes 400/401/403/404 + estados de tela | Sem alert(); ID exibido na tela com copiar; confirmação antes de excluir |
| C3 | Acessibilidade | WCAG 2.2 AA (axe-core) | 7% | 3 | 8 | axe-core 0 violações (logon, cadastro, novo caso, perfil) | Rótulos, foco visível, contraste AA, layout responsivo |
| C4 | Segurança e privacidade | OWASP Top 10:2025 / ASVS 5.0 N1 | 14% | 1 | 6 | testes: /ongs removida, token obrigatório, dona apaga | GET /ongs devolvia o ID (senha) de todas as ONGs; ID de 8 hex (32 bits) virou 16 hex + limite de tentativas + token. O ID continua sendo a credencial (decisão de produto). Auditoria: db.sqlite com os IDs de acesso das 14 ONGs segue versionado até o git rm --cached (ação sua) |
| C5 | Dados | 3FN / ACID / fonte única | 10% | 4 | 8 | mesmos 12 testes em SQLite e PostgreSQL 16 (reexecutados na auditoria: 12/12 com TEST_DATABASE_URL); migração testada numa cópia do db.sqlite original (14 ONGs, 28 casos preservados) | FK ativa no SQLite, valores e WhatsApp normalizados, Postgres pronto para produção |
| C6 | Testes | Pirâmide de testes; SWEBOK Testing | 9% | 2 | 8 | node:test 12 (x2 bancos) + vitest 5 | API em 2 bancos, telas principais; mobile sem testes |
| C7 | Qualidade de código | SOLID / camadas; SWEBOK Construction | 7% | 4 | 8 | createApp com DI, validação única, knexfile por ambiente | Controllers e rotas no mesmo módulo coeso; sem código morto |
| C8 | Desempenho | Complexidade; Core Web Vitals | 5% | 5 | 7 | paginação 5/página, índice ong_id | Sem Lighthouse |
| C9 | Operação | 12-Factor; DORA | 7% | 2 | 7 | render.yaml, .env.example, CI em ci/ | Sem URL publicada |
| C10 | Documentação | README como contrato | 5% | 5 | 8 | Readme + docs/ | Como rodar API/web/mobile e deploy gratuito |
| C11 | Produto e evidência | Cagan (4 riscos); Torres | 7% | 4 | 7 | fluxo ONG↔herói completo | Resolve o problema do readme; sem métrica |
| C12 | Sustentabilidade técnica | OWASP A03:2025; SWEBOK Maintenance | 5% | 2 | 7 | npm audit 0 (API/web); mobile: moderadas no tooling Expo | Express 5, Knex 3, Vite 8, Expo SDK 57 (não compilado aqui) |

**Média ponderada:** antes **2,87** (REPROVADO) → depois **7,32** (APROVADO).

## Limitações da avaliação

- App Expo não executado em dispositivo (escopo combinado).
- O ID continua sendo a credencial da ONG, como no produto original; agora é mais forte, com limite de tentativas e token de sessão. Login com e-mail e senha fica como decisão sua.
