## Omnistack 11.0

### Be The Hero

#### Back End [DONE]

- [x] 1. Back End - NodeJS 
- [x] 1.1. Node.js e Express
- [x] 1.1.1. Rotas e recursos
- [x] 1.1.2. Métodos HTTP
- [x] 1.1.2.1. GET: buscar uma informação do back-end
- [x] 1.1.2.2. POST: criar uma informação no back-end
- [x] 1.1.2.3. PUT: alterar uma informação no back-end
- [x] 1.1.2.4. DELETE: deletar uma informação no back-end
- [x] 1.1.3. Tipos de Parâmetros
- [x] 1.1.3.1 Query Params: parâmetros nomeados enviados na rota após "?" (filtros e paginação)
- [x] 1.1.3.2 Route Params: parâmetros utilizados para identificar recursos
- [x] 1.1.3.3 Request Body: o corpo da requisição
- [x] 1.2. Nodemon: `npm install nodemon -D`. Executar: `npm start`
- [x] 1.3. Insomnia : `http://localhost:3333/users`
- [x] 1.4. Banco de Dados
- [x] 1.4.1. SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
- [x] 1.4.2. NoSQL: MongoDB, CouchDB
- [x] 1.4.3. O projeto usará SQLite
- [x] 1.5. Configuração do Back-end
- [x] 1.5.1. Driver: SELECT * FROM users
- [x] 1.5.2. Query Builder: table('users').select('*').where() 
- [x] 1.5.3. O projeto usará Query Builder, com a ferramenta `Knex.js`
- [x] 1.5.4. Instalação do Knex: npm install knex
- [x] 1.5.5. Instalação do SQLite: npm install sqlite3
- [x] 1.5.6. Configurar conexão: npx knex init : knexfile.js
- [x] 1.6. Dado o layout da aplicação já construído
- [x] 1.6.1. Pensar nas entidades da Aplicação (O que será salvo no bd)
- [x] 1.6.1.1. ONG
- [x] 1.6.1.2. Caso (incident) 
- [x] 1.6.2. Pensar nas funcionalidades da Aplicação
- [x] 1.6.2.1. Login de ONG
- [x] 1.6.2.2. Logout de ONG
- [x] 1.6.2.3. Cadastro de ONG
- [x] 1.6.2.4. Cadastrar novos casos
- [x] 1.6.2.5. Deletar casos
- [x] 1.6.2.6. Listar casos específicos de uma ONG
- [x] 1.6.2.7. Listar todos os casos
- [x] 1.6.2.8. Entrar em contato com a ONG (whatsapp e email)
- [x] 1.7. Configurar as migrations
- [x] 1.7.1. um controle de versão de db 
- [x] 1.7.2. criar a primeira migration: `npx knex migrate:make create_ongs` 
- [x] 1.7.3. Warning: useNullAsDefault 
- [x] 1.8. Criar tabela com Knex na migrations
- [x] 1.8.1. Configurar o arquivo
- [x] 1.8.2. `npx knex migrate:latest`
- [x] 1.9. Criar a migration incidents
- [x] 1.9.1. `npx knex migrate:make create_incidents`
- [x] 1.9.2. `npx knex migrate:latest`
- [x] 1.9.3. `npx knex migrate:rollback`: desfazer a criação da migration
- [x] 1.9.4. `npx knex migrate:state`: desfazer a criação da migration
- [x] 1.10. Cadastro de uma nova ong
- [x] 1.10.1. routes
- [x] 1.10.2. Insomnia: requisições 
- [x] 1.10.2.1. URL: http://localhost:3333/ongs
- [x] 1.10.2.2. Corpo:
````json
{
	"name":"APAD",
	"email":"contato@contato.com.br",
	"whatsapp":"4700000000",
	"city":"Rio de Janeiro",
	"uf":"Rio de Janeiro"
}
````
- [x] 1.10.2.3. Criar id: pacote crypto
- [x] 1.10.2.4. Conexão com banco de dados 
- [x] 1.10.2.4.1. corrigindo a criação das migration
- [x] 1.11. Rota para listar todas as ongs: /ongs
- [x] 1.12. Controllers [ MVC ]: index (listar) e create (cadastrar) para as ongs
- [x] 1.13.1. Cadastrar incidentes
- [x] 1.13.2. Requisição: IncidentController.js
- [x] 1.13.3. Routes: /incidents
- [x] 1.13.4. Criando incidente a partir da rota
- [x] 1.13.5. Listar incidentes
- [x] 1.14. Routes para deletar incidente
- [x] 1.15. ProfileController: Listar casos específicos de uma ONG
- [x] 1.16. Routes de login da Ong: SessionController.js 
- [x] 1.17. Logout é apenas no front-end 
- [x] 1.18.1. Paginação de todos os incidentes
- [x] 1.18.2. Exibição do número total de incidentes cadastrados 
- [x] 1.19. Join: relacionar dados de duas tabelas
- [x] 1.20. Cors: npm install cors
- [x] 1.21. Subindo aplicação `Be The Hero` para o github 

#### Front End

- [ ] 2. Front End - ReactJS 
- [x] 2.1.1. De um repositório raiz (omnistack-11), `npx create-react-app frontend`
- [x] 2.1.2. `npm start` : `http://localhost:3000/`
- [x] 2.1.3. limpar a estrutura de pastas 
- [x] 2.2. Conceitos do ReactJS
- [x] 2.2.1. **componente**
- [x] 2.2.2. **jsx**
- [x] 2.2.3. **propriedades**
- [x] 2.2.4. **estado**
- [x] 2.2.5. **imutabilidade**
- [ ] 2.3. Página de login
- [x] 2.3.1. Image and Logo
- [x] 2.3.2. index.js e styles.css
- [x] 2.3.3. Css Global - global.css
- [x] 2.3.4. Google Fonts
- [x] 2.3.5. Estrutura do design da tela
- [x] 2.3.6. Feather icons
- [x] 2.3.7. npm install react-icons
- [x] 2.3.8. Estilização page logon 
- [ ] 2.4. configuração de rotas
- [x] 2.4.1.1. `npm install react-router-dom` 
- [x] 2.4.1.2. routes.js
- [x] 2.4.1.3. configuração de rotas
- [x] 2.4.2.1. Rota Logon 
- [x] 2.4.3.1. Rota Register 
- [ ] 2.5. cadastro de ongs
- [ ] 2.6. listagem de casos
- [ ] 2.7. cadastro de novo caso
- [ ] 2.8. conectando aplicação à api
- [ ] 2.9. enviar projeto ao github


#### Mobile