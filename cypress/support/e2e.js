// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
// import {Backend} from './backend';
// import backend from "../fixtures/flexible/backend.json";

// Alternatively you can use CommonJS syntax:
// require('./commands')

//
// global beforeEach and before
//
beforeEach(() => {
  // cookies will not be cleared before the NEXT test starts.
  Cypress.Cookies.preserveOnce('PHPSESSID', 'csrf_https-contao_csrf_token')
})

before(() => {
  // cy.getCookie('PHPSESSID').then((cookie) => {
  //  if (!cookie) {
  //    Backend.login()
  //  }
  //})
  //cy.visit(backend.routes.backend);
})
