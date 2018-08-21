describe(`App`, () => {
  it(`should have the correct title`, () => {
    cy.visit('/');
    cy.title().should('include', 'Vlad Sabev');
  });

  it(`should redirect from base URL to /contact`, () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/contact');
  });

  it(`should redirect and activate contact link`, () => {
    cy.visit('/');
    cy.get('a[href="/contact"]').should('have.class', '--active');
  });

  describe(`Pages`, () => {
    [
      { name: 'Contact', href: '/contact', selector: '.contact' },
      { name: 'Skills', href: '/skills', selector: '.skills' },
      { name: 'Posts', href: '/posts', selector: '.articles' },
      { name: 'Talks', href: '/talks', selector: '.articles' },
    ].forEach((page) => {
      it(`should have active ${page.name} link`, () => {
        cy.visit(page.href);
        cy.get(`a[href="${page.href}"]`).should('have.class', '--active');
      });

      it(`should have ${page.name} page`, () => {
        cy.visit(page.href);
        cy.get('.pagesContainer')
          .find(page.selector)
          .should('have.length', 1);
      });
    });
  });
});
