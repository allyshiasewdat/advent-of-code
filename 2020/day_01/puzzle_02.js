const {readInputAsNumberArray} = require('../utils/file');

/**
 * DAY 01, PUZZLE 02
 */

const INPUT = './input/puzzle_01.txt';

function main(input) {
  const SUM = 2020;

  for(let i=0; i<input.length; i++){
    for(let j=0; j<input.length; j++){
      for(let k=0; k<input.length; k++){
        if(i === j || i === k || j === k){
          continue;
        }

        if(input[i] + input[j] + input[k] === SUM) {
          return input[i] * input[j] * input[k];
        }
      }
    }
  }
}

console.log(main(readInputAsNumberArray(INPUT)));
