import {Backend} from '../../../../support/backend'
import buttons from "../../../../fixtures/flexible/_buttons"
import pages from "../../../../fixtures/flexible/pages"
import selectors from "../../../../fixtures/flexible/selectors/pages"
import backend from '../../../../fixtures/flexible/backend.json'
import root from "../../../../fixtures/flexible/pages-website-root.json"
import index from "../../../../fixtures/flexible/pages-regular-page-index.json"

describe('Pages functional tests', () => {
  before(() => {
    cy.visit(backend.routes.backend);
  })

  it('Create website root', () => {
    cy.visit(pages.routes.mainNavigationPages);

    cy.get(buttons.buttonsHeaderNewSelector).click()
    cy.get(buttons.buttonMainPasteAtTheTop).click()

    cy.get(pages.dcaFields.root.title)
      .should('be.visible')
      .type(`${root.title}`)

    cy.get(pages.dcaFields.root.alias)
      .should('be.visible')
      .type(`${root.alias}`)

    // set language and trigger save via enter
    cy.get(pages.dcaFields.root.language)
      .should('be.visible')
      .type(`${root.language}{enter}`)

    cy.get(pages.dcaFields.regular.pageTitle)
      .should('be.visible')
      .type(`${index.pageTitle}`)

    // set checkboxes
    cy.get(pages.dcaFields.root.fallback).click()
    cy.get(pages.dcaFields.root.published).click()

    // save and close
    cy.get(buttons.buttonMainSaveAndClose).click()
  })

  it('Edit website root and return', () => {
    cy.get('main ul.tl_listing li').eq(1).find('a[class="edit"]').click()
    cy.wait(400)
    cy.get(buttons.buttonsHeaderBackSelector).click()
  })

  it('Create regular page', () => {
    cy.get(buttons.buttonsHeaderNewSelector).click()
    cy.get(buttons.buttonMainPasteIntoPageId1).click()

    cy.get(pages.dcaFields.regular.title)
      .should('be.visible')
      .type(`${index.title}`)

    cy.get(pages.dcaFields.regular.alias)
      .should('be.visible')
      .type(`${index.alias}`)

    cy.get(pages.dcaFields.regular.pageTitle)
      .should('be.visible')
      .type(`${index.pageTitle}`)

    // set checkboxes
    cy.get(pages.dcaFields.regular.published).click()

    // save and close
    cy.get(buttons.buttonMainSaveAndClose).click()
  })

  it('Delete regular page', () => {

  })

  it('Delete root page', () => {

  })

})
