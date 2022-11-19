"use strict";
describe('Register and log in', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/register');
    });
});
it('Test Register', () => {
    cy.get('#register-email').type('test@email.com').should('have.value', 'test@email.com');
    cy.get('#register-firstName')
        .type('testName').should('have.value', 'testName');
    cy.get('#register-lastName')
        .type('testLastName').should('have value', 'testLastName');
    cy.get('#register-password')
        .type('test1234').should('have.value', 'test1234');
    cy.get('#register-button').click();
    cy.location('pathname').should('eq', '/login');
});
//use this jackie
// it('.submit() - submit a form', () => {
//     // https://on.cypress.io/submit
//     cy.get('.action-form')
//       .find('[type="text"]').type('HALFOFF')
//     cy.get('.action-form').submit()
//       .next().should('contain', 'Your form has been submitted!')
//   })
