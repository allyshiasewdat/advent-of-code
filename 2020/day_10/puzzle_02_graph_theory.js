const fs = require('fs');

const INPUT = './input.txt';

/**
 * DAY 10, PUZZLE 02
 */
function getNeighbours(sortedList) {
  const neighbours = {};
  for (let i = 0; i < sortedList.length; i++) {
    const current = sortedList[i];

    // Last vertex has no neighbours
    if (i === sortedList.length - 1) {
      neighbours[current] = [];
      continue;
    }

    // Initialize neighbours to next item since we assume there is always a path to the 'next' vertex.
    neighbours[current] = [sortedList[i + 1]];

    // Add extra neighbours if possible
    if (sortedList[i + 2] - current <= 3) {
      neighbours[current].push(sortedList[i + 2]);
    }
    if (sortedList[i + 3] - current <= 3) {
      neighbours[current].push(sortedList[i + 3]);
    }
  }
  return neighbours;
}

/**
 * Breadth-first-search
 */
function bfs(neighbours, start, goal) {
  function doStuffWithPath(path, goal, neighbours, queue, results) {
    const lastVertex = path[path.length - 1];

    if (lastVertex === goal) {
      return results.push(path);
    }

    neighbours[lastVertex].forEach((neighbour) => {
      queue.push([...path, neighbour]);
    });
  }

  const queue = [];
  const results = [];

  queue.push([start]);

  do {
    const popped = queue.shift();
    doStuffWithPath(popped, goal, neighbours, queue, results);
  } while (queue.length > 0);

  return results;
}

function main(input) {
  const sorted = input.sort((a, b) => a - b);
  sorted.unshift(0);

  const start = 0;
  const goal = sorted[sorted.length - 1];

  const neighbours = getNeighbours(sorted);
  return bfs(neighbours, start, goal).length;
}

function parseInput(path) {
  return fs.readFileSync(path, 'utf-8').split('\n').map(Number);
}
console.log(main(parseInput(INPUT)));
