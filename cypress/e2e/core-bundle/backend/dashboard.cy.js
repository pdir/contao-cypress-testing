import backend from "../../../fixtures/flexible/backend.json";

describe('Back end login', () => {
  before(() => {
    cy.visit(backend.routes.backend);
  })

  it('Cookies are set', () => {
    cy.getCookies().then((cookies) => {
      console.log(cookies);
    })
  });

  it('Load Dashboard', () => {
    cy.visit(backend.routes.backend)
    cy.get('#main_headline').should('contain', 'Dashboard')
  })

  it('Check header navigation', () => {
    cy.get('ul[id="tmenu"] a.icon-manual').should('contain', 'Manual')
    cy.get('ul[id="tmenu"] a.icon-alert').should('contain', 'Alerts')
    cy.get('ul[id="tmenu"] a.icon-debug').should('contain', 'Debug mode')
    cy.get('ul[id="tmenu"] a.icon-preview').should('contain', 'Preview')
    cy.get('ul[id="tmenu"] button').should('contain', 'User ')
  })

  it('Clear session data', () => {
    cy.get('ul[id="tmenu__profile"] a.icon-profile').click({force: true})
    cy.get('#main_headline').should('contain', 'User profile')
    cy.get('input[id="opt_purge_0"]').check()
    cy.get('button[id="save"]').click()
    cy.get('p.tl_confirm').should('contain', 'The session data has been purged')
  })

  it('Toggle groups', () => {
    cy.get('nav[id="tl_navigation"] li > a[title="Collapse node"]').each(($el) => {
      cy.wrap($el).click()
      console.log(cy.get('nav[id="tl_navigation"] a.group-content').parent());
      cy.wrap($el).parent().should('have.class', 'collapsed')
    })
  })

})
