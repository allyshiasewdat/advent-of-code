const fs = require("fs");
const { waitForDebugger } = require('inspector');

/**
 * DAY 04, PUZZLE 02
 */

const INPUT = "./input/puzzle_01.txt";
const REQUIRED_FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

/*
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    
    hgt (Height) - a number followed by either cm or in:
        If cm, the number must be at least 150 and at most 193.
        If in, the number must be at least 59 and at most 76.
    
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
   
    pid (Passport ID) - a nine-digit number, including leading zeroes.
    
    cid (Country ID) - ignored, missing or not.
*/

const RULES = {
  byr: {
    range: [1920, 2002],
  },
  iyr: {
    range: [2010, 2020],
  },
  eyr: {
    range: [2020, 2030],
  },
  hgt: {
    suffix: ['cm', 'in'],
    cm: {
      range: [150, 193],
    },
    in: {
      range: [59, 76],
    },
  },
  hcl: {
    match: /^#[0-9|a-f]{6}$/,
  },
  ecl: {
    match: /amb|blu|brn|gry|grn|hzl|oth/,

  },
  pid: {
    match: /^[0-9]{9}$/,
  },
};

function evaluateRange(range, value) {
  const min = range[0];
  const max = range[1];
  const numValue = Number(value);
  
  return numValue >= min && numValue <= max;
}

function evaluateRegex(regex, value) {
  return value.match(regex);
}

function evaluateSuffix(suffixes, value) {
  for(let i=0; i<suffixes.length; i++) {
    const suff = suffixes[i];
    if(value.endsWith(suff)) {
      return suff;
    }
  }
  return null;
}

function isFieldValid(name, value, rules){
  const rule = rules[name];
  if(!rule) {
    return true;
  }

  // priority: range, match, suffix
  const subRule = Object.keys(rule)[0];
  switch(subRule) {
    case 'range': {
      // console.log(value, ' - ',subRule)
      const valid = evaluateRange(rule[subRule], value);
      if(!valid) console.log('invalid:  ',value, ' - ', subRule);
      return valid;
    };
    case 'match': {
      const valid = evaluateRegex(rule[subRule], value);
      if(!valid) console.log('invalid:  ',value, ' - ', subRule);
      return valid;
    };
    case 'suffix': {
      const suff = evaluateSuffix(rule[subRule], value);
      if(!suff) {console.log('BUSTED SUFFIX', value); return false};
          
      const num = Number(value.slice(0, suff.length * -1));
      const valid = isFieldValid(suff, num, rule);
      if (!valid) console.log(value , ' - ', suff, ' - ', value.slice(0, suff.length * -1));
      return valid;
    }
    default: return false;
  }
}

function isPassportValid(passport) {
  // Check for required fields
  for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
    if (!passport.includes(`${REQUIRED_FIELDS[i]}:`)) {
      return false;
    }
  }

  // Check for valid values
  const parsed = passport.split(/\s/);

  for (let i = 0; i < parsed.length; i++) {
    const fieldData = parsed[i].split(":");
    const fieldName = fieldData[0];
    const fieldValue = fieldData[1];

    if(!isFieldValid(fieldName, fieldValue, RULES)) return false;
  }

  return true;
}

function main(input) {
  return input.filter(isPassportValid).length;
}

// function readFromFile(path){
//   return fs.readFileSync(path, "utf-8");
// }

function parseInput(path) {
  return fs.readFileSync(path, "utf-8").split("\n\n");
}

console.log(main(parseInput(INPUT)));