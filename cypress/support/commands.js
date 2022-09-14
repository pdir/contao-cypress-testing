// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require('cypress-downloadfile/lib/downloadFileCommand')
import {Backend} from '../support/backend'

Cypress.Commands.add('login', () => {

    const caught = {
        message: null,
    }

    cy.on('uncaught:exception', (e, runnable, promise) => {
        caught.message = e.message
        return false
    })

    cy.visit('/contao/login')
    cy.get('input[id="username"]').type( Cypress.env('admin_username') )
    cy.get('input[id="password"]').type( Cypress.env('admin_password') )
    cy.get('button[id="login"]').click()
})

Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
  return new Cypress.Promise(resolve => {
    $iframe.ready(function() {
      resolve($iframe.contents().find('body'));
    });
  });
});
