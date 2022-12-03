
const { fileRowsToArray, sum } = require('../util');

const standarize = {
    'X': 'A',
    'Y': 'B',
    'Z': 'C'
};

const shapeScore = {
    'A': 1,
    'B': 2,
    'C': 3
};

const loseH2 = {
    'A': 'C',
    'B': 'A',
    'C': 'B'
};

const winH2 = {
    'A': 'B',
    'B': 'C',
    'C': 'A'
};

const playerOneWins = (h1, h2) => {
    return ['AC', 'CB', 'BA'].includes(`${h1}${h2}`);
};

const winScore = (h1, h2) => {
    if (shapeScore[h1] === shapeScore[h2]) {
        return 3;
    }
    if (playerOneWins(h1, h2)) {
        return 0;
    }
    return 6;
}

const getHand = (h1, res) => {
    if (res === 'Y') return h1; // Draw
    if (res === 'X') return loseH2[h1]; // lose
    if (res === 'Z') return winH2[h1]; // win
}

const p1 = (input) => {
    let rows = fileRowsToArray(input, ' ');
    rows = rows.map((r) => [r[0], standarize[r[1]]]);
    const scores = rows.map(([h1, h2]) => shapeScore[h2] + winScore(h1, h2));
    return sum(scores);
}

const p2 = (input) => {
    let rows = fileRowsToArray(input, ' ');
    rows = rows.map((r) => [r[0], getHand(r[0], r[1])]);
    const scores = rows.map(([h1, h2]) => shapeScore[h2] + winScore(h1, h2));
    return sum(scores);
}

module.exports = (input1, input2) => {
    if (input1) {
        console.log('Sol 1:', p1(input1));
    }
    if (input2) {
        console.log('Sol 2:', p2(input2));
    }
}

