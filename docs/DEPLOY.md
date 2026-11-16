# Deploy · Be The Hero

> **Estado em 16/11/2026: fora do ar.** Nada foi criado no Render nem no Neon. `https://be-the-hero-web.onrender.com` respondeu 404 com `x-render-routing: no-server` (nome livre). A decisão de publicar é do responsável (#15). Projeto de estudo (N1): publicar não é obrigatório.

Guia para publicar a API e o painel web das ONGs sem custo. O app móvel (Expo) não entra: ele só aponta para a API publicada.

## 1. Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **Render: API (Web Service) + painel (Static Site) num Blueprint, banco no Neon (escolhida)** | Um `render.yaml` cria os dois serviços, já com `VITE_API_URL` e `CORS_ORIGINS` apontando um para o outro, e publica a cada push na `master` |
| Painel no GitHub Pages + API no Render | Outro pipeline, `base` e `404.html` extras e mais uma origem no CORS |
| PostgreSQL gratuito do Render | Expira 30 dias depois de criado; o Neon segue gratuito |
| Publicar o app nas lojas | Fora do escopo: o app roda no Expo Go |

## 2. O que já está pronto no repositório

| Item | Arquivo | Por quê |
|---|---|---|
| Serviços `be-the-hero-ongs-api` e `be-the-hero-web` | `render.yaml` | Em 16/11/2026, `be-the-hero-api.onrender.com` respondia 200 com a API de outra conta. Os dois nomes novos estavam livres |
| `CORS_ORIGINS` e `VITE_API_URL` cruzados | `render.yaml` | Só a `DATABASE_URL` fica para digitar; o `AUTH_SECRET` o Render gera |
| `NODE_VERSION` `"22"` | `render.yaml` | Mesma versão do CI |
| `npm ci` sem compilar | `backend/.npmrc` | O `better-sqlite3` 13.2 traz binário pronto; o build da API fica mais curto |
| Migrações na subida, `/health`, `trust proxy`, TLS no PostgreSQL | `backend/src` | A API cria as tabelas sozinha no banco vazio |
| Regra de *rewrite* e saída `build/` | `render.yaml`, `frontend/vite.config.js` | F5 em `/profile` não dá 404 |

## 3. Limites do plano gratuito

- A API dorme depois de 15 min sem acesso e leva cerca de 1 min para acordar. O site estático não dorme.
- As 750 horas mensais do Render são da conta inteira.
- O Neon suspende o banco parado (acorda em cerca de 1 s) e dá 0,5 GB por projeto.

## 4. Segurança e dados pessoais

- O banco do Neon nasce vazio. Nenhum dado do `db.sqlite` local vai para produção.
- **Não rode `npm run seed` em produção.** Os IDs da seed de demonstração são públicos. A seed já se recusa a rodar fora do SQLite.
- A lista pública mostra e-mail, WhatsApp e cidade da ONG; é o que permite o contato. Numa demonstração, cadastre só ONGs fictícias (`@exemplo.test`, DDD 00).
- `AUTH_SECRET` e `DATABASE_URL` ficam só no painel do Render. Nunca no Git.

## 5. Passo a passo (responsável)

### Etapa 1 · Banco no Neon, com usuário próprio do app

1. Entrar em **neon.com** com a conta do GitHub.
2. Abrir o projeto do portfólio (ou **New Project**, região **AWS US West 2 (Oregon)**, a mesma do Render).
3. **Branches → main → Roles → New Role**: nome `be_the_hero_app`. Copiar a senha mostrada só uma vez para o gerenciador de senhas.
4. **Branches → main → Databases → New Database**: nome `be_the_hero`, **Owner** `be_the_hero_app`. Assim o usuário do app só é dono do banco dele.
5. **Connect**: Branch `main`, Database `be_the_hero`, Role `be_the_hero_app`, **Connection pooling desligado**. Copiar a string.
6. Conferir o formato: `postgresql://be_the_hero_app:SENHA@ep-xxxx.us-west-2.aws.neon.tech/be_the_hero?sslmode=require`. O `?sslmode=require` tem que ficar.

### Etapa 2 · Serviços no Render

1. Entrar em **render.com** com a conta do GitHub e liberar o repositório `be-the-hero`.
2. **New → Blueprint**, repositório `douglasabnovato/be-the-hero`, branch `master`.
3. O Render pede uma variável: `DATABASE_URL` = string da Etapa 1. As outras vêm do `render.yaml`.
4. Conferir `be-the-hero-ongs-api` (Free) e `be-the-hero-web` (Static) e clicar em **Apply**.
5. Nos **Logs** da API, esperar a linha `API em http://localhost:10000`.
6. Se o Render acrescentar um sufixo a algum endereço (nome já usado), corrigir `CORS_ORIGINS` e `VITE_API_URL` no `render.yaml` por PR. O Render republica os dois.

### Etapa 3 · Conferir no ar

1. `curl -s https://be-the-hero-ongs-api.onrender.com/health` responde `{"status":"ok"}` (a primeira chamada pode levar 1 min).
2. `curl -s -o /dev/null -w "%{http_code}" https://be-the-hero-ongs-api.onrender.com/ongs` responde 404 (a rota que vazava os IDs não existe).
3. `https://be-the-hero-web.onrender.com` abre o logon com a imagem dos heróis.
4. **Não tenho cadastro**: cadastrar uma ONG fictícia; o ID de 16 caracteres aparece na tela.
5. Entrar com o ID, cadastrar um caso com valor em reais e ver o caso na lista.
6. F5 em `/profile` e em `/incidents/new`: a página continua.
7. `curl -s "https://be-the-hero-ongs-api.onrender.com/incidents?uf=SC"` lista o caso.
8. Excluir o caso no painel e sair.
9. App (opcional): `EXPO_PUBLIC_API_URL=https://be-the-hero-ongs-api.onrender.com` em `mobile/.env`, `npx expo start` e abrir no Expo Go.

### Etapa 4 · Fechar

1. No GitHub, **About → Website**: `https://be-the-hero-web.onrender.com`.
2. Comentar na #15 o resultado dos passos 1 a 3 da Etapa 3, com a data.
3. O agente do próximo ciclo põe o link no README e mede o LCP (critério 7 não se aplica ao N1, mas a medida fica registrada).

## 6. Rodar localmente (sem conta nenhuma)

```bash
cd backend && npm ci && npm run seed && npm run dev   # API em http://localhost:3333, com 2 ONGs e 4 casos fictícios
cd frontend && npm ci && npm run dev                   # painel em http://localhost:5173
```

ID para entrar no painel com a ONG da demonstração: `de0000000000a001`.

## 7. Decisões pendentes (responsável)

- **Histórico do Git com dados de ONGs** (#17): reescrever (`git filter-repo`) ou aceitar o risco.
- **Publicar ou ficar só local** (#15).
- **ID como senha:** o acesso da ONG é só o ID (regra do curso). Trocar por e-mail e senha muda a regra de negócio e só entra com ordem do responsável.
