const fs = require('fs');

/**
 * DAY 04, PUZZLE 01
 */

const INPUT = "./input/puzzle_01.txt";
const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

function isPassportValid(passport) {
  for(let i=0; i<REQUIRED_FIELDS.length; i++){
    if(!passport.includes(`${REQUIRED_FIELDS[i]}:`)){
      return false;
    }
  }
  return true;
}

function main(input) {
  return input.filter(isPassportValid).length;
}

function parseInput(path) {
  return fs.readFileSync(path, 'utf-8').split('\n\n');
}

console.log(main(parseInput(INPUT)));
