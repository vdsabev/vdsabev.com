const env = {
  NODE_ENV: 'development',
  rootUrl: {
    development: 'http://localhost:3000',
    production: 'http://vdsabev.com',
  }
};

describe(`App`, () => {
  const rootUrl = env.rootUrl[env.NODE_ENV];

  it(`should have the correct title`, () => {
    cy.visit(rootUrl);
    cy.title().should('include', 'Vladimir Sabev');
  });

  it(`should redirect root URL to /contact`, () => {
    cy.visit(rootUrl);
    cy.url().should('eq', `${rootUrl}/contact`);
  });

  it(`should redirect and activate contact link`, () => {
    cy.visit(rootUrl);
    cy.get('a[href="/contact"]').should('have.class', 'active');
  });

  describe(`Pages`, () => {
    [
      { name: 'Contact', href: '/contact', selector: '.contact'  },
      { name: 'Skills',  href: '/skills',  selector: '.skills'   },
      { name: 'Posts',   href: '/posts',   selector: '.articles' },
      { name: 'Talks',   href: '/talks',   selector: '.articles' },
    ].forEach((page) => {
      it(`should have active ${page.name} link`, () => {
        cy.visit(rootUrl + page.href);
        cy.get(`a[href="${page.href}"]`).should('have.class', 'active');
      });

      it(`should have ${page.name} page`, () => {
        cy.visit(rootUrl + page.href);
        cy.get('.page-container').find(page.selector).should('have.length', 1);
      });
    });
  });
});
