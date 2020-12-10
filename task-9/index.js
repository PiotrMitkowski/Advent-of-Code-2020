/**
 * link: https://adventofcode.com/2020/day/9
 *
 */
const fs = require('fs');
const filePath = __dirname + '/input.txt';


async function runTaskPartOne() {
    console.warn('------ PART ONE --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const encryptedData = contents.split('\n').filter((row) => !!row).map((row) => parseInt(row));
    const threshold = 25;
    const dataCopy = [...encryptedData];
    let numberWithoutSum = -1;
    let testSet = dataCopy.splice(0, threshold);
    for (const entry of dataCopy) {
        if (!hasSumElements(testSet, entry)) {
            numberWithoutSum = entry;
            break;
        }
        testSet.splice(0, 1);
        testSet.push(entry);
    }
    console.warn(`A number without sum is ${numberWithoutSum}`);
}

async function runTaskPartTwo() {
    console.warn('------ PART TWO --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const encryptedData = contents.split('\n').filter((row) => !!row).map((row) => parseInt(row));
    const requiredSum = 530627549;
    let requestedSum = 0;
    for (let i = 0; i < encryptedData.length; i++) {
        const firstElement = encryptedData[i];
        let sum = firstElement;
        const elements = [firstElement];
        for (let j = i + 1; j < encryptedData.length; j++) {
            const furtherElement = encryptedData[j];
            elements.push(furtherElement);
            sum += furtherElement;
            if (sum > requiredSum) {
                break;
            }
            if (sum === requiredSum) {
                elements.sort();
                requestedSum = elements[0] + elements[elements.length - 1];
                break;
            }
        }
        if (requestedSum > 0) {
            break;
        }
    }
    console.warn(`A sum of first and last element in set is ${requestedSum}`);
}

function hasSumElements(data, sumValue) {
    for(let i = 0; i < data.length; i++) {
        const firstElement = data[i];
        for (let j = i + 1; j < data.length; j++) {
            const secondElement = data[j];
            if (firstElement !== secondElement && (firstElement + secondElement === sumValue)) {
                return true;
            }
        }
    }
    return false;
}

void runTaskPartOne().then(() => runTaskPartTwo());
