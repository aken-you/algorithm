// https://www.acmicpc.net/problem/15654
// * 풀이
// n개 자연수 중 m개를 고른 수열
// 사전 순으로 증가하는 순서로 출력

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n");

const [n, m] = inputs[0].split(" ").map(Number);
const nodes = inputs[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const checked = Array(n).fill(false);

const result = [];

const dfs = (arr) => {
  if (arr.length === m) {
    result.push(arr);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (checked[i]) continue;

    checked[i] = true;
    dfs([...arr, nodes[i]]);
    checked[i] = false;
  }
};

dfs([]);

console.log(result.map((e) => e.join(" ")).join("\n"));
