
const { fileRowsToArray, sum, l } = require('../util');

const testIn = 
`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;


const doTurn = (monkeys, sharedNum) => {
    for (m of monkeys) {
        for (i of m.items) {
            const num =  m.op[1] === 'old' ? i :  m.op[1];
            let newI = m.op[0] === '+' ? i + num : i * num;
            newI = sharedNum ? newI % sharedNum : Math.floor(newI / 3);

            if (newI % m.testNum === 0) {
                monkeys[m.mIfTrue].items.push(newI);
            } else {
                monkeys[m.mIfFalse].items.push(newI);
            }
            m.ins += 1;
        }
        m.items = [];
    }
}

const p1 = (input) => {
    const blocks = input.split('\n\n');
    const pBlocks = blocks.map((b) => fileRowsToArray(b, ':'));
    const monkeys = pBlocks.map((b) => {
        const items = b[1][1].split(',').map((i) => parseInt(i.trim()));
        const opCMD = b[2][1].split('=')[1].trim().split(' ');
        const op = opCMD[1];
        const opNum = opCMD[2] === 'old' ? 'old' : parseInt(opCMD[2]);
        const test = b[3][1].split(' ');
        const testNum = parseInt(test[test.length - 1]);
        const mIfTrue = parseInt(b[4][1][b[4][1].length - 1]); 
        const mIfFalse = parseInt(b[5][1][b[5][1].length - 1]);

        return { items, op: [op, opNum], testNum, mIfTrue, mIfFalse, ins: 0 };
    });

    for (let turn = 0; turn < 20; turn++) {
        doTurn(monkeys);
    }

    const monstActive = monkeys.map((m) => m.ins).sort((a, b) => b - a);
    
    return monstActive[0] * monstActive[1];
}

const p2 = (input) => {
    const blocks = input.split('\n\n');
    const pBlocks = blocks.map((b) => fileRowsToArray(b, ':'));
    const monkeys = pBlocks.map((b) => {
        const items = b[1][1].split(',').map((i) => parseInt(i.trim()));
        const opCMD = b[2][1].split('=')[1].trim().split(' ');
        const op = opCMD[1];
        const opNum = opCMD[2] === 'old' ? 'old' : parseInt(opCMD[2]);
        const test = b[3][1].split(' ');
        const testNum = parseInt(test[test.length - 1]);
        const mIfTrue = parseInt(b[4][1][b[4][1].length - 1]); 
        const mIfFalse = parseInt(b[5][1][b[5][1].length - 1]);

        return { items, op: [op, opNum], testNum, mIfTrue, mIfFalse, ins: 0 };
    });

    const shared = monkeys.reduce((acc, m) => acc * m.testNum, 1);

    for (let turn = 0; turn < 10000; turn++) {
        doTurn(monkeys, shared);
    }

    const monstActive = monkeys.map((m) => m.ins).sort((a, b) => b - a);
    
    return monstActive[0] * monstActive[1];
}

module.exports = (input1, input2) => {
    console.log('Sol 1:', p1(input1));
    console.log('Sol 2:', p2(input2));
}

