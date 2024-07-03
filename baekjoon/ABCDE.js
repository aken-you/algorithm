// https://www.acmicpc.net/problem/13023
// ! 실패

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n").map((input) => input.split(" ").map(Number));

const [n, m] = inputs[0];

inputs = inputs.slice(1);

const graph = Array.from({ length: n }, () => []);

// 친구 관계는 방향성 x
inputs.forEach(([from, to]) => {
  graph[from].push(to);
  graph[to].push(from);
});

let result = 0;
const checked = Array(n).fill(false);

const dfs = (node, depth) => {
  if (result === 1) return;

  checked[node] = true;

  if (depth === 4) {
    result = 1;
    return;
  }

  graph[node].forEach((next) => {
    if (checked[next]) return;

    dfs(next, depth + 1);
  });

  checked[node] = false;
};

for (let i = 0; i < n; i++) {
  dfs(i, 0);

  if (result === 1) break;
}
