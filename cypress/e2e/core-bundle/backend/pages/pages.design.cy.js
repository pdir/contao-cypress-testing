import {Backend} from '../../../../support/backend'
import buttons from "../../../../fixtures/flexible/_buttons"
import pages from "../../../../fixtures/flexible/pages"
import selectors from "../../../../fixtures/flexible/selectors/pages"
import backend from "../../../../fixtures/flexible/backend.json";

describe('Pages design tests', () => {
  before(() => {
    cy.visit(backend.routes.backend);
  })

  it('Can visit pages and it contains headline and no records found.', () => {
    cy.visit(pages.routes.mainNavigationPages);

    cy.get(selectors.mainHeadlineSelector)
      .should('contain.text', pages.mainHeadline)
    cy.get(selectors.emptyMessageSelector)
      .should('contain.text', pages.emptyMessage)
  })

  it('Check filter panel and selects', () => {
    cy.get(selectors.filterLabelSelector)
      .should('contain.text', pages.filterLabel)

    cy.get(selectors.filterTypeSelector)
      .contains(pages.filterTypeDefaultText)
      .should('have.value', pages.filterTypeDefaultValue)

    cy.get(selectors.filterProtectedSelector)
      .contains(pages.filterProtectedDefaultText)
      .should('have.value', pages.filterProtectedDefaultValue)

    cy.get(selectors.filterGroupsSelector)
      .contains(pages.filterGroupsDefaultText)
      .should('have.value', pages.filterGroupsDefaultValue)

    cy.get(selectors.filterNoSearchSelector)
      .contains(pages.filterNoSearchDefaultText)
      .should('have.value', pages.filterNoSearchDefaultValue)

    cy.get(selectors.filterPublishedSelector)
      .contains(pages.filterPublishedDefaultText)
      .should('have.value', pages.filterPublishedDefaultValue)

    cy.get(selectors.filterFeedFormatSelector)
      .contains(pages.filterFeedFormatDefaultText)
      .should('have.value', pages.filterFeedFormatDefaultValue)
  })

  it('Check search panel, selects and buttons', () => {
    cy.get(selectors.searchLabelSelector)
      .should('contain.text', pages.searchLabel)

    cy.get(selectors.searchL80xxz3ySelector)
      .contains(pages.searchL80xxz3yDefaultText)
      .should('have.value', pages.searchL80xxz3yDefaultValue)

    cy.get(selectors.filterApplyButtonSelector)
      .should('be.visible')

    cy.get(selectors.filterResetButtonSelector)
      .should('be.visible')
  })

  it('Check tl_buttons', () => {
    cy.get(buttons.buttonsHeaderNewSelector)
      .should('be.visible')

    cy.get(buttons.buttonsHeaderToggleSelector)
      .should('be.visible')

    cy.get(buttons.buttonsHeaderEditAllSelector)
      .should('be.visible')
  })

})
