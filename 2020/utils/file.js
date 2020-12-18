const fs = require('fs');

function readInputAsStringArray(path){
  return fs.readFileSync(path, 'utf-8').split('\n');
}

function readInputAsNumberArray(path) {
  return fs.readFileSync(path, 'utf-8').split('\n').map(val => Number(val));
}

module.exports = {
  readInputAsStringArray,
  readInputAsNumberArray,
}
