// https://www.acmicpc.net/problem/11720
// * 내 풀이
let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n");

const n = Number(inputs[0]);

const nums = [...inputs[1]].map((e) => Number(e));

let sum = nums.reduce((acc, curr) => acc + curr, 0);

console.log(sum);
