
const { fileRowsToArray, sum, l } = require('../util');

const testIn = 
`[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const compare = (i1, i2) => {
    if (typeof i1 !== typeof i2) {
        if (typeof i1 === 'number') {
            i1 = [i1];
        } else {
            i2 = [i2];
        }
    }

    if (typeof i1 === 'number') {
        if (i1 < i2) {
            return true;
        } else if (i2 < i1) {
            return false;
        } else {
            return null;
        }
    }

    if (i1.length === 0 && i2.length > 0) {
        return true;
    }
    if (i2.length === 0 && i1.length > 0) {
        return false;
    }

    const len = Math.min(i1.length, i2.length);
    let res = null;
    let indx = 0;

    while (res == null && indx < len) {
        const el1 = i1[indx];
        const el2 = i2[indx];
        
        res = compare(el1, el2);
        indx++;
    }

    if (res != null) {
        return res;
    }

    if (i1.length < i2.length) {
        return true;
    }
    if (i2.length < i1.length) {
        return false;
    }
    
    return null;
}

const p1 = (input) => {
    // input = testIn;
    const pairsRow = input.split('\n\n');
    const mapper = (r) => JSON.parse(r);
    const pairs = pairsRow.map((p) => fileRowsToArray(p, null, mapper));

    const orders = pairs.map((p) => compare(p[0], p[1]));

    let res = 0;
    for (let index = 0; index < orders.length; index++) {
        const element = orders[index];
        if (element) {
            res += index + 1;
        }
    }

    return res;
}

const p2 = (input) => {
    // input = testIn;
    const pairsRow = input.split('\n\n');
    const mapper = (r) => JSON.parse(r);
    const pairs = pairsRow.map((p) => fileRowsToArray(p, null, mapper));

    const all = [[[2]], [[6]], ...pairs.reduce((acc, cur) => [...acc, cur[0], cur[1]], [])];
    const ordered = all.sort((a, b) => compare(b, a) ? 1 : -1);

    let res = 1;
    for (let index = 0; index < ordered.length; index++) {
        const element = ordered[index];
        if (typeof element != 'number' && element.length === 1 && element[0].length === 1 && element[0][0] === 6) {
            res *= index + 1;
        } 
        if (typeof element != 'number' && element.length === 1 && element[0].length === 1 && element[0][0] === 2) {
            res *= index + 1;
        } 
    }

    return res;
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

