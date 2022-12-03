#!/bin/bash

solutionPlaceHolder="
const { fileRowsToArray } = require('../util');

const p1 = (input) => {
    return 'Solution not yet implemented.';
}

const p2 = (input) => {
    return 'Solution not yet implemented.';
}

module.exports = (input1, input2) => {
    if (input1) {
        console.log('Sol 1:', p1(input1));
    }
    if (input2) {
        console.log('Sol 2:', p2(input2));
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
  echo "Please provide a number as the first argument."
fi