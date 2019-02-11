# Desafio Webedia

Simples API REST para um blog. Este blog possui artigos, e cada artigo poderá ter vários autores, comentários e likes.

## Getting Started

Essas intruções servirão para copiar o projeto e rodá-lo localmente para desenvolvimento. Caso queira ter uma experiência online da API sem precisar copiar o projeto a url base é <https://todo-eel.mybluemix.net/api>. Caso queira usá-la, leia a parte de [Rotas](##routes)

### Prerequisites

Quais coisas você precisa e como instalá-las:

- [Node.js](https://nodejs.org/en/)

  - Baixe a versão recomendada para os usuários comuns e siga as intruções corretamente.

- [Yarn](https://yarnpkg.com/pt-BR/)
- [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [AWS Account](https://console.aws.amazon.com/)

### Installing

#### 1. Copiando o projeto

No terminal navegue até o diretório que deseja e execute:

```bash
  git clone https://github.com/arthurgrigoletto/webmedia.git
```

#### 2. Instalando dependências

No terminal navegue até o diretório do projeto e execute:

```bash
  cd .../webedia

  npm install
  ou
  yarn
```

Esse comando instalará todos os pacotes listados nos packages.json correspondentes: [package.json](https://github.com/arthurgrigoletto/webmedia/blob/master/package.json)

#### 3. Criar arquivo .env

O arquivo _.env_ é de extrema importância, porque é dele que toda a aplicação busca as credenciais, ele fica localizado no diretório root. Um modelo para todas as Chaves está logo abaixo:

```bash
  APP_URL=http://localhost:3000 - URL para salvar as imagens em cache
  STORAGE_TYPE=local - Usado para mudar onde ira armazenar as imagens (Options: local / s3)

  MONGO_URI=mongodb://<dbuser>:<dbpassword>@ds123635.mlab.com:23635/<dbname>
  SECRET_KEY=test-webmedia - Usado para passport

  AWS_ACCESS_KEY=
  AWS_SECRET_ACCESS_KEY=
  AWS_DEFAULT_REGION=
```

Para subir imagens no AWS configure-o com base no arquivo [AWS](https://github.com/arthurgrigoletto/webmedia/blob/master/docs/aws.md)

##### \* _O arquivo .env não subirá para o gitHub_

#### 3. Rodando localmente o servidor

Há alguns scripts disponibilizados para facilitar na hora do desenvolvimento.

- Esse comando rodará o servidor sem restartar automaticamente, a cada mudança será necessário parar o servidor no terminal e startar de novo.

  ```bash
    npm start
    ou
    yarn start
  ```

- Esse comando rodará o servidor ouvindo todas as mudanças que fizer no código, ou seja, ele sempre irá restartar o servidor a cada mudança

  ```bash
    npm run server
    ou
    yarn server
  ```

- Esse comando rodará tanto o servidor quando nossa aplicação web para retreino das skills do Assistant

  ```bash
    npm run dev
    ou
    yarn dev
  ```

## Running the tests

Você pode rodar os testes através do comandos:

- NPM

  ```bash
    npm run test
    ou
    npm run test:tdd
    ou
    npm run test:coverage
  ```

- YARN

  ```bash
    yarn test
    ou
    yarn test:tdd
    ou
    yarn test:coverage
  ```

## Routes

| Endpoint                              | Description                                                                            |
| ------------------------------------- | -------------------------------------------------------------------------------------- |
| GET `/api/auth/current`               | Return the user logged                                                                 |
| POST `/api/auth/login`                | Login User and Return JWT Token. **Required**: name, password                          |
| POST `/api/auth/register`             | Register an user. **Required**: name, email, password, password2, file                 |
| GET `/api/articles`                   | Get all Articles. **Pagination Options**: `?page=&limit=`                              |
| GET `/api/articles?permalink=`        | Get Article by permalink                                                               |
| GET `/api/articles/:id`               | Get an Article                                                                         |
| POST `/api/articles`                  | Create an Article. **Required**: title, subtitle, content, permalink, authorsIds, file |
| PUT `/api/articles/:id`               | Update an Article                                                                      |
| DELETE `/api/articles/:id`            | Delete an Article                                                                      |
| GET `/api/authors/`                   | Get all Authors **Pagination Options**: `?page=&limit=`                                |
| GET `/api/authors/:id`                | Get an Author                                                                          |
| POST `/api/authors/`                  | Create an Author **Required**: name                                                    |
| PUT `/api/authors/:id`                | Update an Author                                                                       |
| DELETE `/api/authors/:id`             | Delete an Author                                                                       |
| GET `/api/:id/comments`               | GET Article's Comments                                                                 |
| POST `/api/:id/comments`              | Create Article's Comment  **Required**: text                                           |
| PUT `/api/:id/comments/:commentId`    | Update Article's Comment                                                               |
| DELETE `/api/:id/comments/:commentId` | Delete Article's Comment                                                               |
| GET `/api/:id/like`                   | Get Likes from Article                                                                 |
| POST `/api/:id/like`                  | Add Like to Article                                                                    |
| POST `/api/:id/unlike`                | Remove Like from Article                                                               |

## Built With

- [Node.js](https://nodejs.org/en/) - Usado como runtime
- [Yarn](https://yarnpkg.com/pt-BR/) - Usado como gerenciador de pacotes, como o npm(instalado por padrão pelo node.js)
- [Express](https://expressjs.com/pt-br/) - Usado como web Framework
- [Passport](http://www.passportjs.org/) - Usado para autentificação de usuários
- [Passport-jwt](https://github.com/themikenicholson/passport-jwt) - Usado para autentificação de usuários através de JWT Token
- [ESLint](https://eslint.org/) - Usado para controle de escrita de código
- [Mocha](https://mochajs.org/) - Usado para testes
- [Chai](https://www.chaijs.com/) - Usado para testes
- [MongoDB](https://www.mongodb.com/)- Usado como banco de dados
- [AWS S3](https://aws.amazon.com/pt/s3/) - Usado como Object Storage para imagens
- [Mogan](https://github.com/expressjs/morgan) - Usado como Logger das HTTP Requests
- [Multer](https://github.com/expressjs/multer) - Usado para lidar com multipart/form-data
