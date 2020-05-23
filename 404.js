const fs =require('fs');
const path = require('path');

 fs.readFile(path.resolve(__dirname, 'build/index.html'), 'utf8', (error, contents) => {
     const file = path.resolve(__dirname, 'build/404.html');
     fs.writeFile(file, contents, () => {})
 });
