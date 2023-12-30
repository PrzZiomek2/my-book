
describe('home page', () => {
  
   it('should visit homepage and action buttons should be active if user session is active', () => {
      cy.sessionLogin();

      cy.get('[data-cy="results"] a').should("contain.text", "Wyniki");
      cy.get('[data-cy="results"]').should('not.be.disabled');
      cy.get('[type="submit"]').should('not.be.disabled');
   });
})
