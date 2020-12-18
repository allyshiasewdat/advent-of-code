const {readInputAsNumberArray} = require('../utils/file'); 
/**
 * DAY 01, PUZZLE 01
 */

const INPUT = './input/puzzle_01.txt';

function main(input){
  const SUM = 2020;

  for(let i=0; i<input.length; i++){
    for(let j=0; j<input.length; j++) {
      if(i == j) {
        continue;
      }

      if(input[i] + input[j] === SUM){
        return input[i] * input[j];
      }
    }
  }
}

console.log(main(readInputAsNumberArray(INPUT)));
