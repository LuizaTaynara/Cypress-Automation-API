describe('Test Suit - Auth API Testing', () => {
  it('1 - POST credentials to auth endpoint with sucess 1ª version', () => {
    cy.api({
      method: 'POST',
      url: '/auth',
      body: {
        username: 'admin',
        password: 'password123'
      },
      headers: {'Content-Type': 'application/json'},
      failOnStatusCode: false
    }).then((response) => {
      //debugger;
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('token').and.to.be.a('string')
      expect(response.body.token).to.not.be.empty;
      //depende do que a equipe queira validar.
     });
  });
  
  it('2 - POST credentials to auth endpoint with sucess 2ª version', () => {

    let body = {
      username: 'admin',
      password: 'password123'
    }
    cy.postRequest(Cypress.expose('auth_url'), {'Content-Type': 'application/json'}, body)
    .then((response) => {
      expect(response.status).to.eq(200);
      debugger;
      //cy.pause();
      expect(response.body).to.have.property('token').and.to.be.a('string');
      expect(response.body.token).to.not.be.empty;
    })//.debug();
  });
  
  it(' 3 - POST credentials to auth endpoint with invalid credentials', () => {

        let body = {
            "username": null,
            "password": "password123"
        };

        cy.postRequest("/auth", {"Content-type": "application/json"},  body ).then((response) => {
            expect(response.status).to.eq(403);
            // esse fica falhando para chamar a atenção para o 200 ok
            //expect(response.body).to.have.property('token').and.to.be.a('string');
            expect(response.body).to.have.property('reason', 'Bad credentials');
            expect(response.body).not.to.be.empty;
        });
    });
});