const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'titles.txt');
const titles = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);

module.exports = titles;
