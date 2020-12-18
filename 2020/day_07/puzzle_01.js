const fs = require('fs');

/**
 * DAY 07, PUZZLE 01
 */

const INPUT = './input/puzzle_01.txt';
const TO_BE_FOUND = 'shiny gold';

function createMap(input) {
  // ex: { orange: [red, gold] } -- containee hashes to containers
  const map = {};

  input.forEach((raw) => {
    const line = raw.replaceAll(/(bag)+s?|[0-9]+/g, '');
    const parentChildren = line.split(' contain ');
    const parent = parentChildren[0].trim();
    const children = parentChildren[1].split(',').map((str) => str.trim());

    children.forEach((child) => {
      if (!map[child]) {
        map[child] = [parent];
      } else {
        map[child].push(parent);
      }
    });
  });

  return map;
}

function find(color, map) {
  return findHelper(color, map, {});
}

function findHelper(color, map, found) {
  if (!map[color]) {
    return found;
  }

  const containers = map[color];

  containers.map((containerColor) => {
    found[containerColor] = true;
  });

  const newFound = containers.map((containerColor) =>
    find(containerColor, map, found)
  );

  return Object.assign(found, ...newFound);
}

function main(input, toBeFound) {
  const map = createMap(input);
  const found = find(toBeFound, map);
  return Object.keys(found).length;
}

function parseInput(path) {
  // NOTE to self: I gave up on using an external utlity for parsing.
  const fileContents = fs.readFileSync(path, 'utf-8').split('.\n');
  return fileContents.slice(0, fileContents.length - 1);
}

console.log(main(parseInput(INPUT), TO_BE_FOUND));
