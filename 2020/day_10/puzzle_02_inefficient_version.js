const fs = require('fs');
const { parse } = require('path');

const INPUT = './input.txt';
const OMITTED_VALUE = -1;

const checksums = {};

/**
 * DAY 10, PUZZLE 02
 */

function isListValid(list) {
  // remove all omitted values
  const filtered = list.filter((value) => value !== OMITTED_VALUE);

  for (let i = 0; i < filtered.length; i++) {
    if (i === 0) {
      if ([1, 2, 3].includes(filtered[i])) continue;
      return false;
    }

    if (filtered[i] - filtered[i - 1] > 3) {
      // console.log('isListValid', filtered, ' -- false');
      return false;
    }
  }
  // console.log('isListValid', filtered, ' -- true');
  return true;
}

function addLists(a, b) {
  if (a.length !== b.length) {
    throw new Error('2 added lists must be of same length.');
  }

  const sumList = [...a];
  // merge -1s from b into a
  for (let i = 0; i < a.length; i++) {
    if (b[i] === OMITTED_VALUE) {
      sumList[i] = OMITTED_VALUE;
    }
  }
  return sumList;
}

function getChecksum(list) {
  // const sum = list
  //   .filter((rating) => rating !== OMITTED_VALUE)
  //   .reduce((acc, cur) => {
  //     return acc + cur;
  //   }, 0);
  // return sum;

  return list.join(',');
}

function addAllLists(lists) {
  // console.log('addAllLists', lists);
  // base case
  // if (lists.length === 2) {
  //   const sumList = addLists(lists[0], lists[1]);
  //   const checksum = getChecksum(sumList);
  //   const toReturn =
  //     !checksums[checksum] && isListValid(sumList) ? [sumList] : [];

  //   checksums[checksum] = true;
  //   return toReturn;
  // }

  // recursive case
  const sumLists = [];

  for (let i = 0; i < lists.length - 1; i++) {
    let current = i + 1;
    do {
      const sumList = addLists(lists[i], lists[current]);
      // console.log(sumList);
      const checksum = getChecksum(sumList);
      if (!checksums[checksum] && isListValid(sumList)) {
        sumLists.push(sumList);
      }
      checksums[checksum] = true;
      current++;
    } while (current < lists.length);
  }

  // let current = 1;
  // do {
  //   const sumList = addLists(lists[0], lists[current]);
  //   // console.log(sumList);
  //   const checksum = getChecksum(sumList);
  //   if (!checksums[checksum] && isListValid(sumList)) {
  //     sumLists.push(sumList);
  //   }
  //   checksums[checksum] = true;
  //   current++;
  // } while (current < lists.length);

  // return sumLists.concat(addAllLists(lists.slice(1)));

  return sumLists;
}

function getIdentityLists(originalList) {
  // NOTE: use 0 to denote 'omitted' value
  const identityLists = [];
  // NOTE: don't create a list that has the last element missing, as it won't be valid
  for (let i = 0; i < originalList.length - 1; i++) {
    const newList = [...originalList];
    newList.splice(i, 1, OMITTED_VALUE);
    identityLists.push(newList);
  }

  // return only valid lists
  return identityLists.filter((list) => isListValid(list));
}

function main(input) {
  const sorted = input.sort((a, b) => a - b);

  // Set of lists each with a different single value missing, with invalid lists removed
  const identityLists = getIdentityLists(sorted);
  console.log('identity', identityLists);

  // Update checksums for identity lists
  identityLists.forEach((list) => {
    // NOTE we know there won't be any redundant checksums for these identity lists
    checksums[getChecksum(list)] = true;
  });

  let sumLists = [];
  let currentNumberSums = identityLists.length;
  let currentLists = identityLists;
  do {
    const sums = addAllLists(currentLists);
    sumLists = sumLists.concat(sums);

    currentNumberSums = sums.length;
    currentLists = sums;
  } while (currentNumberSums > 0 && currentLists.length > 1);

  console.log('sumLists', sumLists);

  // console.log(checksums);

  // final count is original list, plus valid identity lists, plus all valid sum lists
  return 1 + identityLists.length + sumLists.length;
}

function parseInput(path) {
  return fs.readFileSync(path, 'utf-8').split('\n').map(Number);
}
console.log(main(parseInput(INPUT)));
// const lists = [
//   [-1, 2, 3],
//   [1, -1, 3],
//   [1, 2, -3],
// ];
// console.log(addAllLists(lists, {}));
