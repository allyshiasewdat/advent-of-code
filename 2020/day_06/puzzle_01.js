const fs = require('fs');

/**
 * DAY 06, PUZZLE 01
 */

const INPUT = './input/puzzle_01.txt';

function main(input) {
  let globalCount = 0;
  input.forEach((group) => {
    const str = group.replaceAll(/\n/g, '');
    const map = {};
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (!map[char]) {
        map[char] = true;
        count++;
      }
    }
    globalCount += count;
  });

  return globalCount;
}

function parseInput(path) {
  return fs.readFileSync(path, 'utf-8').split('\n\n');
}

console.log(main(parseInput(INPUT)));
