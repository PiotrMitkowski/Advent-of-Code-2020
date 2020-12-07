/**
 * link: https://adventofcode.com/2020/day/7
 *
 */
const fs = require('fs');
const filePath = __dirname + '/input.txt';


async function runTaskPartOne() {
    console.warn('------ PART ONE --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const rules = contents.split('\n').filter((row) => !!row);
    const tree = [];
    for (const rule of rules) {
        const splittedRule = rule.replace(/bags/gi, "").replace(/bag/gi, "").split("contain");
        const containerType = splittedRule[0].trim();
        const children = splittedRule[1].split(",");
        let formattedChildren = children
            .map((child) => {
                return child
                    .replace(/\./gi, '')
                    .trim()
                    .replace(/^[0-9]+\s/gi, '');
            })
        const node = {
            name: containerType,
            children: formattedChildren
        };
        tree.push(node);
    }
    let containersCount = 0;
    for (const bag of tree) {
        containersCount += hasShinyGold(tree, bag) ? 1 : 0;
    }
    console.warn(`Number of types that can contain gold case: ${containersCount}`);
}

async function runTaskPartTwo() {
    console.warn('------ PART TWO --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const rules = contents.split('\n').filter((row) => !!row);
    const tree = [];
    for (const rule of rules) {
        const splittedRule = rule.replace(/bags/gi, "").replace(/bag/gi, "").split("contain");
        const containerType = splittedRule[0].trim();
        const children = splittedRule[1].split(",");
        let formattedChildren = children
            .map((child) => {
                const childName = child
                    .replace(/\./gi, '')
                    .trim();
                const count = child.match(/[0-9]+\s/gi);
                const parsedCount = !!count ? parseInt(count[0].trim()) : 0;
                return {
                    name: childName.replace(/^[0-9]+\s/gi, ''),
                    count: parsedCount
                };
            })
        const node = {
            name: containerType,
            children: formattedChildren
        };
        tree.push(node);
    }
    const shinyBag = tree.find((node) => node.name === 'shiny gold');
    const innerBagsCount = countInnerBags(tree, shinyBag);
    console.warn(`Number of individual bags required in gold case: ${innerBagsCount}`);
}

function hasShinyGold(tree, node) {
    const children = node.children;
    if (!children || !children[0] || children.length === 0) {
        return false;
    }
    if (children.includes("shiny gold")) {
        return true;
    }
    for (const childBagName of children) {
        const childBag = tree.find((node) => node.name === childBagName);
        if (!!childBag && hasShinyGold(tree, childBag)) {
            return true;
        }
    }
    return false;
}

function countInnerBags(tree, bag) {
    if (!bag) {
        return 0;
    }
    const children = bag.children;
    if (!children || !children[0] || children.length === 0) {
        return 0;
    }
    let innerBags = 0;
    for (const child of children) {
        const innerBag = tree.find((node) => node.name === child.name);
        innerBags += child.count + child.count * countInnerBags(tree, innerBag);

    }
    return innerBags;
}

void runTaskPartOne().then(() => runTaskPartTwo());
