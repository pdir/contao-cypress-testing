import backend from "../../../fixtures/flexible/backend.json";

describe('Navigation', () => {
  before(() => {
    cy.visit(backend.routes.backend);
  })

  it('Toggle groups', () => {
    cy.get('nav#tl_navigation ul > li a.group-content').click().then((elem) => {
      cy.get(elem).parent().should('have.class', 'collapsed')
    })
  })

  // visit all navigation elements
})
