const fs = require('fs');
const path = require('path');

const getInput = (day, puzzle = 1) => {
    const fileRelativePath = `./input/day${day}_${puzzle}.txt`;
    const filePath = path.join(process.cwd(), fileRelativePath);
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
}

const fileRowsToArray = (rows) => {
    return rows.split('\r\n');
}

module.exports = {
    getInput,
    fileRowsToArray
};
