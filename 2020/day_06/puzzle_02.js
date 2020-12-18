const fs = require('fs');

/**
 * DAY 06, PUZZLE 02
 */

const INPUT = './input/puzzle_01.txt';

function main(input) {
  let globalCount = 0;
  input.forEach((group) => {
    const answers = group.split(/\n/).filter((str) => str);
    const map = {};
    answers.forEach((str) => {
      for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (!map[char]) {
          map[char] = 1;
        } else {
          map[char] = map[char] + 1;
        }
      }
    });

    Object.keys(map).forEach((key) => {
      if (map[key] === answers.length) globalCount++;
    });
  });

  return globalCount;
}

function parseInput(path) {
  return fs.readFileSync(path, 'utf-8').split('\n\n');
}

console.log(main(parseInput(INPUT)));
