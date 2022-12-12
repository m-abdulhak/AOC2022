
const { fileRowsToArray, sum, l } = require('../util');

const testIn = 
`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const getNs = (x, y) => [
    [x - 1, y],
    [x, y - 1],
    [x + 1, y],
    [x, y + 1]
];

const allowed = (grid, [x, y], [a, b], desc = false) => {
    const v1 =  typeof grid[x][y] !== 'number' && grid[x][y].charCodeAt(0);
    const v2 = typeof grid[a][b] !== 'number' && grid[a][b].charCodeAt(0);
    return v1 && v2 && (desc ? (v2 - v1) >= -1 : (v1 - v2) >= -1); 
}

const ns = (grid, [x, y], desc = false) => {
    const allN = getNs(x, y);
    const res = allN.filter(([a,b]) => {
        const p1 = (grid?.[a]?.[b] != null);
        let p2 = false;
        if (p1) {
            p2 = allowed(grid, [x, y], [a, b], desc);
        }
        return p1 && p2;
    });

    return res;
}

const p1 = (input) => {
    // input = testIn;
    const mapper = (r) => r.split('');
    const map = fileRowsToArray(input, '', mapper);
    
    let s = [];
    let e = [];
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        for (let j = 0; j < row.length; j++) {
            const ch = row[j];
            if (ch === 'S') {
                s = [i, j];
                map[i][j] = 'a';
            }
            if (ch === 'E') {
                e = [i, j];
                map[i][j] = 'z';
            }
        }
    }

    let cur = s;
    let neighborsQ = ns(map, cur).map((p) => [1, p]);
    map[cur[0]][cur[1]] = 0;

    while(neighborsQ.length > 0 && (cur[0] !== e[0] || cur[1] !== e[1])) {
        const newNeighborsQ = [];
        const keys = new Set();
        
        for ([steps, p] of neighborsQ) {
            if (typeof map[p[0]][p[1]] == 'number' && map[p[0]][p[1]] <= steps) {
                continue;
            }
            const neighbors = ns(map, p).filter(pos => !keys.has(`${pos[0]}-${pos[1]}`));
            map[p[0]][p[1]] = steps;

            neighbors.forEach((pos) => {
                newNeighborsQ.push([steps + 1, pos]);
                keys.add(`${pos[0]-pos[1]}`)
            });
        }
        neighborsQ = newNeighborsQ;
    }

    return map[e[0]][e[1]];
}

const p2 = (input) => {
    // input = testIn;
    const mapper = (r) => r.split('');
    const map = fileRowsToArray(input, '', mapper);
    
    let s = [];
    let validStart = [];
    for (let i = 0; i < map.length; i++) {
        const row = map[i];
        for (let j = 0; j < row.length; j++) {
            const ch = row[j];
            if (ch === 'S') {
                map[i][j] = 'a';
            }
            if (ch === 'E') {
                s = [i, j];
                map[i][j] = 'z';
            }
            if (ch === 'a') {
                validStart.push([i, j]);
            }
        }
    }

    let cur = s;
    let neighborsQ = ns(map, cur, true).map((p) => [1, p]);
    map[cur[0]][cur[1]] = 0;

    while(neighborsQ.length > 0) {
        const newNeighborsQ = [];
        const keys = new Set();
        
        for ([steps, p] of neighborsQ) {
            if (map[p[0]][p[1]] <= s) {
                continue;
            }
            let neighbors = ns(map, p, true).filter(pos => !keys.has(`${pos[0]}-${pos[1]}`));
            map[p[0]][p[1]] = steps;

            neighbors.forEach((pos) => {
                newNeighborsQ.push([steps + 1, pos]);
                keys.add(`${pos[0]-pos[1]}`)
            });
        }
        neighborsQ = newNeighborsQ;
    }

    let res = null;

    for (pos of validStart) {
        if (res === null || map[pos[0]][pos[1]] < res) {
            res = map[pos[0]][pos[1]];
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

