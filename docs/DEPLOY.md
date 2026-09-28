# Deploy · Be The Hero

Plano de ação para publicar a API e o painel web das ONGs em hospedagem gratuita.

## 1. Desafio

Colocar no ar, sem custo, a API Express + Knex (PostgreSQL em produção) e o painel React das ONGs, depois de corrigir uma falha que expunha o ID de acesso de todas as ONGs e com dados de ONGs ainda versionados no Git. O app mobile (Expo) não entra no deploy web: ele passa a apontar para a API publicada.

## 2. Conteúdo

### Decisão de hospedagem

| Opção | Resultado |
|---|---|
| **Render: API (Web Service) + painel (Static Site) num único Blueprint, banco no Neon (escolhida)** | Um `render.yaml` cria os dois serviços já com `VITE_API_URL` e `CORS_ORIGINS` apontando um para o outro e publica ambos a cada push |
| Painel no GitHub Pages + API no Render | O front fica no Render porque o mesmo Blueprint já o publica com a URL da API fixada e com a regra de rotas do React; no Pages seria outro pipeline, `base` e `404.html` extras e mais uma origem no CORS |
| Heroku (API) + Netlify (web), como no curso | O Heroku não tem mais plano gratuito |
| PostgreSQL gratuito do próprio Render | Expira 30 dias após a criação; o Neon continua de graça |
| Publicar o app mobile | Fora deste deploy: o app roda no Expo Go e só precisa da URL da API |

### Banco no Neon: um projeto, um banco por aplicação

Use **um único projeto no Neon** (por exemplo `portfolio-ser-mvp`) com **um banco por aplicação** (`doe_sangue`, `feedback_widget`, `be_the_hero`...). Assim você não esbarra no limite de projetos do plano gratuito, administra tudo num só painel e cada aplicação fica isolada no próprio banco. Os bancos do projeto dividem a cota de armazenamento e de computação.

O banco do Neon nasce **vazio**: as 14 ONGs do `db.sqlite` local não vão para produção. As migrações do Knex criam as tabelas na primeira subida da API.

### O que foi ajustado para produção

| Mudança | Arquivo | Por quê |
|---|---|---|
| Serviços renomeados para `be-the-hero-api` e `be-the-hero-web` | `render.yaml` | `bethehero-*` quase certamente já existe no Render (projeto da Semana OmniStack); o nome do repositório tem mais chance de sair limpo na URL |
| `CORS_ORIGINS` e `VITE_API_URL` fixados com as URLs do Render | `render.yaml` | Só a `DATABASE_URL` fica para digitar; o `AUTH_SECRET` o Render gera sozinho |
| `NODE_VERSION` `"22"` nos dois serviços | `render.yaml` | O Node 20 saiu de suporte em abr/2026 e o `better-sqlite3` 13 exige Node 22 ou mais novo |
| `autoDeployTrigger: commit` | `render.yaml` | Cada push na `master` publica sozinho |
| Node 22 nos três jobs do CI | `ci/github-actions-ci.yml` | Mesma versão da produção (e exigida pelo `better-sqlite3`) |
| Seção "Em produção" | `Readme.md` | URL, hospedagem e link para este guia |

Já estava pronto do ciclo anterior: migrações rodando na subida da API, `trust proxy`, TLS no PostgreSQL, rota `/health`, `build/` como saída do Vite e a regra de *rewrite* para as rotas do React.

### Limitações do plano gratuito

- A API dorme após 15 min sem acesso e leva cerca de 1 min para acordar; o primeiro logon depois disso demora. O site estático não dorme.
- O build da API compila o `better-sqlite3` (usado só no desenvolvimento), o que acrescenta 1 a 2 min ao deploy.
- As 750 horas mensais do Render são da conta inteira. O Neon suspende o banco após 5 min parado (acorda em ~1 s) e oferece 0,5 GB por projeto (limites em neon.com/pricing).

### Segurança e LGPD

