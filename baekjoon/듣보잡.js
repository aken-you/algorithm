// https://www.acmicpc.net/problem/1764
// * 풀이

// 듣도 x: input[0][0];
// 보도 x:input[0][1];

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n");

const [n, m] = inputs[0].split(" ").map(Number);

const noListen = new Set(inputs.slice(1, n + 1));
const noLook = inputs.slice(n + 1, n + m + 1);
const result = [];

for (let str of noLook) {
  if (noListen.has(str)) {
    result.push(str);
  }
}

result.sort();

console.log(result.length);
console.log(result.join("\n"));
