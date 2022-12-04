
const { fileRowsToArray, sum, groupArrElems } = require('../util');

const itemPriority = (c) => {
    const cCode = c.charCodeAt(0);
    const ranges = [
        ['a'.charCodeAt(0), 'z'.charCodeAt(0), 1],
        ['A'.charCodeAt(0), 'Z'.charCodeAt(0), 27]
    ];
    for (const r of ranges) {
        if (cCode >= r[0] && cCode <= r[1]) return r[2] + cCode - r[0];
    }
    console.log('Unkown Char:', c);
}

const p1 = (input) => {
    const mapper = (r) => [r.slice(0, r.length / 2), r.slice(r.length / 2)];
    let rows = fileRowsToArray(input, null, mapper);

    const errors = [];
    for (const r of rows) {
        const mem = {};
        for (let index = 0; index < r[0].length; index++) {
            const c = r[0][index];
            mem[c] = 1;
        }
        for (let index = 0; index < r[1].length; index++) {
            const c = r[1][index];
            if (mem[c] === 1) {
                errors.push(itemPriority(c));
                break;
            }
        }
    }
    return sum(errors);
}

const p2 = (input) => {
    let rows = fileRowsToArray(input);
    const groups = groupArrElems(rows, 3);
    
    const res = [];

    for(const g of groups) {
        const freq = {};
        for (let index = 0; index < g[0].length; index++) {
            const c = g[0][index];
            freq[c] = 1;
        }
        for (let index = 0; index < g[1].length; index++) {
            const c = g[1][index];
            freq[c] = freq[c] ? 2 : 0;
        }
        for (let index = 0; index < g[2].length; index++) {
            const c = g[2][index];
            if (freq[c] === 2) {
                res.push(itemPriority(c));
                break;
            }
        }
    }

    return sum(res);
}

module.exports = (input1, input2) => {
    if (input1) {
        console.log('Sol 1:', p1(input1));
    }
    if (input2) {
        console.log('Sol 2:', p2(input2));
    }
}

