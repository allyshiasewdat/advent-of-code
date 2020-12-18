const {readInputAsStringArray} = require('../utils/file');

/**
 * DAY 02, PUZZLE 01
 */

const INPUT = './input/puzzle_01.txt';

function isPasswordValid(pwd, letter, minOccs, maxOccs) {
  const allExceptLetter = new RegExp(`[^${letter}]`, 'g');
  const letterOnly = pwd.split(allExceptLetter).join('');

  return letterOnly.length >= minOccs && letterOnly.length <= maxOccs;
}

function getParsedPasswords(input) {
  return input.map((row) => {
    if(!row) {
      return null;
    }

    const split = row.split(':');
    const pwd = split[1].trim();
    const policy = split[0].split(' ');
    const minMax = policy[0].split('-');
    const letter = policy[1];
    const min = minMax[0];
    const max = minMax[1];

    return {
      pwd,
      letter,
      min,
      max
    }
  })
}

function main(input) {
  const parsedPwds = getParsedPasswords(input);
  const numValidPwds = parsedPwds.filter((row) => {
    if(!row) return false;
    const {pwd, letter, min, max} = row;
    return isPasswordValid(pwd, letter, min, max);
  }).length;

  return numValidPwds;
}

console.log(main(readInputAsStringArray(INPUT)));
