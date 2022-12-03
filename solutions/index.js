const { getInput } = require('../util');

module.exports = (day, puzzle) => {
    if (day < 1 || puzzle && (puzzle < 1 || puzzle > 2)) {
        throw new Error('Invalid Arguments.');
    }
    const dayFunc = require(`./day${day}`);
    const input1 = puzzle == 2 ? null : getInput(day, 1);
    const input2 = puzzle == 1 ? null : getInput(day, 2);
    return dayFunc(input1, input2);
}
