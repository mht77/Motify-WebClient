// @ts-nocheck
export{}
describe('Landing Page', () => {
  it('Authentication', () => {
    cy.visit('localhost:3000')
    cy.get('#register-email').type('test@test.test')
    cy.get('#register-pass').type('test123test')
    cy.get('#register-repeat').type('test123test')
    cy.get('#register-btn').click()
    cy.contains('Logout').click()
    cy.get('#login-email').type('test@test.test')
    cy.get('#login-pass').type('test123test')
    cy.get('#login-btn').click()
    cy.contains('Home')
    cy.contains('Search')
  })
})