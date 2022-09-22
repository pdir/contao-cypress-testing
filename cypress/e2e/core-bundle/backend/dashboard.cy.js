import backend from '../../../fixtures/flexible/backend.json'

let i18n = {}

describe('Back end login', () => {
  before(() => {
    cy.task('getLang').then((lang) => {
      cy.fixture(`i18n/core-bundle/${lang}/default.json`).then((lang) => {
        i18n.default = lang
      })

      cy.fixture(`i18n/core-bundle/${lang}/modules.json`).then((lang) => {
        i18n.modules = lang
      })

      cy.fixture(`i18n/core-bundle/${lang}/tl_user.json`).then((lang) => {
        i18n.modules = lang
      })
    })

    cy.visit(backend.routes.backend);
  })

  it('Cookies are set', () => {
    cy.getCookies().then((cookies) => {
      console.log(cookies);
    })
  });

  it('Load Dashboard', () => {
    cy.visit(backend.routes.backend)
    cy.get('#main_headline').should('contain', i18n.default['MSC.dashboard'])
  })

  it('Check header navigation', () => {
    cy.get('ul[id="tmenu"] a.icon-manual').should('contain', i18n.default['MSC.manual'])
    cy.get('ul[id="tmenu"] a.icon-alert').should('contain', i18n.default['MSC.systemMessages'])
    cy.get('ul[id="tmenu"] a.icon-debug').should('contain', i18n.default['Debug mode'])
    cy.get('ul[id="tmenu"] a.icon-preview').should('contain', i18n.default['MSC.fePreview'])
    cy.get('ul[id="tmenu"] button').should('contain', 'User ')
  })

  it('Clear session data', () => {
    cy.get('ul[id="tmenu__profile"] a.icon-profile').click({force: true})
    cy.get('#main_headline').should('contain', i18n.default['MOD.login.0'])
    cy.get('input[id="opt_purge_0"]').check()
    cy.get('button[id="save"]').click()
    cy.get('p.tl_confirm').should('contain', i18n.tl_user['sessionPurged'])
  })

  it('Toggle groups', () => {
    cy.get('nav[id="tl_navigation"] li > a[title="Collapse node"]').each(($el) => {
      cy.wrap($el).click()
      cy.wrap($el).parent().should('have.class', 'collapsed')
    })
  })

})
