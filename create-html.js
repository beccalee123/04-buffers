'use strict';

const fs = require('fs');
const reader = require('readline');

let articleOpen = new Buffer('<article>');
let articleClose = new Buffer('</article>');

class Converter {
  
  constructor(){
    this.buffer = Buffer.from('');
    this.tags = {};
    this.articleOpen = Buffer.from('</article>');
    this.articleClose = Buffer.from('</article>');
  }

  createTag(tag, buffer){
    if(! this.tags[tag]) {
      this.tags[tag] = {
        open: Buffer.from(`<${tag}>`),
        close: Buffer.from(`</${tag}>`),
      };
    }
    this.buffer = Buffer.concat([this.buffer, this.tags[tag].open, buffer, this.tags[tag].close]);
    // console.log(this.buffer.toString());
  }

  convert(file){

    let lineReader = reader.createInterface({
      input: fs.createReadStream(file),
    });

    lineReader.on('line', function(line) {
      if(line.match(/^[0-9]\./)) {
        this.createTag('h3', Buffer.from(line));
      }
      else if(line.match(/\./)){
        line.split('.').forEach(sentence => {
          sentence && this.createTag('li', Buffer.from(sentence));
        });
      }
      else if(line){
        this.createTag('h2', Buffer.from(line));
      }
  
    }.bind(this));
  
    lineReader.on('close', () => {

      fs.writeFile('./files/pair-programming.html', Buffer.concat([articleOpen, this.buffer, articleClose]), (err, data) => {
        console.log('file has been made');
      });
    });
  }
}

let html = new Converter();
html.convert('./files/pair-programming.txt');

