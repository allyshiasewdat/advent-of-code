const { readInputAsStringArray } = require("../utils/file");

/**
 * DAY 03, PUZZLE 02
 */

const INPUT = "./input/puzzle_01.txt";
const TREE = "#";
const SLOPES = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

function main(input) {
  let numTrees = 0;
  let row = 0;
  let col = 0;
  let Running_total = 1;

  for (let x = 0; x < SLOPES.length; x++) {
    col = 0;
    row = 0;
    numTrees = 0;
    do {
      col = (col + SLOPES[x][0]) % input[row].length;
      row += SLOPES[x][1];

      if (!input[row]) {
        continue;
      }

      //console.log(row, col);
      if (input[row][col] === TREE) {
        numTrees++;
      }
    } while (row < input.length);
    Running_total = Running_total * numTrees;
  }
  return Running_total;
}

console.log(main(readInputAsStringArray(INPUT)));
