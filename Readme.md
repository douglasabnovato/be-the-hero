## Be The Hero

![Be The Hero](/frontend/images/be-the-hero.jpg)

### Projeto

Um projeto para cadastrar heróis que poderão contribuir acessando o perfil.

#### Tecnologias e Ferramentas

- Front-end: Reactjs, HTML, CSS, Javascript, Google Fonts, Link, Axios
- Back-end: Nodejs, Express, SQLite, Insomnia. Knex, crypto, Join, Cors,  Migration, Routes, Nodemon

---

#### Back End 

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
- [x] 1.6.2.7.1. paginação - `http://localhost:3333/incidents?page=3`
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
- [x] 1.20. Cors: `npm install cors`
- [x] 1.21. Subindo aplicação `Be The Hero` para o github 

#### Front End 

- [x] 2. Front End - ReactJS 
- [x] 2.1.1. De um repositório raiz (omnistack-11), `npx create-react-app frontend`
- [x] 2.1.2. `npm start` : `http://localhost:3000/`
- [x] 2.1.3. limpar a estrutura de pastas 
- [x] 2.2. Conceitos do ReactJS
- [x] 2.2.1. **componente**
- [x] 2.2.2. **jsx**
- [x] 2.2.3. **propriedades**
- [x] 2.2.4. **estado**
- [x] 2.2.5. **imutabilidade**
- [x] 2.3. Page Logon
- [x] 2.3.1. Image and Logo
- [x] 2.3.2. index.js e styles.css
- [x] 2.3.3. Css Global - global.css
- [x] 2.3.4. Google Fonts
- [x] 2.3.5. Estrutura do design da tela
- [x] 2.3.6. Feather icons
- [x] 2.3.7. `npm install react-icons`
- [x] 2.3.8. Estilização page logon 
- [x] 2.4. configuração de rotas
- [x] 2.4.1.1. `npm install react-router-dom` 
- [x] 2.4.1.2. routes.js
- [x] 2.4.1.3. configuração de rotas
- [x] 2.4.2.1. Rota Logon 
- [x] 2.4.3.1. Rota Register 
- [x] 2.4.4. Component Link: não recarregar a página inteira, apenas em componentes
- [x] 2.5. Page Register: cadastro de ongs
- [x] 2.5.1. Estrutura HTML
- [x] 2.5.2. CSS
- [x] 2.5.2.1. section
- [x] 2.5.2.2. form  
- [x] 2.6. Page Profile: listagem de casos: profile.js, styles.css
- [x] 2.6.1. HTML e CSS header
- [x] 2.6.2. HTML e CSS list
- [x] 2.7. NewIncident: cadastro de novo caso  
- [x] 2.8. Conectar a aplicação frontend em Reactjs com o backend em Nodejs
- [x] 2.8.1. frontend | `npm start`
- [x] 2.8.2. backend | `npm start`
- [x] 2.8.3. instalar cliente http - **Axios** | `npm install axios`
- [x] 2.8.4. configuração do frontend com o backend
- [x] 2.8.4.1. armazenar cada valor dos inputs do frontend em um state 
- [x] 2.8.4.2. cadastrar informações no bd
- [x] 2.8.4.3. enviar o usuário de volta para a página de login
- [x] 2.9. Fazer Login na aplicação
- [x] 2.9.1. criar session com usuário
- [x] 2.9.2. localStorage para disponibilizar session a toda a aplicação
- [x] 2.9.3. exibir os dados dinamicamente
- [x] 2.9.4. formatar os dados de preços
- [x] 2.10. Deletar um incidente
- [x] 2.10.1. Deletar um incidente do backend
- [x] 2.10.2. Deletar um incidente do frontend
- [x] 2.11. Logout 
- [x] 2.12. Cadastrar Novo caso
- [x] 2.12.1. Cadastrar novo caso
- [x] 2.12.2. Retornar a rota
- [x] 2.13. Enviar projeto ao Github
- [x] 2.14. warning: não reconheceu `react-scripts`. Executado `npm install react-scripts --save`
- [x] 2.15. warning: cadastrar ong. Mensagem `erro no cadastro. tente novamente.` - UF deve ser somente de dois dígitos

#### Mobile 

