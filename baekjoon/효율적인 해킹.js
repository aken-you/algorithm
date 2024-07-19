// https://www.acmicpc.net/problem/1325
// 한 번의 해킹으로 많은 컴퓨터 해킹
// A -> B 신뢰: B를 해킹 -> A 해킹
// 많이 해킹할 수 있는 컴퓨터 번호를 오름차순으로 나열

// ! 실패
// * 1. bfs

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n").map((input) => input.split(" ").map(Number));

const [n, m] = inputs[0];
inputs.shift();

// graph 생성
const graph = Array.from({ length: n + 1 }, (e) => []);

inputs.forEach(([a, b]) => {
  graph[b].push(a);
});

// bfs
// 모든 노드를 시작점으로 잡아서 탐색해야 할 듯..

const bfs = (graph, start) => {
  const queue = [start];
  const checked = Array(n + 1).fill(false);
  let cnt = 0;

  checked[start] = true;
  cnt++;

  while (queue.length) {
    const node = queue.shift();

    for (let i = 0; i < graph[node].length; i++) {
      const next = graph[node][i];

      if (!checked[next]) {
        queue.push(next);
        checked[next] = true;
        cnt++;
      }
    }
  }

  return cnt;
};

let max = 0;
let result = [];

for (let i = 1; i <= n; i++) {
  const cnt = bfs(graph, i);

  if (cnt > max) {
    max = cnt;
    result = [i];
  } else if (cnt === max) {
    result.push(i);
  }
}

console.log(result.join(" "));

// * 2. dfs - 스택

const dfs = (graph, start) => {
  const stack = [start];
  const checked = Array(n + 1).fill(false);
  let cnt = 1;

  checked[start] = true;

  while (stack.length) {
    const node = stack.pop();

    for (let i = 0; i < graph[node].length; i++) {
      const next = graph[node][i];

      if (!checked[next]) {
        stack.push(next);
        checked[next] = true;
        cnt++;
      }
    }
  }

  return cnt;
};

let max = 0;
let result = [];

for (let i = 1; i <= n; i++) {
  const cnt = dfs(graph, i);

  if (cnt > max) {
    max = cnt;
    result = [i];
  } else if (cnt === max) {
    result.push(i);
  }
}

console.log(result.join(" "));

// * 3. dfs - 재귀
let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n").map((input) => input.split(" ").map(Number));

const [n, m] = inputs[0];
inputs.shift();

// graph 생성
const graph = Array.from({ length: n + 1 }, (e) => []);

inputs.forEach(([a, b]) => {
  graph[b].push(a);
});

// dfs - 재귀
// 모든 노드를 시작점으로 잡아서 탐색해야 할 듯..

let checked = new Array(n + 1).fill(false);
let cnt = 0;
let max = 0;
let result = [];

const dfs = (node) => {
  const next = graph[node];

  for (let i = 0; i < next.length; i++) {
    const adj = next[i];

    if (!checked[adj]) {
      cnt++;
      checked[adj] = true;
      dfs(adj);
    }
  }
};

for (let i = 1; i <= n; i++) {
  cnt = 1;
  checked.fill(false);

  checked[i] = true;
  dfs(i);

  if (cnt > max) {
    max = cnt;
    result = [i];
  } else if (cnt === max) {
    result.push(i);
  }
}

console.log(result.join(" "));
