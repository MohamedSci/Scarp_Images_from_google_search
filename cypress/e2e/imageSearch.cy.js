const fs = require('fs');
const path = require('path');

describe('Google Images Search', () => {
  // Read titles from the text file before running the tests
  before(() => {
    cy.readFile(path.join(Cypress.config('fileServerFolder'), 'titles.txt')).then((data) => {
      const titles = data.split('\n').filter(Boolean);
      cy.wrap(titles).as('titles'); // Save the titles as an alias
    });
  });

  // Iterate over each title and perform the search
  it('searches and downloads the first image for each title', function() {
    cy.get('@titles').each((title) => {
      cy.log(`Searching for: ${title}`);

      // Visit Google Images
      cy.visit('https://images.google.com');

      // Input the title in the search box
      cy.get('textarea[id="APjFqb"]').should('be.visible');
      cy.get('textarea[id="APjFqb"]').click();
      cy.get('textarea[id="APjFqb"]').type(`${title}{enter}`);

      // Wait for the search results to load
      cy.wait(1000);

      // Select the first image
      cy.get('div[role="presentation"] span').first().click({force:true});

      // Wait for the image to load
      cy.wait(1000);
      cy.get('img.YQ4gaf').should('be.visible');
      cy.get('img.YQ4gaf').first().then(($img) => {
        // Get the src attribute of the image
        const src = $img.attr('src');

        // Check if the src attribute matches the base64 pattern for JPEG
        if (src && src.startsWith('data:image/jpeg;base64,')) {
          // Extract the base64 part of the src
          const base64Data = src.replace(/^data:image\/jpeg;base64,/, '');

          // Define the file path to save
          const filePath = 'cypress/fixtures/'+title+'_64.txt';

        // Write base64 data to the file using cy.writeFile
        cy.writeFile(filePath, base64Data, 'base64').then(() => {
          cy.log(`Base64 image data saved to ${filePath}`);
        }).catch((err) => {
          throw new Error(`Failed to write file ${filePath}. Error: ${err.message}`);
        });
      } else {
        throw new Error('Image src attribute does not match expected base64 JPEG format');
      }
    });
  });
});
  // it.only("dddd",()=>{
  //   cy.visit('https://images.google.com');


  //   cy.get('#APjFqb').click();
  //   cy.get('#APjFqb').should('be.enabled');
  //   cy.get('#APjFqb').click();
  //   cy.get('#jZ2SBf > .wM6W7d > span').should('be.visible');
  //   cy.get('#APjFqb').click();
  //   cy.get('#APjFqb').click();
  //   cy.get('#APjFqb').click();
  //   /* ==== End Cypress Studio ==== */
  // });
});



// const titles = require('../../../readTitles');
// const fs = require('fs');
// const path = require('path');

// describe('Google Images Search', () => {
//   titles.forEach((title) => {
//     it(`searches and downloads the first image for ${title}`, () => {
//       // Visit Google Images
//       cy.visit('https://images.google.com');

//       // Input the title in the search box
//       cy.get('input[name="q"]').type(`${title}{enter}`);

//       // Wait for the search results to load
//       cy.wait(2000);

//       // Select the first image
//       cy.get('a[jsname="sTFXNd"]').first().click();

//       // Wait for the image to load
//       cy.wait(2000);

//       // Get the image URL
//       cy.get('img[jsname="HiaYvf"]').first().then(($img) => {
//         const imgUrl = $img.attr('src');

//         // Download and save the image
//         cy.request({
//           url: imgUrl,
//           encoding: 'binary'
//         }).then((response) => {
//           const imagePath = path.join(Cypress.config('fileServerFolder'), 'images', `${title}.jpg`);
//           fs.writeFileSync(imagePath, response.body, 'binary');
//         });
//       });
//     });
//   });
// });
