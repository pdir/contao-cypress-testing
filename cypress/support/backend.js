import selectors from '../fixtures/flexible/selectors/backend';
import backend from '../fixtures/flexible/backend';
import buttons from '../fixtures/flexible/_buttons.json';

export class Backend {
  static login() {
    cy.visit(backend.routes.backend);
    cy.get(selectors.loginUsernameInputSelector).type(Cypress.env('ADMIN_USERNAME'));
    cy.get(selectors.loginPasswordInputSelector).type(`${Cypress.env('ADMIN_PASSWORD')}{enter}`);
    this.isLoggedIn(Cypress.env('ADMIN_USERNAME'));
  }

  static isLoggedIn(user) {
    cy.get(selectors.headerNavigationProfileButtonSelector).contains('User ' + user)
  }

  static clearBackendUserSessionData() {
    cy.visit(backend.routes.headerNavigationProfile)
    cy.get(selectors.headerNavigationProfileButtonSelector).click({force: true})

    cy.get(selectors.userProfilePurgeDataSessionDataSelector).check()
    // save and close
    cy.get(buttons.buttonMainSaveAndClose).click()
  }
}
