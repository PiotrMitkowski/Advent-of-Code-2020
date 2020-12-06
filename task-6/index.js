/**
 * link: https://adventofcode.com/2020/day/6
 *
 */
const fs = require('fs');
const filePath = __dirname + '/input.txt';

async function runTaskPartOne() {
    console.warn('------ PART ONE --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const groups = contents.split('\n\n').filter((row) => !!row);
    let uniqueAnswersSum = 0;
    for (const group of groups) {
        const groupAnswers = group.replace(/\n/gi, "");
        const uniqueAnswers = new Set(groupAnswers);
        uniqueAnswersSum += uniqueAnswers.size;
    }
    console.warn(`Total sum of unique answers: ${uniqueAnswersSum}`);
}

async function runTaskPartTwo() {
    console.warn('------ PART TWO --------');
    const contents = await fs.readFileSync(filePath, 'utf-8');
    const groups = contents.split('\n\n').filter((row) => !!row);
    let commonQuestionsSum = 0;
    for (const group of groups) {
        const answersByQuestion = new Map();
        const peopleAnswers = group.split("\n").filter((row) => !!row);;
        const peopleCount = peopleAnswers.length;
        for (const personAnswers of peopleAnswers) {
            const answersArray = personAnswers.split("");
            for (const answer of answersArray) {
                if (answersByQuestion.has(answer)) {
                    answersByQuestion.set(answer, answersByQuestion.get(answer) + 1);
                } else {
                    answersByQuestion.set(answer, 1);
                }
            }
        }
        const fullAnsweredQuestions = Array.from(answersByQuestion.keys()).filter((key) => answersByQuestion.get(key) === peopleCount);
        commonQuestionsSum += fullAnsweredQuestions.length;
    }
    console.warn(`Total sum of commonly answered questions: ${commonQuestionsSum}`);
}

void runTaskPartOne().then(() => runTaskPartTwo());
