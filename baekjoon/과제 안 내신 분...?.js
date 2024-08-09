// https://www.acmicpc.net/problem/5597
// * 풀이
let inputs = require("fs").readFileSync("/dev/stdin").toString().split("\n");

inputs = inputs.map(Number);

inputs.sort((a, b) => a - b);

const checked = new Array(31).fill(false);

for (let i = 0; i < inputs.length; i++) {
  checked[inputs[i]] = true;
}

for (let i = 1; i < checked.length; i++) {
  if (!checked[i]) console.log(i);
}
