
const { fileRowsToArray, sum, l } = require('../util');

const testIn = 
`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const drawHorizontalLine = (map, v1, v2) => {
    const start = Math.min(v1[0], v2[0]);
    const end = Math.max(v1[0], v2[0]);
    for (let i = start; i <= end; i++) {
        map[v1[1]][i] = '#';        
    }
}
const drawVerticalLine = (map, v1, v2) => {
    const start = Math.min(v1[1], v2[1]);
    const end = Math.max(v1[1], v2[1]);
    for (let i = start; i <= end; i++) {
        map[i][v1[0]] = '#';        
    }
}

const drawPath = (map, vertices) => {
    for (let index = 0; index < vertices.length - 1; index++) {
        const v1 = vertices[index];
        const v2 = vertices[index + 1];

        if (v1[0] === v2[0]) { // vertical 
            drawVerticalLine(map, v1, v2);
        } else {
            drawHorizontalLine(map, v1, v2);
        }
    }
}

const sim = (map, start) => {
    let y = start[1];
    let x = start[0];
    let maxH = map.length - 1;

    while(y < maxH) {
        if (map[y + 1][x] === '.') {
            y +=1;
            continue;
        }
        if (map[y + 1][x - 1] === '.') {
            y += 1;
            x -= 1;
            continue;
        }
        if (map[y + 1][x + 1] === '.') {
            y += 1;
            x += 1;
            continue;
        }
        map[y][x] = 'O';

        if (x === start[0] && y === start[1]) {
            return false;
        }

        return true;
    }

    return false;
}

const draw = (map) => {
    const drawing = map.map((r) => r.join(''));
    l(drawing);
}

const p1 = (input) => {
    input = testIn;
    const mapper = (r) => r.map(r => r.split(',').map((s) => parseInt(s)));
    const rows = fileRowsToArray(input, ' -> ', mapper);
    
    const map = [];
    for (let index = 0; index < 300; index++) {
        map[index] = [];
        for (let j = 0; j < 600; j++) {
            map[index].push('.');            
        }
    }

    for (const row of rows) {
        drawPath(map, row);
    }


    const sandStart = [500,0];
    let rested = 0;
    while(sim(map, sandStart)) {
        rested += 1;
    }

    return rested;
}

const p2 = (input) => {
    // input = testIn;
    const mapper = (r) => r.map(r => r.split(',').map((s) => parseInt(s)));
    const rows = fileRowsToArray(input, ' -> ', mapper);
    
    let maxH = Math.max(...rows.map((r) => Math.max(...r.map(([x, y]) => y))));
    maxH += 2;
    
    rows.push([[-1000, maxH], [1000, maxH]]);
    
    const map = [];
    for (let index = 0; index <= maxH; index++) {
        map[index] = [];
        for (let j = -1000; j <= 1000; j++) {
            map[index].push('.');            
        }
    }

    for (const row of rows) {
        drawPath(map, row);
    }

    const sandStart = [500,0];
    let rested = 0;
    while(sim(map, sandStart)) {
        rested += 1;
    }
    rested += 1;

    return rested;
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

