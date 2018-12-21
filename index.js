'use strict';

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

let articleOpen = new Buffer('<article>');
let articleClose = new Buffer('</article>');
let hTwoOpen = new Buffer('<h2>');
let hTwoClose = new Buffer('</h2>');
let hThreeOpen = new Buffer('<h3>');
let hThreeClose = new Buffer('</h3>');
let ulOpen = new Buffer('<ul>');
let ulClose = new Buffer('</ul>');
let liOpen = new Buffer('<li>');
let liClose = new Buffer('</li>');

fs.readFile('./files/pair-programming.txt', (err, data) => {
  if(err) {throw err;}

  let articleBuffer = Buffer.concat([articleOpen, data, articleClose]);

  fs.writeFile('./files/pair-programming.html', articleBuffer, err => {
    if(err) {throw err;}
    console.log('Data has been written');
  });
});