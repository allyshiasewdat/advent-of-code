const { readInputAsStringArray } = require('../utils/file');

/**
 * DAY 05, PUZZLE 02
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

function sumOneToN(n) {
  return (n * (n + 1)) / 2;
}

function sumXToN(x, n) {
  return (n * (n + 1)) / 2 - (x * (x - 1)) / 2;
}

function sumArray(array) {
  return array.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
}

function main(input) {
  const seatnums = input
    .filter((item) => item)
    .map((item) => BinEval(replace(item)));

  const x = seatnums.sort(sortDesc)[seatnums.length - 1];
  const n = seatnums.sort(sortDesc)[0];

  const expectedSum = sumXToN(x, n);
  const actualSum = sumArray(seatnums);
  const missing = expectedSum - actualSum;
  return missing;
}

console.log(main(readInputAsStringArray(INPUT)));
