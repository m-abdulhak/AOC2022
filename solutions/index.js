const fs = require('fs');
const path = require('path');

const { getInput } = require('../util');

module.exports = (day, puzzle) => {
    if (day < 1 || puzzle && (puzzle < 1 || puzzle > 2)) {
        console.error('Invalid Arguments.');
        return;
    }
    
    const dayPath = `./day${day}`;

    const filePath = path.join(process.cwd(), 'solutions', `${dayPath}.js`);
    if (!fs.existsSync(filePath)) {
        console.error(`Solution to day ${day} does not exist.`);
        return;
    }

    const dayFunc = require(dayPath);
    const input1 = puzzle == 2 ? null : getInput(day, 1);
    const input2 = puzzle == 1 ? null : getInput(day, 2);
    return dayFunc(input1, input2);
}
