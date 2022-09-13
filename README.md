# contao-cypress-testing

A community-driven [Cypress](https://www.cypress.io/) testing suite for Contao 5
You can use an existing local Contao installation or a remote one.

Very early version!


## Installing

    # clone the project
    git clone https://github.com/pdir/contao-cypress-testing.git 
    cd contao-cypress-testing
    cp cypress.config.js.example cypress.config.js
    # set parameters for your Contao 5 test domain in cypress.config.js
    # use npm to install cypress
    npm install cypress --save-dev

    # or use yarn to install cypress
    yarn add cypress --dev

For more information about cypress, visit https://docs.cypress.io/guides/overview/why-cypress

## Opening the test app

    cypress open
    # or
    yarn run cypress open
