// https://www.acmicpc.net/problem/20291

let inputs = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const n = Number(inputs[0]);
const result = {};

for (let i = 1; i <= n; i++) {
  const [a, b] = inputs[i].split(".");

  if (!result[b]) result[b] = 1;
  else result[b] += 1;
}

const keys = Object.keys(result).sort();

for (let i = 0; i < keys.length; i++) {
  console.log(keys[i], result[keys[i]]);
}
