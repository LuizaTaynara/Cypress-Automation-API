
let bookingId = '';
let headers = {};

describe('Test Suit - Booking API Testing', () => {

    beforeEach(() => {
    cy.api({
      method: 'POST',
      url:'/auth',
      headers: { 'Content-type': 'application/json' },
      body: {
        username: "admin",
        password: "password123"
      }
    }).as('token')
  })
    // Procurar informações sobre cookie //

  it('1 - GET all bookings IDs', () => {
    cy.api({
      method: 'GET',
      url: '/booking',
      headers: {'Content-Type': 'application/json'},
      failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body).to.have.lengthOf.at.least(1);
        expect(response.body[0]).to.have.property('bookingid');//.and.to.be.a('number');

    });
  });

  it('2 - GET booking ID by first name', () => {
    cy.api({
      method: 'GET',
      url: '/booking',
      qs: { firstname: 'test' },
      headers: {'Content-Type': 'application/json'}
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        // expect(response.body[0]).to.have.property('bookingid');

        //finalizar
    });
 });

  it('3 - Get booking id by checkin date', () => {
    cy.api({
      method: 'GET',
      url:'/booking',
      qs: { 'checkin' : '2014-05-21'},
      headers: { 'Content-Type': 'application/json'}
    }).then((response) => {	
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[0]).to.have.property('bookingid');
    });
  });

    it('4 - GET booking by ID', () => {
      cy.api({
        method: 'GET',
        url: '/booking/3',
        headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
            expect(response.body).to.have.property('firstname').and.to.be.a('string');
            expect(response.body).to.have.property('lastname').and.to.be.a('string');
            expect(response.body).to.have.property('totalprice').and.to.be.a('number');
            expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
            expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
            expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
            expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');
        });
    });

    it.only('5 - Creating a new booking with sucess', () => {
      cy.api({
        method: 'POST',
        url: '/booking',
        headers: {'Content-Type': 'application/json'},
        body: {
          firstname: 'Luiza',
          lastname: 'Santos',
          totalprice: 100,
          depositpaid: true,
          bookingdates: {
            checkin: '2023-01-01',
            checkout: '2023-01-02'
          },
          additionalneeds: 'Breakfast'
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('bookingid').and.to.be.a('number');
        //mínimo necessário.
        expect(response.body.booking).to.have.property('firstname', 'Luiza').and.to.be.a('string');
        expect(response.body.booking).to.have.property('lastname', 'Santos').and.to.be.a('string');
        expect(response.body.booking).to.have.property('totalprice', 100).and.to.be.a('number');
        expect(response.body.booking).to.have.property('depositpaid', true).and.to.be.a('boolean');
        expect(response.body.booking).to.have.property('bookingdates').and.to.be.an('object');
        expect(response.body.booking.bookingdates).to.have.property('checkin', '2023-01-01').and.to.be.a('string');
        expect(response.body.booking.bookingdates).to.have.property('checkout', '2023-01-02').and.to.be.a('string');
        expect(response.body.booking).to.have.property('additionalneeds', 'Breakfast').and.to.be.a('string');

        cy.wrap(response).as('bookingCreated', {type: 'static'});
        const booginkID = 0;
        cy.get('@bookingCreated').then(()=>{

      })

      }).then(function() {
        cy.api({
            method: 'GET',
            url: '/booking/' + this.bookingCreated.body.bookingid,
            headers: {'Accept': 'application/json'}
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('firstname', 'Luiza').and.to.be.a('string');
            expect(response.body).to.have.property('lastname', 'Santos').and.to.be.a('string');
            expect(response.body).to.have.property('totalprice', 100).and.to.be.a('number');
            expect(response.body).to.have.property('depositpaid', true).and.to.be.a('boolean');
            expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
            expect(response.body.bookingdates).to.have.property('checkin', '2023-01-01').and.to.be.a('string');
            expect(response.body.bookingdates).to.have.property('checkout', '2023-01-02').and.to.be.a('string');
            expect(response.body).to.have.property('additionalneeds').and.to.be.a('string');
        });
      });
    });

    it('6 - Creating a new booking with success - alternative 1', () => {
  
    cy.api({
      method: 'POST',
      url:'/booking',
      headers: { 'Content-Type': 'application/json'},
      body: {
        firstname: "Luiza",
        lastname: "Santos",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2018-01-01",
            checkout: "2018-01-02"
        },
        additionalneeds: "Breakfast"
      }
    }).then((response) => {	
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('bookingid').and.to.be.a('number');
      expect(response.body).to.have.property('booking').and.to.be.an('object');
      expect(response.body.booking).to.have.property('firstname', 'Luiza').and.to.be.a('string');
      expect(response.body.booking).to.have.property('lastname', 'Santos').and.to.be.a('string');
      expect(response.body.booking).to.have.property('totalprice').and.to.be.a('number');
      expect(response.body.booking).to.have.property('depositpaid').and.to.be.a('boolean');
      expect(response.body.booking).to.have.property('bookingdates').and.to.be.an('object');
      expect(response.body.booking.bookingdates).to.have.property('checkin').and.to.be.a('string');
      expect(response.body.booking.bookingdates).to.have.property('checkout').and.to.be.a('string');

      cy.wrap(response.body.bookingid).as('bookingid', {type: 'static'});
    });

      cy.get('@bookingid').then(bookingId => {
        cy.request({
          method: 'GET',
          url:'/booking/'+ bookingId ,
          headers: { 'Content-Type': 'application/json'}
        }).then((response) => {	
          expect(response.status).to.eq(200);
          expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('firstname', 'Luiza').and.to.be.a('string');
          expect(response.body).to.have.property('lastname', 'Santos').and.to.be.a('string');
          expect(response.body).to.have.property('totalprice').and.to.be.a('number');
          expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
          expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
          expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
          expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');
        });
      })
      
    
  });

  it('6 - Creating a new booking with success - alternative 2', () => {
  
    cy.api({
      method: 'POST',
      url:'/booking',
      headers: {'Content-Type': 'application/json'},
      body: {
        firstname: "Luiza",
        lastname: "Santos",
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
            checkin: "2019-01-01",
            checkout: "2019-01-02"
        },
        additionalneeds: "Breakfast"
      }
    }).then(() => {
      cy.request({
        method: 'POST',
        url:'/booking',
        headers: {'Content-Type': 'application/json'},
        body: {
          firstname: "Luiza",
          lastname: "Santos",
          totalprice: 200,
          depositpaid: true,
          bookingdates: {
              checkin: "2019-01-01",
              checkout: "2019-01-02"
          },
          additionalneeds: "Breakfast"
        }
      }).then((response) => {	
        expect(response.status).to.eq(200);
        expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('bookingid').and.to.be.a('number');
        expect(response.body).to.have.property('booking').and.to.be.an('object');
        expect(response.body.booking).to.have.property('firstname', 'Luiza').and.to.be.a('string');
        expect(response.body.booking).to.have.property('lastname', 'Santos').and.to.be.a('string');
        expect(response.body.booking).to.have.property('totalprice').and.to.be.a('number');
        expect(response.body.booking).to.have.property('depositpaid').and.to.be.a('boolean');
        expect(response.body.booking).to.have.property('bookingdates').and.to.be.an('object');
        expect(response.body.booking.bookingdates).to.have.property('checkin').and.to.be.a('string');
        expect(response.body.booking.bookingdates).to.have.property('checkout').and.to.be.a('string');
  
        bookingId = response.body.bookingid;
      
      }).then(()=> {
        cy.request({
          method: 'GET',
          url:'/booking/'+ bookingId ,
          headers: { 'Content-Type': 'application/json'}
        }).then((response) => {	
          expect(response.status).to.eq(200);
          expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('firstname', 'Luiza').and.to.be.a('string');
          expect(response.body).to.have.property('lastname', 'Santos').and.to.be.a('string');
          expect(response.body).to.have.property('totalprice').and.to.be.a('number');
          expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
          expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
          expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
          expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');
        });
      });
      
    })
       
      
  });

  it('7 - Update booking by id without authorization', () => {
    cy.api({
      method: 'POST',
      url:'/booking',
      headers: { 'Content-Type': 'application/json'},
      body: {
        firstname: "Luiza",
        lastname: "Santos",
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
            checkin: "2019-01-01",
            checkout: "2019-01-02"
        },
        additionalneeds: "Orange Juice"
      }
    }).then((response) => {
      cy.request({
        method: 'PUT',
        url:'/booking/'+ response.body.bookingid,
        headers: { 'Accept': 'application/json', 'Content-type': 'application/json'},
        failOnStatusCode: false
      }).then((response) => {	
        expect(response.status).to.eq(403);
        expect(response.headers).to.have.property('content-type', 'text/plain; charset=utf-8')
        expect(response.body).to.be.string
      });
    });
  });

  it.only('8 - Update booking by id with authorization header', () => {
    cy.get('@token').then((token) => {
      cy.request({
        method: 'POST',
        url:'/booking',
        headers: { 'Content-Type': 'application/json'},
        body: {
          firstname: "Luiza",
          lastname: "Santos",
          totalprice: 200,
          depositpaid: false,
          bookingdates: {
              checkin: "2019-01-01",
              checkout: "2019-01-02"
          },
          additionalneeds: "Orange Juice"
        }
      }).then((response) => {
        cy.request({
          method: 'PUT',
          url:'/booking/'+ response.body.bookingid,
          auth:{ user: 'admin', password: 'password123'},
          headers: { 
          'Accept': 'application/json', 
          'Content-type': 'application/json',  
        },
        body: {
          firstname: "Luiza",
          lastname: "Santos Modificado",
          totalprice: 200,
          depositpaid: false,
          bookingdates: {
              checkin: "2018-01-01",
              checkout: "2019-01-01"
          },
          additionalneeds: "Orange Juice"
        },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
          expect(response.body).to.be.an('object');
          expect(response.body).to.have.property('firstname', 'Luiza').and.to.be.a('string');
          expect(response.body).to.have.property('lastname', 'Santos Modificado').and.to.be.a('string');
          expect(response.body).to.have.property('totalprice').and.to.be.a('number');
          expect(response.body).to.have.property('depositpaid').and.to.be.a('boolean');
          expect(response.body).to.have.property('bookingdates').and.to.be.an('object');
          expect(response.body.bookingdates).to.have.property('checkin').and.to.be.a('string');
          expect(response.body.bookingdates).to.have.property('checkout').and.to.be.a('string');
        });
      });
    });
  });
});

