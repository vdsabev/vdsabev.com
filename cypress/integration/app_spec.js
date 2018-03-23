describe(`App`, () => {
  const rootUrl = 'http://localhost:3000';

  it(`should have the correct title`, () => {
    cy.visit(rootUrl);
    cy.title().should('include', 'Vladimir Sabev');
  });

  it(`should redirect root URL to /contact`, () => {
    cy.visit(rootUrl);
    cy.url().should('eq', `${rootUrl}/contact`);
  });

  describe(`Pages`, () => {
    [
      { name: 'Contact', href: '/contact', selector: '.contact'  },
      { name: 'Skills',  href: '/skills',  selector: '.skills'   },
      { name: 'Posts',   href: '/posts',   selector: '.articles' },
      { name: 'Talks',   href: '/talks',   selector: '.articles' },
    ].forEach((page) => {
      it(`should contain ${page.name} page`, () => {
        cy.visit(rootUrl + page.href);
        cy.get('.page-container').find(page.selector).should('have.length', 1);
      });
    });
  });
});
