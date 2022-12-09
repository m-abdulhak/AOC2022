
const { fileRowsToArray, sum, l } = require('../util');

const testIn = 
`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const dirToPosDelta = {
    'R': [0, 1],
    'U': [1, 0],
    'L': [0, -1],
    'D': [-1, 0]
};

const getHPos = (hPos, dir) => {
    const d = dirToPosDelta[dir];
    return [hPos[0] + d[0], hPos[1] + d[1]];
}

const getTPos = (tPos, hPos) => {
    if (pKey(tPos) === pKey(hPos)) {
        return tPos;
    }

    if (tPos[0] === hPos[0]) {
        if (Math.abs(tPos[1] - hPos[1]) > 1) {
            return [tPos[0], tPos[1] + (hPos[1] > tPos[1] ? 1 : -1)];
        } 
        return tPos;
    }
    
    if (tPos[1] === hPos[1]) {
        if (Math.abs(tPos[0] - hPos[0]) > 1) {
            return [tPos[0]  + (hPos[0] > tPos[0] ? 1 : -1), tPos[1]];
        } 
        return tPos;
    }

    if (Math.abs(tPos[0] - hPos[0]) > 1 || Math.abs(tPos[1] - hPos[1]) > 1) {
        return [
            tPos[0]  + (hPos[0] > tPos[0] ? 1 : -1),
            tPos[1] + (hPos[1] > tPos[1] ? 1 : -1)
        ];
    }
    
    return tPos;
}

const pKey = (pos) => `${pos[0]}::${pos[1]}`;

const p1 = (input) => {
    // input = testIn;
    const mapper = ([d, steps]) => [d, parseInt(steps)];
    const cmds = fileRowsToArray(input, ' ', mapper);

    const tPosSet = new Set();
    let hPos = [0, 0];
    let tPos = [0, 0];

    const doCMD = ([dir, steps]) => {
        for (let i = 0; i < steps; i++) {
            hPos = getHPos(hPos, dir);
            tPos = getTPos(tPos, hPos);
            tPosSet.add(pKey(tPos));
        }
    }

    for (cmd of cmds) {
        doCMD(cmd);
    }

    // l(tPosSet);
    // l(tPosSet.size);

    return tPosSet.size;
}

const p2 = (input) => {
    // input = testIn;
    const mapper = ([d, steps]) => [d, parseInt(steps)];
    const cmds = fileRowsToArray(input, ' ', mapper);

    const tPosSet = new Set();
    let hPos = [0, 0];
    let p1 = [0, 0];
    let p2 = [0, 0];
    let p3 = [0, 0];
    let p4 = [0, 0];
    let p5 = [0, 0];
    let p6 = [0, 0];
    let p7 = [0, 0];
    let p8 = [0, 0];
    let tPos = [0, 0];

    const doCMD = ([dir, steps]) => {
        for (let i = 0; i < steps; i++) {
            hPos = getHPos(hPos, dir);
            p1 = getTPos(p1, hPos);
            p2 = getTPos(p2, p1);
            p3 = getTPos(p3, p2);
            p4 = getTPos(p4, p3);
            p5 = getTPos(p5, p4);
            p6 = getTPos(p6, p5);
            p7 = getTPos(p7, p6);
            p8 = getTPos(p8, p7);
            tPos = getTPos(tPos, p8);
            tPosSet.add(pKey(tPos));
        }
    }

    for (cmd of cmds) {
        doCMD(cmd);
    }

    return tPosSet.size;
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

