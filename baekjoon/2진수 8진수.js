// https://www.acmicpc.net/problem/1373
// * 내 풀이
const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim();

let len = input.length + (input.length % 3 !== 0 ? 3 - (input.length % 3) : 0);
input = input.padStart(len, "0");

let result = "";

for (let i = 0; i < input.length; i += 3) {
  result += parseInt(input.slice(i, i + 3), 2).toString(8);
}

console.log(result);
