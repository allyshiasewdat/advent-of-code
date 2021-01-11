const fs = require('fs');
const { parse } = require('path');

const INPUT = './input.txt';

/**
 * DAY 10, PUZZLE 01
 */

function main(input) {
  const sorted = input.sort((a, b) => a - b);
  // Count of three is already one (computer rating) which is largest rating + 3.
  const counts = [0, 0, 1];
  sorted.forEach((rating, index) => {
    if (index === 0) return counts[rating - 1]++;

    const diff = rating - sorted[index - 1];
    counts[diff - 1]++;
  });

  return counts[0] * counts[2];
}

function parseInput(path) {
  return fs.readFileSync(path, 'utf-8').split('\n').map(Number);
}
console.log(main(parseInput(INPUT)));
