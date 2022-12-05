
const { fileRowsToArray, sum } = require('../util');

const p1 = (input) => {
    let [sCrates, steps] = input.split('\r\n\r\n').map((s) => fileRowsToArray(s));
    
    colIndx = sCrates.slice(sCrates.length - 1)[0].split('').reduce((acc, cur, i) => {
        if (cur !== ' ') {
            acc.push(i);
        }
        return acc;
    }, []);

    sCrates = sCrates.slice(0, sCrates.length - 1);
    sCrates = sCrates.map((row) => {
        const res = [];
        for (const i of colIndx) {
            if (row[i] !== ' ') res.push(row[i]) 
            else res.push(null);
        }
        return res;
    });

    const stacks = [];
    for (let index = sCrates.length - 1; index >= 0; index--) {
        const row = sCrates[index];
        
        for (let j = 0; j < row.length; j++) {
            const c = row[j];
            if (c !== null) {
                stacks[j] = stacks[j] || [];
                stacks[j].push(c);
            }
        }
    }
    
    steps = steps
            .map((s) => s.split(' '))
            .map(([move, count, from, s1, to, s2]) => ([parseInt(count), parseInt(s1), parseInt(s2)]));
    
    for (let [count, s1, s2] of steps) {
        s1--;
        s2--;
        moved = stacks[s1].splice(stacks[s1].length - count, count);
        stacks[s2].push(...moved.reverse());
    }

    const res = stacks.map((s) => s[s.length - 1]).join('');

    return res;
}

const p2 = (input) => {
    let [sCrates, steps] = input.split('\r\n\r\n').map((s) => fileRowsToArray(s));
    
    colIndx = sCrates.slice(sCrates.length - 1)[0].split('').reduce((acc, cur, i) => {
        if (cur !== ' ') {
            acc.push(i);
        }
        return acc;
    }, []);

    sCrates = sCrates.slice(0, sCrates.length - 1);
    sCrates = sCrates.map((row) => {
        const res = [];
        for (const i of colIndx) {
            if (row[i] !== ' ') res.push(row[i]) 
            else res.push(null);
        }
        return res;
    });

    const stacks = [];
    for (let index = sCrates.length - 1; index >= 0; index--) {
        const row = sCrates[index];
        
        for (let j = 0; j < row.length; j++) {
            const c = row[j];
            if (c !== null) {
                stacks[j] = stacks[j] || [];
                stacks[j].push(c);
            }
        }
    }
    
    steps = steps
            .map((s) => s.split(' '))
            .map(([move, count, from, s1, to, s2]) => ([parseInt(count), parseInt(s1), parseInt(s2)]));
    
    for (let [count, s1, s2] of steps) {
        s1--;
        s2--;
        moved = stacks[s1].splice(stacks[s1].length - count, count);
        stacks[s2].push(...moved);
    }

    const res = stacks.map((s) => s[s.length - 1]).join('');

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
