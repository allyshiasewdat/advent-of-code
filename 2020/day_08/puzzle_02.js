const fs = require('fs');
const { Z_FIXED } = require('zlib');

/**
 * DAY 08, PUZZLE 02
 */

const INPUT = './input/puzzle_01.txt';

function getParsedInstructions(input) {
  return input.map((entry, index) => {
    const split = entry.split(' ');
    const op = split[0];
    const arg = split[1];
    return {
      op,
      arg,
      next: getDestination(op, arg, index),
      alternate: getAlternative(op, arg, index),
    };
  });
}

function getDestination(op, arg, index) {
  switch (op) {
    case 'jmp': {
      ret = index + Number(arg);
      break;
    }
    default:
      ret = index + 1;
  }
  return ret;
}

function getAlternative(op, arg, index) {
  switch (op) {
    case 'jmp': {
      ret = index + 1;
      break;
    }
    case 'nop': {
      ret = index + Number(arg);
      break;
    }
    default:
      ret = index + 1;
  }
  return ret;
}

function findLoop(instructions, indexToBeChanged) {
  const newInstructions = instructions.map((instr) => ({
    ...instr,
    visited: false,
  }));
  let i = 0;
  let found = null;
  const visited = [];

  do {
    const instruction = newInstructions[i];
    if (instruction.visited) {
      found = i;
      break;
    }
    instruction.visited = true;
    visited.push(i);
    i = indexToBeChanged === i ? instruction.alternate : instruction.next;
  } while (!found && i < instructions.length - 1);

  return [found, visited];
}

function runFixedProgram(instructions, indexToBeChanged) {
  const newInstructions = instructions.map((instr) => ({
    ...instr,
    visited: false,
  }));

  let accumulator = 0;
  let i = 0;

  do {
    const instruction = newInstructions[i];
    if (instruction.op === 'acc') {
      accumulator += Number(instruction.arg);
    }
    i = indexToBeChanged === i ? instruction.alternate : instruction.next;
  } while (i < instructions.length);

  return accumulator;
}
[];

function main(input) {
  const instructions = getParsedInstructions(input);

  const visited = findLoop(instructions, null)[1];
  console.log(visited);
  let brokenIndex;

  for (i = 0; i < visited.length; i++) {
    const toBeFlipped = visited[i];
    const newLoopIndex = findLoop(instructions, toBeFlipped)[0];
    if (!newLoopIndex) {
      brokenIndex = visited[i];
      break;
    }
  }

  if (!brokenIndex) {
    console.error('You is screwed');
  }
  return runFixedProgram(instructions, brokenIndex);
}

function parseInput(path) {
  const fileContents = fs.readFileSync(path, 'utf-8').split('\n');
  return fileContents.slice(0, fileContents.length - 1);
}

console.log(main(parseInput(INPUT)));
