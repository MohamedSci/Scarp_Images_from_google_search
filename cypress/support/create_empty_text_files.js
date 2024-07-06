const fs = require('fs');
const path = require('path');

export function createEmptyTextFile(title) {
  const fileName = title+'_64.txt';
  const filePath = path.join('cypress', 'fixtures', fileName); // Adjust the path as needed

  try {
    fs.writeFileSync(filePath, '', 'utf-8');
    console.log(`Empty text file "${fileName}" created successfully.`);
  } catch (err) {
    console.error(`Failed to create empty text file "${fileName}". Error: ${err.message}`);
  }
}