- A API antiga tinha `GET /ongs`, que devolvia o ID de acesso (a "senha") de todas as ONGs. Se ela esteve publicada (o curso usava Heroku), **considere todos os IDs vazados**.
- `backend/src/database/db.sqlite` (14 ONGs com e-mail e WhatsApp) e `test.sqlite` estão no Git. O `git rm --cached` tira os arquivos das próximas versões, mas eles continuam no histórico do repositório.
- A lista pública de casos mostra e-mail, WhatsApp e cidade da ONG: é o que permite ao herói entrar em contato. Numa demonstração, cadastre só ONGs fictícias.
- O `AUTH_SECRET` é gerado pelo Render e nunca aparece no Git; a `DATABASE_URL` fica só no painel do Render.

## 3. Solução (passo a passo)

### Etapa 0 · IDs vazados e dados pessoais no Git

1. Se a API antiga esteve publicada com dados de ONGs reais: avise essas ONGs de que o ID de acesso antigo foi exposto e peça novo cadastro (os IDs novos têm 16 caracteres). Os IDs antigos não existem no banco novo do Neon.
2. Se as 14 ONGs do `db.sqlite` forem reais, decida se o histórico do Git precisa ser limpo (ver "Decisões pendentes" no fim). Os passos da Etapa 3 já tiram os arquivos das próximas versões.
3. Atualizar o seu banco local com a nova migração: `cd /c/ambiente-projeto/ser-mvp/be-the-hero/backend && npx knex migrate:latest`.

### Etapa 1 · Criar o banco no Neon

1. Entrar em **neon.com** com a conta do GitHub.
2. Se ainda não existir, **New Project**: nome `portfolio-ser-mvp`, região **AWS US West 2 (Oregon)** (a mesma região padrão do Render). Os outros projetos do portfólio usam este mesmo projeto.
3. **Branches → main → aba Databases → New database**: nome `be_the_hero`, dono `neondb_owner`.
4. No **Project Dashboard**, botão **Connect**: Branch `main`, Database `be_the_hero`, Role `neondb_owner`, **Connection pooling desligado**, e copiar a string.
5. Conferir o formato: `postgresql://neondb_owner:SENHA@ep-xxxx.us-west-2.aws.neon.tech/be_the_hero?sslmode=require`. Se vier `&channel_binding=require` no final, pode remover; o `?sslmode=require` tem que ficar.

### Etapa 2 · Validar localmente (Git Bash)

1. `cd /c/ambiente-projeto/ser-mvp/be-the-hero/backend`
2. `npm ci` (compila o `better-sqlite3`; se falhar no Windows por falta de compilador, instale o **Visual Studio Build Tools** com "Desenvolvimento para desktop com C++" ou confie no CI)
3. `npm test` (12 testes em SQLite em memória)
4. `cd ../frontend && npm ci && npm test && npm run build` (5 testes)
5. `cd ../mobile && npm ci && npx expo install --check` (o app no celular continua pendente de teste no Expo Go)

### Etapa 3 · Subir para o GitHub (branch `master`)

1. Voltar à raiz: `cd /c/ambiente-projeto/ser-mvp/be-the-hero`
2. Tirar do Git os bancos com dados pessoais (os arquivos continuam na sua máquina):
   `git rm --cached backend/src/database/db.sqlite backend/src/database/test.sqlite`
3. Tirar do Git o cache do Expo (348 arquivos):
   `git rm -r --cached mobile/.expo mobile/.expo-shared frontend/.expo`
4. Remover os arquivos substituídos:
   `git rm -r backend/jest.config.js backend/src/routes.js backend/src/controllers backend/tests/integration/ong.spec.js backend/tests/unit/generateUniqueId.spec.js frontend/README.md frontend/public/index.html frontend/src/index.js frontend/src/App.js frontend/src/routes.js frontend/src/Header.js frontend/src/services/api.js frontend/src/pages/*/index.js frontend/yarn.lock mobile/src/services/api.js mobile/yarn.lock`
