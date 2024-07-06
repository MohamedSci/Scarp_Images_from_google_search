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
const path = require('path');
const createEmptyTextFile = require('./create_empty_text_files');
before(() => {
  cy.readFile(path.join(Cypress.config('fileServerFolder'), 'titles.txt')).then((data) => {
    const titles = data.split('\n').filter(Boolean);
    titles.forEach((title) => {
      // Create Empty Text Files 
      const fileName = title + '_64.txt';
      const filePath = path.join('cypress', 'fixtures', fileName); // Adjust the path as needed

      try {
        fs.writeFileSync(filePath, '', 'utf-8');
        console.log(`Empty text file "${fileName}" created successfully.`);
      } catch (err) {
        console.error(`Failed to create empty text file "${fileName}". Error: ${err.message}`);
      }

    });
  });
});
// Alternatively you can use CommonJS syntax:
// require('./commands')