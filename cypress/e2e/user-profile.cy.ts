import userProfile from '../fixtures/userProfile.json';

describe('user profile page', () => {

   before(() => {
      cy.sessionLogin();
   })

   it('should enter profile page, switch to edit profile, fill the edit form and save edited data', () => { 
      cy.wait(2000);

      cy.get('[aria-label="Ustawienia użytkownika"]')
         .click();
      cy.get('[role="menu"]')
         .find('a[href="/profile"]')
         .click();
      cy.wait(1000);
      
      cy.get('[type="button"][data-cy="edit-profile"]')
         .click();

      cy.get('[name="name"]').clear(); 
      cy.get('textarea[name="description"]').clear(); 

      cy.get('[name="name"]').type(userProfile.name);
      cy.get('textarea[name="description"]').type(userProfile.description);
      cy.get('[type="button"][data-cy="generate-tags"]')
         .click();
      cy.wait(4000);

      cy.get('[type="button"][data-cy="save-profile"]')
         .click();
      cy.get('[type="button"][data-cy="edit-profile"]')
         .click();
      cy.wait(1000);

      cy.get('[data-cy="info-name"]')
         .contains(userProfile.name)
      cy.get('[data-cy="info-description"]')
         .contains(userProfile.description)
      cy.get('[data-cy="tag"]')
         .should('have.length.greaterThan', 1);
   })

})