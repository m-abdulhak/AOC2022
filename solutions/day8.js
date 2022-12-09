
const { fileRowsToArray, sum, l } = require('../util');

const testIn = 
`30373
25512
65332
33549
35390`;

const getScore = (grid, i, j) => {
    const val = grid[i][j];
    let score = 1;

    let tempScore = 0;
    let x = i - 1;
    while(x >= 0) {
        tempScore++;
        if (grid[x][j] >= val) {
            break;
        }
        x--;
    }
    score *= tempScore;

    tempScore = 0;
    x = i + 1;
    while(x < grid.length) {
        tempScore++;
        if (grid[x][j] >= val) {
            break;
        }
        x++;
    }
    score *= tempScore;

    
    tempScore = 0;
    x = j - 1;
    while(x >= 0) {
        tempScore++;
        if (grid[i][x] >= val) {
            break;
        }
        x--;
    }
    score *= tempScore;

    
    tempScore = 0;
    x = j + 1;
    while(x < grid[0].length) {
        tempScore++;
        if (grid[i][x] >= val) {
            break;
        }
        x++;
    }
    score *= tempScore;


    return score;
}

const p1 = (input) => {
    // input = testIn;
    const mapper = (r) => r.split('').map((s) => parseInt(s));
    const rows = fileRowsToArray(input, '', mapper);
    const cLen = rows[0].length;
    const rLen = rows.length;

    const visible = [];
    const lMax = [...rows.map((r) => [...r])];
    const rMax = [...rows.map((r) => [...r])];
    const tMax = [...rows.map((r) => [...r])];
    const bMax = [...rows.map((r) => [...r])];

    for (let i = 1; i < rows.length - 1; i++) {
        const r = rows[i];
        for (let j = 1; j < r.length - 1; j++) {
            const el = r[j];
            if (lMax[i][j - 1] > el) {
                lMax[i][j] = lMax[i][j - 1];
            }
            if (tMax[i - 1][j] > el) {
                tMax[i][j] = tMax[i - 1][j];
            }
        }
    }

    for (let i = rows.length - 2; i > 0; i--) {
        const r = rows[i];
        for (let j = r.length - 2; j > 0; j--) {
            const el = r[j];
            if (rMax[i][j + 1] > el) {
                rMax[i][j] = rMax[i][j + 1];
            }
            if (bMax[i + 1][j] > el) {
                bMax[i][j] = bMax[i + 1][j];
            }
        }
    }

    for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        for (let j = 0; j < r.length; j++) {
            const el = r[j];
            if (i === 0 || i === rLen - 1 || j === 0 || j === cLen - 1) {
                visible.push([i, j, el]);
            }
        }
    }
    
    for (let i = 1; i < rows.length - 1; i++) {
        const r = rows[i];
        for (let j = 1; j < r.length - 1; j++) {
            const el = r[j];
            const lM = lMax[i][j - 1];
            const rM = rMax[i][j + 1];
            const tM = tMax[i - 1][j];
            const bM = bMax[i + 1][j];
            if (el > lM || el > rM || el > tM || el > bM) {
                visible.push([i, j, el]);
            }
        }
    }

    const res = visible.length;
    return res;
}

const p2 = (input) => {
    // input = testIn;
    const mapper = (r) => r.split('').map((s) => parseInt(s));
    const rows = fileRowsToArray(input, '', mapper);

    let maxScore = 0;    
    for (let i = 1; i < rows.length - 1; i++) {
        const r = rows[i];
        for (let j = 1; j < r.length - 1; j++) {
            const score = getScore(rows, i, j);
            if (score > maxScore) {
                maxScore = score;
            }
        }
    }

    return maxScore;
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

