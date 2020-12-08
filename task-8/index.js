/**
 * link: https://adventofcode.com/2020/day/8
 *
 */
const fs = require('fs');
const filePath = __dirname + '/input.txt';


async function runTaskPartOne() {
    console.warn('------ PART ONE --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const instructions = contents.split('\n').filter((row) => !!row);
    let accumulator = 0;
    let offset = 0;
    const visitedLines = [];
    while(!visitedLines.includes(offset)) {
        visitedLines.push(offset);
        const instructionLine = instructions[offset];
        const splittedLine = instructionLine.split(" ");
        const command = splittedLine[0].trim();
        const value = convertArgumentToInt(splittedLine[1]);
        if (command === 'nop') {
            offset += 1;
        } else if (command === 'acc') {
            accumulator += value;
            offset += 1;
        } else if (command === 'jmp') {
            offset += value;
        } else {
            throw new Error('Unknown command');
        }
    }
    console.warn(`Accumulator value before executing the line for a second time: ${accumulator}`);
}

async function runTaskPartTwo() {
    console.warn('------ PART TWO --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const instructions = contents.split('\n').filter((row) => !!row);
    let accumulator = 0;

    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        let possibleAccumulator = 0;
        if (instruction.startsWith('nop')) {
            const instructionsCandidate = [...instructions];
            instructionsCandidate[i] = instruction.replace('nop', 'jmp');
            possibleAccumulator = simulate(instructionsCandidate);
        }
        if (instruction.startsWith('jmp')) {
            const instructionsCandidate = [...instructions];
            instructionsCandidate[i] = instruction.replace('jmp', 'nop');
            possibleAccumulator = simulate(instructionsCandidate);
        }
        if (possibleAccumulator > 0) {
            accumulator = possibleAccumulator;
            break;
        }
    }

    console.warn(`Accumulator value before executing the line for a second time: ${accumulator}`);
}

function parseCommand(commandLine) {
    const splittedLine = commandLine.split(" ");
    let command = splittedLine[0].trim();
    const value = convertArgumentToInt(splittedLine[1]);
    return {command, value};
}

function convertArgumentToInt(rawArgument) {
    const argWithoutWhitespaces = rawArgument.trim();
    const sign = argWithoutWhitespaces.charAt(0);
    const value = argWithoutWhitespaces.substring(1, argWithoutWhitespaces.length);
    return sign === "+" ? parseInt(value) : -parseInt(value);
}

function simulate(instructions) {
    let accumulator = 0;
    let offset = 0;
    const visitedLines = [];
    while(!visitedLines.includes(offset) && offset < instructions.length) {
        visitedLines.push(offset);
        const instructionLine = instructions[offset];
        const splittedLine = instructionLine.split(" ");
        const command = splittedLine[0].trim();
        const value = convertArgumentToInt(splittedLine[1]);
        if (command === 'nop') {
            offset += 1;
        } else if (command === 'acc') {
            accumulator += value;
            offset += 1;
        } else if (command === 'jmp') {
            offset += value;
        } else {
            throw new Error('Unknown command');
        }
    }
    if (offset >= instructions.length) {
        return accumulator;
    }
    return 0;
}

void runTaskPartOne().then(() => runTaskPartTwo());
