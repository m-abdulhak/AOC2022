const fs = require('fs');
const path = require('path');

const getInput = (day, puzzle = 1) => {
    const fileRelativePath = `./input/day${day}_${puzzle}.txt`;
    const filePath = path.join(process.cwd(), fileRelativePath);
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;
    return data;
}

const fileRowsToArray = (rows, splitChar, mapper = (r) => (r)) => {
    return rows.split('\r\n').map((r) => (splitChar ? r.split(splitChar) : r)).map(mapper);
}

const sum = (nums) => nums.reduce((acc, num) => (acc + num), 0);

const groupArrElems = (arr, gCount) => arr.reduce((acc, cur, indx) => {
    if (indx % gCount === 0) {
      acc.push([cur]);
    } else {
      acc[acc.length - 1].push(cur);
    }

    return acc;
  }, []);

module.exports = {
    getInput,
    fileRowsToArray,
    sum,
    groupArrElems
};
