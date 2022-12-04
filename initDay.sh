#!/bin/bash

solutionPlaceHolder="
const { fileRowsToArray, sum } = require('../util');

const p1 = (input) => {
    const mapper = (r) => r;
    const rows = fileRowsToArray(input, null, mapper);

    const res = rows.length;
    return res;
}

const p2 = (input) => {
    const mapper = (r) => r;
    const rows = fileRowsToArray(input, null, mapper);

    const res = rows.length;
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
"

if [[ $1 =~ ^[0-9]+$ ]]; then
  mkdir -p input
  mkdir -p solutions

  touch "input/day${1}_1.txt"
  touch "input/day${1}_2.txt"

  # Check if the day${1}.js file already exists
  if [ ! -f "solutions/day${1}.js" ]; then
    touch "solutions/day${1}.js"

    echo "$solutionPlaceHolder" > "solutions/day${1}.js"
  fi
else
  # Print an error message if no number was provided
  echo "Please provide day number as the first argument."
fi