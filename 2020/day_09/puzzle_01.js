const fs = require('fs');
const { parse } = require('path');

const INPUT = './Input.txt';
const SEARCH_WINDOW = 25;

/**
 * DAY 09, PUZZLE 01
 */

function main(input) {
    const numbers = input.map(Number);
    let sums = [];
    // const map = {};
    // const dll = new DoublyLinkedList();

    // initialize  
    for (i = 0; i < SEARCH_WINDOW; i++) {
        for (j = 0; j < SEARCH_WINDOW; j++) {
            if (i === j) {
                continue;
            }

            sums.push(numbers[i] + numbers[j]);
            // addNumberToMap(numbers[i] + numbers[j]);
        }
    }

    // add more numbers
    let current = SEARCH_WINDOW;
    while (current < numbers.length) {
        //if (!map[numbers[current]]) return numbers[current];

        if (!sums.includes(numbers[current])) return numbers[current];
        sums = sums.slice(SEARCH_WINDOW - 1, sums.length);
        for (let i = current - 24; i <= current; i++) {
            sums.push(numbers[current] + numbers[i]);
        }

        current++;
    }

    return sums;
}

function parseInput(path) {
    const fileContents = fs.readFileSync(path, 'utf-8').split('\n');
    return fileContents.slice(0, fileContents.length);
}
console.log(main(parseInput(INPUT)))

