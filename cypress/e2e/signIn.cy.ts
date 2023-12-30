  import { generateRandomString } from "../../src/utils/handlers";

describe('sign in page', () => {

   beforeEach(() => {
      cy.visit('/');
      cy.wait(2000);

      cy.get('[aria-label="Ustawienia użytkownika"]').click();
      cy.get('[role="menu"]')
         .find("p")
         .contains('Zaloguj się')
         .click();

      cy.wait(2000);
   })
  
   it('should fill the login form and sign in the user', () => {      
      
      cy.get('[type="email"]').should("have.attr", 'name', 'email');
      cy.get('[type="email"]').type("t@wp.pl");
      cy.get('[type="password"]').should("have.attr", 'name', 'password');
      cy.get('[type="password"]').type("ata");

      cy.get('[type="submit"]')
         .contains('Zaloguj się')
         .click();
      
      cy.wait(2000);

      cy.get('[aria-label="Ustawienia użytkownika"]').click();
      cy.get('[role="menu"]')
         .find("p")
         .contains('Witaj')
   });

   it('should fill the register form and create a new user', () => {      
      
      cy.get('a')
         .contains('Zarejestruj się')
         .click();

      cy.wait(2000);
      
      const userName = "test";
      cy.get('[name="name"]').type(userName);
      cy.get('[type="email"]').should("have.attr", 'name', 'email');
      cy.get('[name="email"]').type(`${generateRandomString(8)}@wp.pl`);
      cy.get('[type="password"]').should("have.attr", 'name', 'password');
      cy.get('[name="password"]').type("ata");

      cy.get('[type="submit"]')
         .contains('Zapisz')
         .click();

      cy.wait(1000);

      cy.get('[type="submit"]')
         .contains('Zaloguj się');
   });

})
