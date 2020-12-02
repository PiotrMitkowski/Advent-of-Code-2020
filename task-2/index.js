/**
 * link: https://adventofcode.com/2020/day/2
 *
 */
const fs = require('fs');
const filePath = __dirname + '/input.txt';

async function runTaskPartOne() {
    console.warn('------ PART ONE --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const lines = contents.split('\n').filter(line => !!line);
    let counter = 0;
    for (const line of lines) {
        const splittedData = line.split(' ');
        const range = splittedData[0].split('-');
        const rangeStart = parseInt(range[0]);
        const rangeEnd = parseInt(range[1]);
        const requiredChar = splittedData[1].replace(':', '');
        const password = splittedData[2];
        if (password.includes(requiredChar)) {
            const charFinder = new RegExp(requiredChar, 'gi');
            const charOccurrences = password.match(charFinder);
            const charCount = charOccurrences.length;
            if (charCount >= rangeStart && charCount <= rangeEnd) {
                counter += 1;
            }
        }
    }
    console.warn(`valid passwords: ${counter} out of ${lines.length}`);
}

async function runTaskPartTwo() {
    console.warn('------ PART TWO --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const lines = contents.split('\n').filter(line => !!line);
    let counter = 0;
    for (const line of lines) {
        const splittedData = line.split(' ');
        const charPositions = splittedData[0].split('-');
        const firstCharPosition = parseInt(charPositions[0]);
        const secondCharPosition = parseInt(charPositions[1]);
        const requiredChar = splittedData[1].replace(':', '');
        const password = splittedData[2];
        if (password.includes(requiredChar)) {
            const firstChar = password[firstCharPosition - 1];
            const secondChar = password[secondCharPosition - 1];
            const occurrences = `${firstChar}${secondChar}`.match(new RegExp(requiredChar, 'gi'));
            if (!!occurrences && occurrences.length === 1) {
                console.warn(line);
                counter += 1;
            }
        }
    }
    console.warn(`valid passwords: ${counter} out of ${lines.length}`);
}

void runTaskPartOne().then(() => runTaskPartTwo());
