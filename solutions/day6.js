
const { fileRowsToArray, sum } = require('../util');


const getFirstChar = (str, markerLength) => {
    str = str.split('');
    for (let i = markerLength - 1; i < str.length; i++) {
        const sub = str.slice(i - markerLength + 1, i + 1);
        const s = new Set(sub);
        if (sub.length === s.size) {
            return i + 1;
        }
    }
}

const p1 = (input) => {
    const row = fileRowsToArray(input, null)[0];
    return getFirstChar(row, 4);
}

const p2 = (input) => {
    const row = fileRowsToArray(input, null)[0];
    return getFirstChar(row, 14);
}

module.exports = (input1, input2) => {
    if (input1 != null) {
        console.log('Sol 1:', p1(input1));
    }
    const in2 = input2?.length ? input2 : input1;
    if (in2 != null) {
        console.log('Sol 2:', p2(in2));
    }
}

