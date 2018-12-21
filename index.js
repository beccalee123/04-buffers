'use strict';

//'use strict'; \n
//\n
//let array = ['Buddy', 'Hank', 'Leo'];
//\n
//array.forEach( name => {\n
//  console.log(name);\n
//})

const fs = require('fs');

let bufferOne = new Buffer('\'use strict\';\n');
let bufferTwo = new Buffer('let arr = [\'Buddy\', \'Hank\', \'Leo\'];\n');
let bufferThree = new Buffer('arr.forEach( name => {\n');
let bufferFour = new Buffer('  console.log(name);\n');
let bufferFive = new Buffer('});');

let arr = [bufferOne, bufferTwo, bufferThree, bufferFour, bufferFive];

let finalBuffer = Buffer.concat(arr);

fs.writeFile('./files/loop.js', finalBuffer, err => {
  if(err) {throw err;}
  console.log('File has been made');
});
