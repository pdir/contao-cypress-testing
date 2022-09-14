import selectors from '../fixtures/flexible/selectors/backend';
import backend from '../fixtures/flexible/backend';

export class Backend {
  static login() {
    cy.visit(backend.routes.backend);
    cy.get(selectors.loginUsernameInputSelector).type(Cypress.env('admin_username'));
    cy.get(selectors.loginPasswordInputSelector).type(`${Cypress.env('admin_password')}{enter}`);
    this.isLoggedIn(Cypress.env('admin_username'));
  }

  static isLoggedIn(user) {
    cy.get(selectors.headerNavigationProfileButtonSelector).contains('User ' + user)
  }
}
