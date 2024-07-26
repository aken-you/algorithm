// https://www.acmicpc.net/problem/15651
// * 풀이
// 1~n 중 m개를 고른 수열
// 같은 수를 여러번 골라도 됨
// 사전 순으로 증가하는 순서로 출력

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

const [n, m] = inputs.split(" ").map(Number);

const nodes = Array.from({ length: n }, (e, idx) => idx + 1);
const result = [];

const dfs = (arr) => {
  if (arr.length === m) {
    result.push(arr);
    return;
  }

  for (let i = 0; i < n; i++) {
    dfs([...arr, nodes[i]]);
  }
};

dfs([]);

console.log(result.map((e) => e.join(" ")).join("\n"));
