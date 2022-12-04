
const { fileRowsToArray, sum } = require('../util');

const rangesContained = (r1, r2) => {
    return (r1[0] >= r2[0] && r1[1] <= r2[1]) || (r2[0] >= r1[0] && r2[1] <= r1[1]);
}

const rangesOverlap = (r1, r2) => {
    return r1[0] <= r2[1] && r2[0] <= r1[1];
}

const p1 = (input) => {
    const mapper = (r) => r.map((p) => p.split('-').map((c) => parseInt(c)));
    const rows = fileRowsToArray(input, ',', mapper);
    const contained = rows.map((r) => rangesContained(r[0], r[1]));
    const res = contained.filter((v) => v == true).length;
    return res;
}

const p2 = (input) => {
    const mapper = (r) => r.map((p) => p.split('-').map((c) => parseInt(c)));
    const rows = fileRowsToArray(input, ',', mapper);
    const contained = rows.map((r) => rangesOverlap(r[0], r[1]));
    const res = contained.filter((v) => v == true).length;
    return res;
}

module.exports = (input1, input2) => {
    if (input1 != null) {
        console.log('Sol 1:', p1(input1));
    }
    if (input2 != null) {
        console.log('Sol 2:', p2(input2));
    }
}

