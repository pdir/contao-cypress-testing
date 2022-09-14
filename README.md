# contao-cypress-testing

A community-driven [Cypress](https://www.cypress.io/) testing suite for Contao 5
You can use an existing local Contao installation or a remote one.

Very early version!

* [Installing](#installing)
* [Opening the test app](#opening-the-test-app)
* [Commands](#commands)
* [Folder structure](#folder-structure)

## Installing

    # clone the project
    git clone https://github.com/pdir/contao-cypress-testing.git 
    cd contao-cypress-testing
    cp cypress.config.js.example cypress.config.js
    cp cypress.env.json.example cp cypress.env.json
    # set parameters for your Contao 5 test domain in cypress.config.js
    # set parameters for admin user in cypress.env.json
    # use npm to install cypress
    npm install cypress --save-dev

    # or use yarn to install cypress
    yarn add cypress --dev

    Run "NODE_ENV=develop; cypress run" to run tests locally

For more information about cypress, visit https://docs.cypress.io/guides/overview/why-cypress

## Opening the test app

    cypress open
    # or
    yarn run cypress open

## Commands

The package contains a bunch of pre-built commands for easier navigation in the backend as well as frontend using Cypress.

### General commands

#### Login to backend
```js
Backend.login(username, password)
```

### Clear backend user session
```js
Backend.clearBackendUserSessionData()
```

#### Targeting elements inside iframes 
```js
// find elements
cy.get("iframe").iframe().find('ul li')

cy.get('iframe').iframe(() => {
    // Targets the input within the iframe element
    cy.get('input').type('mail@example.com')
})
```

## Folder structure 

    /cypress
      /downloads
      /e2e              # all tests separate by bundles
        /<bundle>       # e.g core-bundle
          /<module>     # module name
            /backend
              <module>.design.cy    # design tests (e.g. element is visible; headers, title, select fields, label etc.
                                    # are present)
              <module>.func.cy      # functional tests (e.g. testing the function of select fields, DCA fields, 
                                    # buttons [create, delete, edit, toggle all, drag and drop, edit multiple etc.])
            /frontend 
            /all.cy.js              # run all tests of the bundle
        ..
        /vendor/<bundle>       # e.g. contao-demo
                               # use the same folder structure as for the core bundles  
      
      /all.core.cy.js         # run all core tests
      /all.cy.js              # run all tests, also from the vendor folder
      /all.vendor.cy.js       # run all vendor tests
      /fixtures
      /screenshots
      /support
      /videos
