const { fileRowsToArray, sum } = require('../util');

const p1 = (input) => {
    const inventories = input.split('\r\n\r\n');
    const mealsPerInv = inventories.map((inv) => fileRowsToArray(inv).map((s) => parseInt(s)));
    const caloriesPerInv = mealsPerInv.map((meals) => meals.reduce((acc, val) => (acc + val), 0));
    return Math.max(...caloriesPerInv);
}

const p2 = (input) => {
    const inventories = input.split('\r\n\r\n');
    const mealsPerInv = inventories.map((inv) => fileRowsToArray(inv).map((s) => parseInt(s)));
    const caloriesPerInv = mealsPerInv.map((meals) => meals.reduce((acc, val) => (acc + val), 0));
    const sortedByCalories = caloriesPerInv.sort((a, b) => b - a);
    return sum(sortedByCalories.slice(0, 3));
}

module.exports = (input1, input2) => {
    if (input1) {
        console.log('Sol 1:', p1(input1));
    }
    if (input2) {
        console.log('Sol 2:', p2(input2));
    }
}
