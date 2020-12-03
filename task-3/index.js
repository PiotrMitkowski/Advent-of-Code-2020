/**
 * link: https://adventofcode.com/2020/day/3
 *
 */
const fs = require('fs');
const assert = require('assert');
const filePath = __dirname + '/input.txt';

async function runTaskPartOne() {
    console.warn('------ PART ONE --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const lines = contents.split('\n').filter(line => !!line);
    const treesCount = countTreesOnPath(lines, 3, 1);
    console.warn(`number of trees: ${treesCount}`);
}

async function runTaskPartTwo() {
    console.warn('------ PART TWO --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const lines = contents.split('\n').filter(line => !!line);
    const availablePaths = [
        {right: 1, down: 1},
        {right: 3, down: 1},
        {right: 5, down: 1},
        {right: 7, down: 1},
        {right: 1, down: 2},
    ];
    const treesOnRoute = availablePaths.map((path) => countTreesOnPath(lines, path.right, path.down));
    const treesMultiplied = treesOnRoute.reduce((previousValue, currentValue) => previousValue * currentValue, 1);
    console.warn(`number of trees: ${treesOnRoute}; multiplied: ${treesMultiplied}`);

}

function countTreesOnPath(slope, horizontalStep, verticalStep) {
    const lineLength = slope[0].length;
    const maxIndex = lineLength - 1;
    let horizontalPos = 0;
    let treesCount = 0;
    for (let i = 0; i < slope.length; i += verticalStep) {
        let line = slope[i];
        if (i > 0) {
            horizontalPos += horizontalStep;
            if (horizontalPos > maxIndex) {
                horizontalPos = horizontalPos - lineLength;
                assert(horizontalPos >= 0);
            }
            const position = line.charAt(horizontalPos);
            if (position === '#') {
                treesCount += 1;
            }
        }
    }
    return treesCount;
}

void runTaskPartOne().then(() => runTaskPartTwo());
