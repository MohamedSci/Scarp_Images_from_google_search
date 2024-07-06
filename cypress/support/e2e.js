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
import './commands';


before(() => {
    cy.readFile(path.join(Cypress.config('fileServerFolder'), 'titles.txt')).then((data) => {
      const titles = data.split('\n').filter(Boolean);
      titles.forEach((title) => {
        createEmptyTextFile(title);
      });
    });
  });
// Alternatively you can use CommonJS syntax:
// require('./commands')