5. Ativar o CI (a pasta `.github` é protegida para a ferramenta que preparou o projeto):
   `mkdir -p .github/workflows && mv ci/github-actions-ci.yml .github/workflows/ci.yml && rmdir ci`
6. `git status` (não podem aparecer `.sqlite`, `.expo/`, `.env`, `build/` nem `node_modules/` como adicionados)
7. `git add -A`
8. `git commit -m "feat(deploy): Blueprint do Render com URLs cruzadas, Node 22, dados e cache fora do Git, guia de deploy com Neon"`
9. `git push origin master`
10. No GitHub, aba **Actions**: o CI precisa ficar verde (API em SQLite e PostgreSQL, web e checagem do Expo).

### Etapa 4 · Criar os serviços no Render

1. Entrar em **render.com** com a conta do GitHub e autorizar o repositório `be-the-hero`.
2. **New → Blueprint** e escolher `douglasabnovato/be-the-hero`, branch `master`.
3. O Render pede **uma** variável: `DATABASE_URL` = string do Neon (Etapa 1). `AUTH_SECRET` é gerado automaticamente; `CORS_ORIGINS`, `VITE_API_URL`, `NODE_ENV` e `NODE_VERSION` vêm do `render.yaml`.
4. Conferir `be-the-hero-api` (Free) e `be-the-hero-web` (Static) e clicar em **Apply**.
5. Nos **Logs** da API, esperar `API em http://localhost:10000` (4 a 7 min, por causa da compilação).

### Etapa 5 · Conferir no ar

1. `https://be-the-hero-api.onrender.com/health` responde `{"status":"ok"}`.
2. `https://be-the-hero-api.onrender.com/ongs` responde 404 (a rota que vazava os IDs não existe mais).
3. `https://be-the-hero-web.onrender.com` abre o logon com a imagem dos heróis.
4. **Não tenho cadastro**: cadastrar uma ONG fictícia; o ID de 16 caracteres aparece na tela (sem `alert()`).
5. Entrar com esse ID: o perfil abre; cadastrar um caso com valor em reais; ele aparece na lista.
6. Dar F5 em `/profile` e em `/incidents/new`: a página continua (regra de *rewrite*).
7. `https://be-the-hero-api.onrender.com/incidents?page=1` lista o caso.
8. Excluir o caso no painel e sair.
9. No **SQL Editor** do Neon (banco `be_the_hero`): `SELECT id, name, created_at FROM ongs;` mostra a ONG de teste. Apagar: `DELETE FROM incidents; DELETE FROM ongs;`.
10. App mobile (opcional): em `mobile/.env`, `EXPO_PUBLIC_API_URL=https://be-the-hero-api.onrender.com`, `npx expo start` e abrir no Expo Go.

### Etapa 6 · Fechar

1. Se o Render acrescentar um sufixo a alguma URL (nome já usado), corrigir `CORS_ORIGINS` e `VITE_API_URL` no `render.yaml` e a URL no `Readme.md`, commit e push (o Render republica os dois).
2. No GitHub, **About → Website**: colar `https://be-the-hero-web.onrender.com`.

### Decisões pendentes

- **Histórico do Git com dados de ONGs:** se os e-mails e WhatsApps do `db.sqlite` forem reais, apagar do histórico exige reescrevê-lo (`git filter-repo`) e forçar o push. Não foi feito porque muda o histórico público do repositório.
- **Aviso no cadastro:** acrescentar na tela de cadastro uma frase como "E-mail, WhatsApp e cidade ficam visíveis para quem quiser ajudar nos casos da ONG." Deixa explícito o uso público dos dados (LGPD).
- **`better-sqlite3` em produção:** ele só é usado sem `DATABASE_URL`. Passá-lo para `devDependencies` tiraria a compilação do build do Render (1 a 2 min a menos), mas muda como o projeto é instalado.
- **ID como senha:** o acesso da ONG continua sendo só o ID (produto original). Alternativa: e-mail + senha com recuperação.
