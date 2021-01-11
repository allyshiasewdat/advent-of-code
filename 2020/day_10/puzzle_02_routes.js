const fs = require('fs');

const INPUT = './input.txt';

/**
 * DAY 10, PUZZLE 02 - the definitive answer
 */
function main(input) {
  const sorted = input.sort((a, b) => a - b);
  sorted.unshift(0);

  const routes = {};

  // There is 1 route that gets you to node '(0)'
  routes[0] = 1;

  // Add up the ways you can get to each node based on route count for previous nodes.
  // Routes that don't exist per the original series count for 0.
  for (let i = 1; i < sorted.length; i++) {
    const curr = sorted[i];
    routes[curr] =
      (routes[curr - 1] || 0) +
      (routes[curr - 2] || 0) +
      (routes[curr - 3] || 0);
  }

  // NOTE: the result for the problem input is in the trillions.
  return routes[sorted[sorted.length - 1]];
}

function parseInput(path) {
  return fs.readFileSync(path, 'utf-8').split('\n').map(Number);
}
console.log(main(parseInput(INPUT)));
