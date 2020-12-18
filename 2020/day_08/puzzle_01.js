const fs = require('fs');
const { parse } = require('path');

/**
 * DAY 08, PUZZLE 01
 */

const INPUT = './input/puzzle_01.txt';

function getParsedInstructions(input) {
  return input.map((entry) => {
    const split = entry.split(' ');
    return {
      op: split[0],
      arg: split[1],
      visited: false,
    };
  });
}

function main(input) {
  const instructions = getParsedInstructions(input);

  let accumulator = 0;
  let gap = 1;

  for (let i = 0; i < instructions.length; i = i + gap) {
    const instruction = instructions[i];

    if (instruction.visited) {
      break;
    }
    instruction.visited = true;

    switch (instruction.op) {
      case 'acc': {
        accumulator += Number(instruction.arg);
        gap = 1;
        break;
      }
      case 'nop': {
        gap = 1;
        break;
      }
      case 'jmp': {
        gap = Number(instruction.arg);
      }
    }
  }

  return accumulator;
}

function parseInput(path) {
  const fileContents = fs.readFileSync(path, 'utf-8').split('\n');
  return fileContents.slice(0, fileContents.length - 1);
}

console.log(main(parseInput(INPUT)));
