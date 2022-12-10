
const { fileRowsToArray, sum, l } = require('../util');

const p1 = (mem) => {
    let res = 0;
    for (let i = 20; i < mem.length; i += 40) {
        const element = mem[`${i}`];
        const stren = i * element;
        res += stren;
    }

    return res;
}

const p2 = (mem) => {
    let sprite = [];
    let screen = [];

    for (let i = 0; i < mem.length; i++) {
        const xPos = mem[i + 1];
        sprite = [xPos - 1, xPos, xPos + 1];
        if (sprite.includes(i % 40)) {
            screen.push('#');
        } else {
            screen.push('.');
        }
    }

    const sRows = [''];
    for (let i = 0; i < screen.length - 1; i++) {
        const x = screen[i];
        if (sRows[sRows.length - 1].length >= 40) {
            sRows.push('');
        }
        sRows[sRows.length - 1] += x;
    }

    return sRows;
}

module.exports = (input) => {
    const mapper = ([cmd, x]) => [cmd, parseInt(x)];
    const rows = fileRowsToArray(input, ' ', mapper);

    let c = 0;
    let x = 1;
    let mem = [];

    for ([cmd, val] of rows) {
        if (cmd === 'noop') {
            c++;
            mem[c] = x;
        } else {
            c++;
            mem[c] = x;
            c++;
            mem[c] = x;
            x += val;
        }
    }
    
    console.log('Sol 1:', p1(mem));
    console.log('Sol 2:', p2(mem));
}

