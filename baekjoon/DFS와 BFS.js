// https://www.acmicpc.net/problem/1260
// * 내 풀이
// 방문할 수 있는 정점이 여러개인 경우 정점 번호가 작은 것부터 방문

let inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

inputs = inputs.map((input) => input.split(" ").map(Number));

const [n, m, v] = inputs[0];

const graph = Array.from({ length: n + 1 }, (e) => new Array());

inputs.slice(1).forEach((arr) => {
  const [from, to] = arr;

  graph[from].push(to);
  graph[to].push(from);
});

graph.forEach((arr) => arr.sort((a, b) => a - b));

const dfs = (start) => {
  const willCheck = [start];
  const checked = [];

  while (willCheck.length > 0) {
    const current = willCheck.pop();

    if (checked.includes(current)) continue;

    checked.push(current);

    [...graph[current]].reverse().forEach((node) => {
      if (!checked.includes(node)) {
        willCheck.push(node);
      }
    });
  }

  return checked;
};

const dfsResult = dfs(v);

console.log(dfsResult.join(" "));

const bfs = (start) => {
  const willCheck = [start];
  const checked = [];

  graph.forEach((arr) => arr.sort((a, b) => a - b));

  while (willCheck.length > 0) {
    const current = willCheck.shift();

    if (checked.includes(current)) continue;

    checked.push(current);

    graph[current].forEach((node) => {
      if (!checked.includes(node)) {
        willCheck.push(node);
      }
    });
  }

  return checked;
};

const bfsResult = bfs(v);

console.log(bfsResult.join(" "));

// dfs 재귀 버전
const dfsR = (start, visited) => {
  visited[start] = true;

  dfsResult.push(start);

  graph[start].forEach((node) => {
    if (!visited[node]) {
      dfs(node, visited);
    }
  });
};

dfsR(v, new Array(n + 1).fill(false));
