describe('Themes - back end module', () => {

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

  it('Load themes', () => {
    cy.visit(Cypress.env('HOST') + '/contao')

    cy.get('#tl_navigation a')
      .contains('Themes')
      .click({force: true})

    cy.get('#main p').contains('No records found.')
  })

  it('Download cto file', () => {
    cy.downloadFile(
     'https://github.com/contao/official-demo/blob/main/src/files/contaodemo/contao_official_demo.cto?raw=true',
     'cypress/downloads',
     'contao_official_demo.cto'
    )
  })

  it('Import a theme', () => {

    cy.get('a.header_theme_import')
      .contains('Import')
      .click({force: true})

    cy.get('#main h3').contains('Source files')
    cy.get('#main p.tl_tip').contains('Here you can upload one or more .cto or .sql files to be imported.')

    cy.get('input[type=file]').selectFile('cypress/downloads/contao_official_demo.cto')

    cy.get('button[id="save"]').click()

    cy.get('#main p.tl_confirm').contains('File contao_official_demo.cto uploaded successfully.')

    cy.get('button[id="save"]').contains('Continue').click()
  })

  it('Delete theme', () => {

    cy.visit(Cypress.env('HOST') + '/contao')

    cy.get('#tl_navigation a')
      .contains('Themes')
      .click({force: true})

    cy.get('tr.click2edit a.delete')
      .first()
      .click({force: true})
  })

  it('New theme', () => {

    cy.visit(Cypress.env('HOST') + '/contao')

    cy.get('#tl_navigation a')
      .contains('Themes')
      .click({force: true})

    cy.get('#tl_buttons a.header_new').click()

    cy.get('input[id="ctrl_name"]').type('Contao Official Demo')
    cy.get('input[id="ctrl_author"]').type('Joe Ray Gregory, Sascha Müller, Felix Pfeiffer, Stefan Melz, Cliff Parnitzky')

    // folders
    cy.get('#ft_folders').click()
    cy.wait(400)
    cy.get("iframe").iframe().find('ul.tl_file_manager li').its('length').then((val) => {
      if(val === 2) { // toggle only if needed
        cy.get("iframe").iframe().find('#tl_buttons a.header_toggle').click();
      }
      cy.wait(400)
    })
    cy.get("iframe").iframe().find('input[value="files/contaodemo/media"]').check()
    cy.get("iframe").iframe().find('input[value="files/contaodemo/theme"]').check()
    cy.get('div.simple-modal-footer a.primary').contains('Apply').click()

    // screenshot
    cy.get('#ft_screenshot').click()
    cy.wait(400)
    // scroll to bottom
    cy.get("iframe").iframe().find('#tl_radio_reset').scrollIntoView()
    cy.get("iframe").iframe().find('input[value="files/contaodemo/theme/preview.jpg"]').check()
    cy.get('div.simple-modal-footer a.primary').contains('Apply').click()

    // templates folder
    cy.get('#ctrl_templates').select('templates/contaodemo')

    cy.get('button[id="saveNclose"]').click()
  })

  // check existing theme title
})
