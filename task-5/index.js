/**
 * link: https://adventofcode.com/2020/day/5
 *
 */
const fs = require('fs');
const filePath = __dirname + '/input.txt';

async function runTaskPartOne() {
    console.warn('------ PART ONE --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const seats = contents.split('\n').filter((row) => !!row);
    let maxSeatId = 0;
    for (const seat of seats) {
        const rowChars = seat.substring(0, 7);
        const columnChars = seat.substring(7, 10);
        const rowPosition = decodeRowPosition(rowChars);
        const columnPosition = decodeColumnPosition(columnChars);
        const seatId = (rowPosition * 8) + columnPosition;
        maxSeatId = Math.max(maxSeatId, seatId);
    }
    console.warn(`Max seat id: ${maxSeatId}`);
}

async function runTaskPartTwo() {
    console.warn('------ PART TWO --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const seats = contents.split('\n').filter((row) => !!row);
    const seatIds = [];
    for (const seat of seats) {
        const rowChars = seat.substring(0, 7);
        const columnChars = seat.substring(7, 10);
        const rowPosition = decodeRowPosition(rowChars);
        const columnPosition = decodeColumnPosition(columnChars);
        const seatId = (rowPosition * 8) + columnPosition;
        seatIds.push(seatId);
    }
    seatIds.sort();
    let mySeatId = -1;
    for (let i = 0; i < seatIds.length; i++) {
        const currentSeat = seatIds[i];
        const nextSeat = seatIds[i + 1];
        if (nextSeat - currentSeat === 2) {
            mySeatId = nextSeat - 1;
            break;
        }
    }
    console.warn(`My seat: ${mySeatId}; first planeSeat: ${seatIds[0]}, last plane seat: ${seatIds[seatIds.length-1]}`);
    console.warn(`Is my place free? ${!seatIds.includes(mySeatId)}`);
}

function decodeRowPosition(rowCode) {
    let rangeStart = 0;
    let rangeEnd = 127;
    for (const codeChar of rowCode.split('')) {
        const rangeLength = Math.round((rangeEnd - rangeStart) / 2);
        if (rangeLength === 1) {
            return codeChar === 'F' ? rangeStart : rangeEnd;
        }
        if (codeChar === 'F') {
            rangeEnd -= rangeLength;
        } else {
            rangeStart += rangeLength;
        }
    }
}

function decodeColumnPosition(columnCode) {
    let rangeStart = 0;
    let rangeEnd = 7;
    for (const codeChar of columnCode.split('')) {
        const rangeLength = Math.round((rangeEnd - rangeStart) / 2);
        if (rangeLength === 1) {
            return codeChar === 'L' ? rangeStart : rangeEnd;
        }
        if (codeChar === 'L') {
            rangeEnd -= rangeLength;
        } else {
            rangeStart += rangeLength;
        }
    }
}

void runTaskPartOne().then(() => runTaskPartTwo());
