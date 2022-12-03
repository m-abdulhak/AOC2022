const fs = require('fs');
const path = require('path');

const getInput = (day, puzzle = 1) => {
    const fileRelativePath = `./input/day${day}_${puzzle}.txt`;
    const filePath = path.join(process.cwd(), fileRelativePath);
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
}

const fileRowsToArray = (rows, splitChar) => {
    return rows.split('\r\n').map((r) => splitChar ? r.split(splitChar) : r);
}

const sum = (nums) => nums.reduce((acc, num) => (acc + num), 0);

module.exports = {
    getInput,
    fileRowsToArray,
    sum
};
