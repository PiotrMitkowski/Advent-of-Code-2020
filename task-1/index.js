/**
 * link: https://adventofcode.com/2020/day/1
 *
 */
const fs = require('fs');

const filePath = __dirname + '/input.txt';

async function runTaskPartOne() {
    console.warn('------ PART ONE --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const lines = contents.split('\n');
    const fourDigitNumbers = lines.filter((line) => line.length === 4 && parseInt(line) <= 1920).map((line) => parseInt(line));
    const threeDigitNumbers = lines.filter((line) => line.length === 3).map((line) => parseInt(line));
    for (const num of fourDigitNumbers) {
        const secondNum = threeDigitNumbers.find((num2) => num + num2 === 2020);
        if (!!secondNum) {
            console.warn(`${num} + ${secondNum} = ${num + secondNum}`);
            console.warn(`${num} * ${secondNum} = ${num * secondNum}`);
            break;
        }
    }
}

async function runTaskPartTwo() {
    console.warn('------ PART TWO --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const lines = contents.split('\n');
    const numbers = lines.map((line) => parseInt(line));
    for (let i = 0; i < numbers.length; i++) {
        const num1 = numbers[i];
        for (let j = i + 1; j < numbers.length; j++) {
            const num2 = numbers[j];
            for (let k = j + 1; k < numbers.length; k++) {
                const num3 = numbers[k];
                const sum = num1 + num2 + num3;
                if (sum === 2020) {
                    console.warn(`${num1} + ${num2} + ${num3} = ${num1 + num2 + num3}`);
                    console.warn(`${num1} * ${num2} * ${num3} = ${num1 * num2 * num3}`);
                    break;
                }
            }
        }
    }
}

void runTaskPartOne().then(() => runTaskPartTwo());


