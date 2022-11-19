
describe('Try Incorrect email/password', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  })
  it('Test Login', () => {
    cy.get('#login-email').type('fake@email.com').should('have.value', 'fake@email.com');
    cy.get('#login-password').type('randopass').should('have.value', 'randopass');
    cy.get('#login-button').click();
    cy.location('pathname').should('eq', '/login')
  })
})