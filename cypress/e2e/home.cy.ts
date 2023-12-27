
describe('home page', () => {
  
   it('should visit homepage and action buttons should be active if user session is active', () => {
      cy.intercept('api/auth/session', {fixture: 'session.json'}).as('session');
      cy.setCookie(
         'next-auth.session-token',
         Cypress.env('session_token')     
      );

      cy.visit('/');
      cy.wait('@session');

      cy.get('[data-cy="results"] a').should("contain.text", "Wyniki");
      cy.get('[data-cy="results"]').should('not.be.disabled');
      cy.get('[type="submit"]').should('not.be.disabled');
   });
})
