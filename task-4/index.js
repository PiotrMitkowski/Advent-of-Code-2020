/**
 * link: https://adventofcode.com/2020/day/4
 *
 */
const fs = require('fs');
const filePath = __dirname + '/input.txt';
const passportFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid','cid'];
const passportFieldsRegexes = passportFields.map((field) => new RegExp(`${field}\:`, 'gi'));

async function runTaskPartOne() {
    console.warn('------ PART ONE --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const passports = contents.split('\n\n');
    let counter = 0;
    for (const passport of passports) {
        const missingFields = passportFields.filter((field) => !passport.includes(field + ":"));
        if (missingFields.length === 0 || (missingFields.length === 1 && missingFields[0] === 'cid')) {
            counter += 1;
        }
    }
    console.warn(`Number of valid passports: ${counter} out of ${passports.length}`);
}

async function runTaskPartTwo() {
    console.warn('------ PART TWO --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const passports = contents.split('\n\n');
    let counter = 0;
    for (const passport of passports) {
        const passportWithoutNewlines = passport.replace(/\n/gi, ' ');
        const missingFields = passportFields.filter((field) => !passport.includes(field + ":"));
        if (missingFields.length === 0 || (missingFields.length === 1 && missingFields[0] === 'cid')) {
            console.warn('data', passportWithoutNewlines);
            const fieldsWithInvalidValues = passportFields.filter((fieldName, idx) => {
                const formattedFieldName = fieldName + ":";
                const fieldIdx = passportWithoutNewlines.indexOf(formattedFieldName) + formattedFieldName.length;
                let fieldEndIdx = passportWithoutNewlines.indexOf(' ', fieldIdx);
                if (fieldEndIdx === -1) {
                    fieldEndIdx = passportWithoutNewlines.length;
                }
                const fieldValue = passportWithoutNewlines.substring(fieldIdx, fieldEndIdx);
                if (fieldName === 'byr') {
                    return isInvalidDate(fieldValue, 1920, 2002);
                }
                if (fieldName === 'iyr') {
                    return isInvalidDate(fieldValue, 2010, 2020);
                }
                if (fieldName === 'eyr') {
                    return isInvalidDate(fieldValue, 2020, 2030);
                }
                if (fieldName === 'hgt') {
                    if (fieldValue.length < 2) {
                        return true;
                    }
                    const metric = fieldValue.substr(-2);
                    const height = parseInt(fieldValue.substring(0, fieldValue.length - 2));
                    console.warn("height", height, metric);
                    if (isNaN(height)) {
                        return true;
                    }
                    if (metric === 'cm') {
                        return height < 150 || height > 193;
                    } else if (metric === 'in') {
                        return height < 59 || height > 76;
                    }
                    return true;
                }
                if (fieldName === 'hcl') {
                    console.warn('hcl', fieldValue, (/#([a-f0-9]){6}/.test(fieldValue)));
                    return !(/#([a-f0-9]){6}/.test(fieldValue));
                }
                if (fieldName === 'ecl') {
                    console.warn('ecl', fieldValue, ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(fieldValue));
                    return !(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(fieldValue));
                }
                if (fieldName === 'pid') {
                    return fieldValue.length !== 9 || isNaN(parseInt(fieldValue));
                }
                return false;
            });
            console.warn('fields with invalid', fieldsWithInvalidValues);
            if (fieldsWithInvalidValues.length === 0) {
                counter += 1;
            }
        }
    }
    console.warn(`Number of valid passports: ${counter} out of ${passports.length}`);
}

function isInvalidDate(value, rangeStart, rangeEnd) {
    if (value.length < 4) {
        return true;
    }
    const parsedDate = parseInt(value);
    if (isNaN(parsedDate)) {
        return true;
    }
    return parsedDate < rangeStart || parsedDate > rangeEnd;
}

// runTaskPartTwo();
void runTaskPartOne().then(() => runTaskPartTwo());
