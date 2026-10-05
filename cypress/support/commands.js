// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('authToken', (user, password) => {
    cy.api({
        method: 'POST',
        url:'/auth',
        headers: { 'Content-type': 'application/json' },
        body: {
          "username": user,
          "password": password
        },
        failOnStatusCode: false
      }).then(response => {
        return response.body.token;
      });
 });

 Cypress.Commands.add('getRequest', (endpoint, headers = {}, body = {}, qs = {}) => {
    cy.api({
        method: 'GET',
        url: endpoint,
        headers: headers,
        qs: qs,
        body: body,
        failOnStatusCode: false
      }).then(response => {
        return response
      });
 });

 Cypress.Commands.add('postRequest', (endpoint, headers = {} ,body = {} , qs = {}) => {
    cy.api({
        method: 'POST',
        url: endpoint,
        headers: headers,
        qs: qs,
        body: body,
        failOnStatusCode: false
      }).then(response => {
        return response
      });
 });

 Cypress.Commands.add('putRequest', (endpoint, headers = {}, body = {}, qs = {}) => {
  cy.api({
      method: 'PUT',
      url: endpoint,
      headers: headers,
      qs: qs,
      body: body,
      failOnStatusCode: false
    }).then(response => {
      return response
    });
});