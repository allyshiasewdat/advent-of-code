const {readInputAsStringArray} = require('../utils/file');

/**
 * DAY 03, PUZZLE 01
 */

const INPUT = './input/puzzle_01.txt';
const TREE = '#';

function main(input) {
  let numTrees = 0;
  let row = 0;
  let col = 0;

  do {
    col = (col + 3) % input[row].length;
    row += 1;

    if(!input[row]) {
      continue;
    }

    //console.log(row, col);
    if(input[row][col] === TREE) {
      numTrees++;
    }
  } while(row < input.length);

  return numTrees;
}

console.log(main(readInputAsStringArray(INPUT)));
