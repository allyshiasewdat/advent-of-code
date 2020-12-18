const { readInputAsStringArray } = require('../utils/file');

/**
 * DAY 05, PUZZLE 01
 */

const INPUT = './input/puzzle_01.txt';

function replace(input) {
  return input
    .replace(/F/g, 0)
    .replace(/B/g, 1)
    .replace(/L/g, 0)
    .replace(/R/g, 1);
}

function BinEval(input) {
  return parseInt(input, 2);
}

function sortDesc(a, b) {
  return a > b ? -1 : 1;
}

function main(input) {
  const seatnums = input
    .filter((item) => item)
    .map((item) => BinEval(replace(item)));
  return seatnums.sort(sortDesc)[0];
}

console.log(main(readInputAsStringArray(INPUT)));
