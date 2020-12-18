const fs = require('fs');

/**
 * DAY 08, PUZZLE 02
 */

const INPUT = './input/example.txt';

function getParsedInstructions(input) {
  return input.map((entry, index) => {
    const split = entry.split(' ');
    return {
      op: split[0],
      arg: split[1],
      visited: false,
      next: getdestination(split[0], split[1], index),
      alternate: getalternative(split[0], split[1], index),
    };
  });
}

function reversefind(index, input) {
  console.log('Looking for: ', index);
  const found = input.findIndex((instruction) => {
    return instruction.next === index;
  });

  if (found === -1) {
    return index;
  }

  return reversefind(found, input);
}

function getalternative(operation, arg, index) {
  switch (operation) {
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

function getdestination(operation, arg, index) {
  switch (operation) {
    case 'jmp': {
      ret = index + Number(arg);
      break;
    }
    default:
      ret = index + 1;
  }
  return ret;
}

function main(input) {
  const instructions = getParsedInstructions(input);
  console.log(instructions);
  const broken = reversefind(instructions.length - 1, instructions);
  console.log('The broken line is: ');
  console.log(broken);
  let accumulator = 0;
  let gap = 1;

  for (let i = 0; i < instructions.length; i = i) {
    console.log('I IS', i);
    const instruction = instructions[i];

    if (instruction.visited) {
      console.log('The thing is loopy');
      console.log('tried to visit: ', instructions[i].next);

      break;
    }
    instruction.visited = true;

    console.log(
      'default: ',
      instruction.next,
      'alternate: ',
      instruction.alternate
    );

    switch (instruction.op) {
      case 'acc': {
        accumulator += Number(instruction.arg);
        i = instruction.next;
        break;
      }
      default: {
        if (broken === instruction.alternate) {
          console.log('caught');
          i = instruction.alternate;
        } else {
          i = instruction.next;
        }
      }
    }
  }

  return accumulator;
}

function parseInput(path) {
  console.clear;
  const fileContents = fs.readFileSync(path, 'utf-8').split('\n');
  return fileContents.slice(0, fileContents.length - 1);
}

console.log(main(parseInput(INPUT)));
