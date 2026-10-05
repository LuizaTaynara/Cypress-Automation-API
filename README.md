# 🧪 Cypress API Testing — Restful Booker

## 📌 Sobre o projeto

Projeto de testes de API com Cypress, utilizando a API Restful Booker como ambiente de prática.

O projeto foi desenvolvido para praticar conceitos de Quality Assurance e testes de API, validando diferentes endpoints, métodos HTTP, autenticação, autorização, parâmetros de consulta, headers, status codes e estrutura das respostas.

A aplicação utilizada para os testes é:

[Restful Booker API](https://restful-booker.herokuapp.com/?utm_source=chatgpt.com)

---

## 🎯 Objetivos

* Praticar testes automatizados de API com Cypress.
* Trabalhar com métodos `GET`, `POST` e `PUT`.
* Validar status codes e headers das respostas.
* Validar propriedades e tipos de dados retornados pela API.
* Trabalhar com autenticação e autorização.
* Utilizar query parameters.
* Trabalhar com `bookingid` e tokens gerados durante os testes.
* Utilizar fixtures e comandos personalizados.

---

## 🧪 Testes realizados

### Authentication API

Testes realizados no endpoint `/auth`:

* Autenticação com credenciais válidas.
* Validação do status code `200`.
* Validação da presença e do conteúdo do token.
* Autenticação com credenciais inválidas.
* Validação do status code `403`.
* Validação da mensagem `Bad credentials`.

Também foram utilizadas diferentes abordagens para realizar a requisição de autenticação, incluindo `cy.api()` e um comando personalizado.

### Booking API

Testes realizados no endpoint `/booking`.

#### GET

* Obter os IDs das reservas.
* Buscar reservas utilizando `firstname`.
* Buscar reservas utilizando `checkin`.
* Obter uma reserva pelo `bookingid`.

#### POST

* Criar uma nova reserva.
* Validar o `bookingid` retornado.
* Validar os dados da reserva criada.
* Utilizar o `bookingid` retornado para consultar a reserva criada.

#### PUT

* Tentar atualizar uma reserva sem autorização.
* Validar o retorno `403` para uma requisição sem autorização.
* Atualizar uma reserva com autorização.
* Validar os dados da reserva após a atualização.

---

## 🔍 Validações

Durante os testes são realizadas validações de:

* Status code
* Response headers
* `Content-Type`
* Response body
* Propriedades da resposta
* Tipos de dados
* Valores retornados pela API
* Token de autenticação
* `bookingid`

Exemplo:

```javascript
expect(response.status).to.eq(200);
expect(response.body).to.be.an('object');
expect(response.body).to.have.property('bookingid').and.to.be.a('number');
```

---

## 🛠️ Tecnologias e ferramentas

* **Cypress**
* **JavaScript**
* **Node.js**
* **REST API**
* **cypress-plugin-api**
* **Git / GitHub**

---

## 📂 Estrutura do projeto

```text
cypress/
├── e2e/
│   └── APITests/
│       ├── auth.cy.js
|       ├── booking.cy.js
│       └── bookingCustomCommand.cy.js
│
├── fixtures/
│   └── booking/
│       ├── bookingPost.json
│       └── bookingPut.json
│
├── screenshots/
│   ├── 
│   └── 
│
├── support/
│   ├── commands.js
│   └── e2e.js
│
└── node_modules

.eslintrc.json
.gitignore
cypress.config.js
package-lock.json
package.json
README.md
```

As fixtures são utilizadas para armazenar dados utilizados nos testes, mantendo esses dados separados da lógica dos testes.

---

## 🔐 Autenticação

O endpoint `/auth` é utilizado para obter o token necessário nos testes que exigem autorização.

Exemplo:

```javascript
cy.api({
  method: 'POST',
  url: '/auth',
  headers: {
    'Content-type': 'application/json'
  },
  body: {
    username: 'admin',
    password: 'password123'
  }
});
```


---

## 🚀 Execução

Instalar as dependências:

```
npm install
```

Abrir o Cypress:

```
npx cypress open
```

Executar os testes:

```
npx cypress run
```

---

## 📚 Conceitos praticados

* API Testing
* REST API
* Métodos HTTP
* Request e Response
* Headers
* Query Parameters
* Authentication
* Authorization
* Status Codes
* JSON
* Response Validation
* Fixtures
* Custom Commands
* Test Automation

---

#### Projeto desenvolvido como parte da minha prática em **QA e API Testing**, utilizando **Cypress** para automatizar testes da API Restful Booker.

## 👩🏻‍💻 Autora

- **Luiza Santos**
- **Projeto:** Practical Manual Testing — SauceDemo
- **Ano:** 2026

## Vamos conectar?
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/luizataynara/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/LuizaTaynara)