- [x] 3. Mobile - React Native
- [x] 3.1.1. Instalando Expo de forma Global (-g): `npm install -g expo-cli`
- [x] 3.1.2. Executar o Expo: `expo -h`
- [x] 3.2. Criando projeto React Native
- [x] 3.2.1. Criar nosso projeto mobile: `expo init mobile`
- [x] 3.2.2. template: `blank` 
- [x] 3.2.3. cd mobile ; rodar o projeto com `expo start`
- [x] 3.2.4. `http://localhost:19002/`
- [x] 3.3. Executando o projeto 
- [x] 3.3.1. No celular
- [x] 3.3.2. [Emuladores](https://www.facebook.com/rocketseat/videos/2988252154733623): Usamos o emulador Android Studio no Windows
- [x] 3.3.2.1. Expo cli: `yarn global add expo-cli` 
- [x] 3.3.2.2.1. Rodar `expo start` na aplicação
- [x] 3.3.2.2.2. Abrir o emulador do studio android
- [x] 3.3.2.2.3. Rodar emulador no Expo/19002
- [x] 3.3.3. Expo Snack
- [x] 3.3.4. Executar o projeto depois da criação
- [x] 3.3.4.1. Abrir studio android, rodar a aplicação, rodar o emulador no expo 
- [x] 3.4. Diferenças para o ReactJS
- [x] 3.4.1. Elementos HTML
- [x] 3.4.2. Semântica
- [x] 3.4.3. Estilização
- [x] 3.4.3.1. Flexbox
- [x] 3.4.3.2. Propriedades
- [x] 3.4.3.3. Herança de estilos
- [x] 3.4.3.4. Estilização própria
- [x] 3.5. Estrutura de pastas
- [x] 3.6. Ícone e Splash screen
- [x] 3.7. configurando navegação
- [x] 3.7.1. criação de pastas
- [x] 3.7.2. navegação no expo: `npm install @react-navigation/native`
- [x] 3.7.3. pacotes: `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`
- [x] 3.7.4. Tipos de navegação
- [x] 3.7.4.1. Stack Navigation: `npm install @react-navigation/stack`
- [x] 3.7.5. Paginação: Incidents e Detail 
- [x] 3.7.6. Arquivo `routes.js`
- [x] 3.7.7. Warning: `npm install react-navigation-stack @react-native-community/masked-view react-native-safe-area-context`
- [x] 3.8. página de casos
- [x] 3.8.1. `expo install expo-constants`
- [x] 3.8.2. incidents styles
- [x] 3.8.3. listagem em tela dos casos, estaticamente, manualmente
- [x] 3.8.4. estilizando os casos  
- [x] 3.8.5. listagem em tela dos casos com scroll com FlatList
- [x] 3.8.6. retirar a barra vertical do scroll com showVerticalScrollIndicator
- [x] 3.8.7. Warning: `Attempted import error: 'createStackNavigation' is not exported from '@react-navigation/stack'.`
- [x] 3.8.8. refatorar detalhes do código
- [x] 3.8.9. link para "Ver mais detalhes" do caso com useNavigation
- [x] 3.8.10. useNavigation realiza navegação com efeito visual deslizando
- [x] 3.9. detalhe do caso
- [x] 3.9.1. construir estrutura da tela
- [x] 3.9.1.1. header
- [x] 3.9.1.2. dados do incidente
- [x] 3.9.2. estilizar tela
- [x] 3.9.2.1. link de voltar para página anterior
- [x] 3.10. abrindo whatsapp e e-mail
- [x] 3.10.1. essas duas funcionalidades irão funcionar somente no smartphone
- [x] 3.10.2. function sendMail
- [x] 3.10.2.1. pacote do expo: `expo install expo-mail-composer`
- [x] 3.10.3. function sendWhatsapp
- [x] 3.10.3.1. Deep linking para acessar o app que desejo
- [x] 3.11. conexão com api
- [x] 3.11.1. instalar o axios: `npm install axios`, o cliente http
- [x] 3.11.2. criar arquivo `src/services/api.js`
- [x] 3.11.3. atenção: usar ip que está sendo exibido no expo
- [x] 3.11.3.1. ou digitar no terminal `ipconfig`, conferir em `endereço ipv4`
- [x] 3.11.4. baseURL `http://192.168.25.52:3333`, sendo que 3333 é a porta que usamos no backend
- [x] 3.11.5. carregar lista de incidentes buscando da api 
- [x] 3.11.6. mostrar o preço como tipo valor de moeda
- [x] 3.11.6.1. pacote `npm install intl` 
- [x] 3.11.7. em detalhes, mostrar a informações correspondentes
- [x] 3.11.8. total de casos dinamicamente
- [x] 3.11.9. as informações do incidente no envio de whatsapp e e-mail
- [x] 3.12. paginação/scroll infinita
- [x] 3.13. enviar projeto para o Github pelo VSCode

#### Funcionalidades Avançadas 

- [x] 4. Funcionalidades Avançadas 
- [x] 4.1. Adicionar validação de dados
- [x] 4.1.2. certificar que toda informação entre no banco de dados 100% correta
- [x] 4.1.3.1. no backend, `npm install celebrate`
- [x] 4.1.3.2. a biblioteca celebrate para fazer validações
- [x] 4.1.3.3. celebrate integra o joi com o express que estamos usando no nodejs
- [x] 4.1.4. ongController na rota de create
- [x] 4.1.4.1. configurar a validação no arquivo rotas
- [x] 4.1.4.2. executar o servidor `npm start`
- [x] 4.1.4.3. tratar o erro da validação do create - BODY
- [x] 4.1.4.4. tratar o erro da validação do edit - HEADERS
- [x] 4.1.4.5. tratar o erro da validação do delete - PARAMS
- [x] 4.1.4.6. tratar o erro da validação da paginação - QUERY
- [x] 4.2. Adicionar testes
- [x] 4.2.1. Porque fazer testes ?
- [x] 4.2.1.1. garantir pleno funcionamento de toda aplicação a cada feature implementada
- [x] 4.2.2. TDD - Test-Driven Development (desenvolvimento dirigido a testes)
- [x] 4.2.2.1. desenvolve o código e depois implementa os testes
- [x] 4.2.2.2. criar os testes e depois desenvolve o código
- [x] 4.2.3. configurando Jest
- [x] 4.2.3.1. `npm install jest`
- [x] 4.2.3.2. backend: `npx jest --init`
- [x] 4.2.3.2.1. configurações
- [x] 4.2.4. Tipos de testes
- [x] 4.2.4.1. unit: `generateUniqueId.spec.js`
- [x] 4.2.4.1.1. executar os testes `npm test`
- [x] 4.2.4.1.2. module.exports no lugar de export default 
- [x] 4.2.4.2. integration: 
- [x] 4.2.4.2.1. configurando banco de testes 
- [x] 4.2.4.2.2. db sqlite
- [x] 4.2.4.2.3. npm install cross-env
- [x] 4.2.4.2.4. variável ambiente do nodejs
- [x] 4.2.4.2.5. ong.spec.js
- [x] 4.2.4.2.6. testar nossa aplicação como um todo
- [x] 4.2.4.2.7. instalando supertest
- [x] 4.2.4.2.8. requisição para testes
- [x] 4.2.4.2.9. npm install supertest
- [x] 4.2.4.2.10. configurar em ong.spec.js 
- [x] 4.2.4.2.11. executar as migrations dentro do bd de teste
- [x] 4.2.4.2.12. testando rota de criação de ong 
- [x] 4.3. Deploy
- [x] 4.3.1. NodeJS: Heroku - aplicações de modelo
- [x] 4.3.2. NodeJS: DigitalOcean - aplicação comercial
- [x] 4.3.3. ReactJS: netlify - aplicação de modelo
- [x] 4.3.4. React Native: criar o aplicativo e publicar nas lojas
- [x] 4.4. Estudos daqui para frente ( Rocketseat - Youtube )
- [x] 4.4.1. padrões de código: eslint, prettier
- [x] 4.4.2. autenticação jwt
- [x] 4.4.3. ferramenta de estilização - styled components

#### Considerações Finais

- [x] 4.5. Dicas para aproveitar melhor
- [x] 4.5.1. github - subir todos os projetos de estudo ou projetos pessoais
- [x] 4.5.2. linkedin - o que desenvolver, o que aprendeu, gravar vídeo, gravar gif, quais tecnologias
- [x] 4.6. Aprender a fazer perguntas sobre o desenvolvimento da aplicação
- [x] 4.7. Ter desafios para serem marcações do nível do domínio do conhecimento
- [x] 4.8. Prática e Comunidade devem andar juntos para acelerar o aprendizado 
- [x] 4.9. Ter um cronograma de estudos com recompensas a cada nível superado
- [x] 4.10.1. Terminado o frontend mobile com React Native 
- [x] 4.10.2. Terminado o frontend web com ReactJS
- [x] 4.10.3. Terminado o backend com NodeJS e SQLite
- [x] 4.10.4. Implementado algumas funcionalidades avançadas de testes com Jest.

Por [Douglas A B Novato - @douglasabnovato](https://linktr.ee/douglasabnovato) <br/>
:. De [Diego Fernandes - Rocketseat - Semana Omnistack 11.0](https://rocketseat.com.br/)
