describe('Page - back end module', () => {

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

  it('Load pages', () => {
    cy.visit(Cypress.env('HOST') + '/contao')

    cy.get('#tl_navigation a')
      .contains('Pages')
      .click({force: true})

    cy.get('#main p').contains('No records found.')
  })

  it('New root page', () => {
    cy.get('#tl_buttons a.header_new').click()
    cy.get('a[title="Paste at the top"]').click()

    cy.get('input[id="ctrl_title"]').type('Contao Official Demo')
    cy.get('input[id="ctrl_alias"]').type('contao-offical-demo')
    cy.get('input[id="ctrl_language"]').type('en')

    cy.get('label[for="opt_fallback_0"]').click()
    cy.get('label[for="opt_published_0"]').click()

    cy.get('button[id="saveNclose"]').click()
  })

  it('Edit root page', () => {
    cy.get('main ul.tl_listing li').eq(1).find('a[class="edit"]').click()
  })

  it('Edit - toggle legends', () => {
    cy.get('form[id="tl_page"] fieldset').each(($el) => {
      cy.wrap($el).children('legend').click()
    })
    cy.get('button[id="saveNclose"]').click()
  })

  it('New index', () => {
    cy.get('#tl_buttons a.header_new').click()
    cy.get('a[title^="Paste into page ID"]').click()

    cy.get('form#tl_page fieldset.collapsed').each(($el) => {
      cy.wrap($el).children('legend').click()
    })

    cy.get('input[id="ctrl_title"]').type('Home')
    cy.get('input[id="ctrl_alias"]').type('index')
    cy.get('input[id="ctrl_pageTitle"]').type('Welcome to the official Contao Demo Site')
    cy.get('label[for="opt_published_0"]').click()

    cy.get('button[id="saveNclose"]').click()
  })

})
