const fs = require('fs');
const { parse } = require('path');

const INPUT = './Input.txt';
const TEST_INPUT = './test.txt';
const SEARCH_WINDOW = 25;

/**
 * DAY 09, PUZZLE 02
 */

function findInvalid(numbers) {
    let sums = [];

    // initialize  
    for (i = 0; i < SEARCH_WINDOW; i++) {
        for (j = 0; j < SEARCH_WINDOW; j++) {
            if (i === j) {
                continue;
            }

            sums.push(numbers[i] + numbers[j]);
        }
    }

    // add more numbers
    let current = SEARCH_WINDOW;
    while (current < numbers.length) {
        if (!sums.includes(numbers[current])) {
            return numbers[current];
        }
        sums = sums.slice(SEARCH_WINDOW - 1, sums.length);
        for (let i = current - 24; i <= current; i++) {
            sums.push(numbers[current] + numbers[i]);
        }

        current++;
    }

    return null;
}

function getSegments(input, errNum) {
    const segments = [];
    let current = 0;
    let currentArray = [];
    while (current < input.length) {
        if (input[current] < errNum) {
            currentArray.push(input[current]);
        } else {
            if (currentArray.length !== 0) {
                segments.push(currentArray);
                currentArray = [];
            }
        }

        current++;
    }
    return segments;
}

function checkSumsInRange(segment, errNum, start, acc, currEnd) {
    const sum = segment[currEnd] + acc;
    if (currEnd === segment.length) {
        return null;
    }
    if (sum === errNum) {
        return [start, currEnd];
    }

    return checkSumsInRange(segment, errNum, start, sum, currEnd + 1);
}

function checkSegment(segment, errNum) {
    for (let i = 0; i < segment.length - 2; i++) {
        const foundIndices = checkSumsInRange(segment, errNum, i, segment[i], i + 1);
        if (foundIndices) {
            return foundIndices;
        }
    }

    return null;
}

function findWeakness(input, errNum) {
    const segments = getSegments(input, errNum);
    for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        const range = checkSegment(seg, errNum);
        if (range) {
            const sorted = seg.slice(range[0], range[1] + 1).sort((a, b) => a - b);
            const smallest = sorted[0];
            const largest = sorted[sorted.length - 1];
            console.log(range)
            return smallest + largest;
        };
    }

    return null;
}

function main(input) {
    const numbers = input.map(Number);
    const invalid = findInvalid(numbers);
    return findWeakness(numbers, invalid);
}


function parseInput(path) {
    const fileContents = fs.readFileSync(path, 'utf-8').split('\n');
    return fileContents.slice(0, fileContents.length);
}
console.log(main(parseInput(INPUT)))
// findWeakness(parseInput(TEST_INPUT), 10)

