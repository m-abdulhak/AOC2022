
const { fileRowsToArray, sum, l } = require('../util');

const testIn = 
`Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

const man = (c1, c2) => Math.abs(c1[0] - c2[0]) + Math.abs(c1[1] - c2[1]);

const hasB = (rows, coords) => {
    for (const r of rows) {
        const bPos = r[1];
        if (bPos[0] === coords[0] && bPos[1] === coords[1]) {
            return true;
        }
    }
    return false;
}

const hasS = (rows, coords) => {
    for (const r of rows) {
        const sPos = r[0];
        if (sPos[0] === coords[0] && sPos[1] === coords[1]) {
            return true;
        }
    }
    return false;
}

const getFreq = (coords) => coords[0] * 4000000 + coords[1];

const getCellsOnManBorder = ([x, y], dist, mn, mx, borderCells) => {
    dist += 1;
    for (let j = -dist; j <= dist; j++) {
        let leftX = -(dist - j);
        let rightX = dist - j;
        const cordL = [x + leftX, y + j];
        if (cordL[0] < mn || cordL [0] > mx || cordL[1] < mn || cordL[1] > mx) {
            continue;
        } else {
            borderCells.push(cordL);
        }
        const cordR = [x + rightX, y + j];
        if (cordR[0] < mn || cordR [0] > mx || cordR[1] < mn || cordR[1] > mx) {
            continue;
        } else {
            borderCells.push(cordR);
        }          
    }
}

const p1 = (rows, targetRow) => {
    const maxX = Math.max(...rows.map((r) => r[0][0] + r[2]));
    const minX = Math.min(...rows.map((r) => r[0][0] - r[2]));
    
    let inValids = 0;
    for (let x = minX; x <= maxX; x++) {
        const coords = [x, targetRow];
        let valid = true;
        if (hasS(rows, coords) || hasB(rows, coords)) {
            continue;
        }
        for (const r of rows) {
            if (man(r[0], coords) <= r[2]) {
                valid = false;
                inValids += 1;
                break;
            }
        }
    }
    
    return inValids;
}

const p2 = (rows, maxN) => {
    let borderCells = [];
    for (const [s, b, dist] of rows) {
        getCellsOnManBorder(s, dist, 0, maxN, borderCells);
    }
    l('Cells to check:', borderCells.length);

    for (const coords of borderCells) {
        let valid = true;
        if (hasS(rows, coords) || hasB(rows, coords)) {
            continue;
        }
        for (const r of rows) {
            if (man(r[0], coords) <= r[2]) {
                valid = false;
                break;
            }
        }
        if (valid) {
            freq = getFreq(coords);
            return freq;
        }
    }
    throw new Error('Answer not found!');
}

module.exports = (input) => {
    let targetRow = 2000000;
    let maxN = 4000000;

    // Test set
    // input = testIn;
    // targetRow = 10;
    // maxN = 20;

    const mapper = (r) => r.map((p) => p.split(' ').filter((s) => s !== 'Sensor' && s !== 'at').map((t) => parseInt(t.slice(2))));
    const rows = fileRowsToArray(input, ': closest beacon is ', mapper);

    for (const row of rows) {
        const [s, b] = row;
        const dist = man(s, b);
        row.push(dist);
    }

    console.log('Sol 1:', p1(rows, targetRow));
    console.log('Sol 2:', p2(rows, maxN));
}
