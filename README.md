# contao-cypress-testing

A community-driven [Cypress](https://www.cypress.io/) testing suite for Contao 5.  
You can use an existing local Contao installation or a remote one.

Very early version!

* [Installing](#installing)
* [Opening the test app](#opening-the-test-app)
* [Commands](#commands)
* [Folder structure](#folder-structure)

## Installing

    # clone the project in your existing bundle or contao mono repo
    git clone https://github.com/pdir/contao-cypress-testing.git 
    cd contao-cypress-testing
    cp cypress.config.js.example cypress.config.js
    cp cypress.env.json.example cypress.env.json
    # set parameters for your Contao 5 test domain in cypress.config.js
    # set parameters for admin user in cypress.env.json
    # use npm to install cypress
    npm install cypress --save-dev

    # or use yarn to install cypress
    yarn add cypress --dev

    Run "NODE_ENV=develop; cypress run" to run tests locally

For more information about cypress, visit https://docs.cypress.io/guides/overview/why-cypress

## Create language files for your bundle or Contao core bundles
    
    # Generate files for php files / example de ->default.php
    php -f tools/lang-to-json.php src\Resources\contao\languages\de\default.php cypress\fixtures\i18n\example-bundle\de\default.json

    # Generate files for xml files / example core-bundle -> de -> default.php
    php -f tools/xlf-to-json.php core-bundle\contao\languages\de\default.xlf cypress\fixtures\i18n\core-bundle\de\default.json
    php -f tools/xlf-to-json.php core-bundle\contao\languages\en\default.xlf cypress\fixtures\i18n\core-bundle\en\default.json

## Opening the test app

    cypress open
    # or
    yarn run cypress open

## Run a specific group or single file

    cypress run -s cypress/e2e/all.core.cy.js
    cypress run -spec cypress/e2e/core-bundle/all.cy.js,cypress/e2e/news-bundle/all.cy.js

## Run tests with screenshots and video to share with project members [Projects Setup](https://docs.cypress.io/guides/dashboard/projects.html#Setup)

    cypress run --record -s "cypress/e2e/core-bundle/backend/pages/pages.design.cy.js"      # a single test
    cypress run --record -s "cypress/e2e/core-bundle/all.cy.js"                             # all core bundle tests

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
        /i18n       # folder for json language files *DO NOT COMMIT (Generate via tools for every feature/version)
      /screenshots
      /support
      /videos
