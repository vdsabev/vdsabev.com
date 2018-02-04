const fs = require('fs');
const [source, destination] = process.argv.slice(2);
fs.copyFileSync(source, destination);
