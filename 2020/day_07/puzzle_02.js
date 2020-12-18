const fs = require('fs');

/**
 * DAY 07, PUZZLE 02
 */

const INPUT = './input/puzzle_01.txt';
const TO_BE_FOUND = 'shiny gold';

function createMap(input) {
  // ex: { orange: {red: 2, gold:5} } -- container hashes to containees
  const map = {};

  input.forEach((raw) => {
    const line = raw.replaceAll(/(bag)+s?/g, '');
    const parentChildren = line.split(' contain ');
    const parent = parentChildren[0].trim();
    const children = parentChildren[1].split(',').map((str) => str.trim());

    children.forEach((child) => {
      const indexOfFirstSpace = child.indexOf(' ');
      const num = Number(child.substring(0, indexOfFirstSpace));
      if (!isNaN(num)) {
        const childKey = child.replaceAll(/[0-9]\s/g, '');
        if (!map[parent]) {
          map[parent] = { [childKey]: num };
        } else {
          map[parent][childKey] = num;
        }
      }
    });
  });
  return map;
}

function getCount(color, map) {
  if (!map[color]) {
    return 0;
  }

  const children = map[color];
  let count = 0;

  Object.keys(children).map((childKey) => {
    const multiplier = children[childKey];
    const found = getCount(childKey, map) + 1;
    count = count + multiplier * found;
  });

  return count;
}

function main(input, toBeFound) {
  const map = createMap(input);
  return getCount(toBeFound, map);
}

function parseInput(path) {
  // NOTE to self: I gave up on using an external utlity for parsing.
  const fileContents = fs.readFileSync(path, 'utf-8').split('.\n');
  return fileContents.slice(0, fileContents.length - 1);
}

console.log(main(parseInput(INPUT), TO_BE_FOUND));
