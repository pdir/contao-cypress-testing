describe('Users - back end modules', () => {

  beforeEach(() => {
    // cookies will not be cleared before the NEXT test starts.
    Cypress.Cookies.preserveOnce('PHPSESSID', 'csrf_https-contao_csrf_token')
  })

  before(() => {
    cy.getCookie('PHPSESSID').then((cookie) => {
      if (!cookie) {
        cy.login()
      }
    })
  })

  it('Load users', () => {
    cy.visit(Cypress.env('HOST') + '/contao')
    cy.get('#tl_navigation a')
      .contains('Users')
      .click({force: true})

    cy.get('table.tl_listing tr').first().get('td').eq(2).contains(Cypress.env('ADMIN_USERNAME'))
  })

  it('Edit', () => {
    // cy.visit(Cypress.env('HOST') + '/contao?do=user&act=edit&id='+Cypress.env('ADMIN_ID'))
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
