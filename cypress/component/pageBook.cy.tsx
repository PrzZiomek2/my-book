import React from 'react'

import bookExample from '../fixtures/bookExample.json';
import session from '../fixtures/session.json';
import Book from '@/app/book/[id]/page';
import { SessionProvider } from 'next-auth/react';

describe('Test book pagew component', () => {
  const bookId = "LvYd0AEACAAJ";
  const {book: {volumeInfo, saleInfo}} = bookExample;
  const params = {id: bookId};

  it('should include elements with provided book data', async () => {
    cy.stub(window, "fetch").resolves({
      json: cy.stub().resolves(bookExample)
    });

    const pageComponent = await Book({params});

    cy.mount(
      <SessionProvider session={session}>
          {pageComponent}
      </SessionProvider>
    );

    cy.get('[data-cy="title"]').should("have.text", volumeInfo.title);
    cy.get('[data-cy="subtitle"]').should("have.text", volumeInfo.subtitle);
    cy.get('[data-cy="authors"]').should("have.text", volumeInfo?.authors?.join(","));
    cy.get('[data-cy="price_range"]').should("include.text", saleInfo.listPrice.amount);
      
    cy.get('[data-cy="info_link"]').should("have.attr", "href")
    cy.get('[data-cy="info_link"]').should(link => {
      const targetAttribute = link.attr('target');
      expect(targetAttribute).to.equal('_blank');
    });
    
    cy.get('[data-cy="preview_link"]').should("have.attr", "href");
    cy.get('[data-cy="preview_link"]').should(link => {
      const targetAttribute = link.attr('target');
      expect(targetAttribute).to.equal('_blank');
    });
  });

  it('should include action buttons if user has active session', async () => {
    cy.stub(window, "fetch").resolves({
      json: cy.stub().resolves(bookExample)
    });

    const pageComponent = await Book({params});

    cy.mount(
      <SessionProvider session={session}>
          {pageComponent}
      </SessionProvider>
    );

      cy.get('[data-cy="add_to_read"] [data-cy="add_to_read-content"]').should('have.text', "Przeczytane");
  })

  it('should not render action buttons if user session is inactive', async () => {
    cy.stub(window, "fetch").resolves({
      json: cy.stub().resolves(bookExample)
    });

    const pageComponent = await Book({params});

    cy.mount(
      <SessionProvider session={{} as typeof session}>
          {pageComponent}
      </SessionProvider>
    );

      cy.get('[data-cy="add_to_read"]').should('not.exist');
  })

  it('should throw an error if book id is incorrect', async () => {
    cy.stub(window, "fetch").resolves({
      json: cy.stub().resolves(bookExample)
    });

    const corruptedParam = {params: {id: "xd"}}

    const pageComponent = await Book(corruptedParam);

    cy.mount(
      <SessionProvider session={{} as typeof session}>
          {pageComponent}
      </SessionProvider>
    );

    cy.on("uncaught:exception", (e) => {
      expect(e.message).toBeTruthy();
      return false;
    });
  })

})