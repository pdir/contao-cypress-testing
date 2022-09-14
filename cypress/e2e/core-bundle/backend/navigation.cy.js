import {Backend} from '../../../support/backend'
import backend from "../../../fixtures/flexible/backend.json";

describe('Navigation', () => {
  before(() => {
    cy.visit(backend.routes.backend);
  })

  it('Toggle groups', () => {
    Backend.clearBackendUserSessionData();
    cy.get('nav#tl_navigation ul > li a.group-content').click({force: true}).then((elem) => {
      cy.get(elem).parent().should('have.class', 'collapsed')
    })
  })

  // visit all navigation elements
})
