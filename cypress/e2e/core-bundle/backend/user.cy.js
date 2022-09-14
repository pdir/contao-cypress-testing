import backend from "../../../fixtures/flexible/backend.json";

describe('Users - back end modules', () => {
  before(() => {
    cy.visit(backend.routes.backend);
  })

  it('Load users', () => {
    cy.get('#tl_navigation a')
      .contains('Users')
      .click({force: true})

    cy.get('table.tl_listing tr').first().get('td').eq(2).contains(Cypress.env('ADMIN_USERNAME'))
  })

  it('Edit', () => {
    cy.get('table.tl_listing tr').first().get('td').eq(4).children('a').eq(0).click()
  })

  it('Toggle legends', () => {
    cy.get('form[id="tl_user"] fieldset').each(($el) => {
      cy.wrap($el).children('legend').click()
    })

    cy.get('button[id="saveNclose"]').click()
  })

  // create new user

  // delete user
})
