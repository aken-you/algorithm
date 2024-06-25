// https://www.acmicpc.net/problem/11725

// * 내 풀이
// 트리 루트 = 1
// 각 노드의 부모를 구하기

// 인접 리스트를 만들자
let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n");

const n = Number(inputs[0]);

inputs = inputs.slice(1).map((e) => e.split(" ").map(Number));

const graph = Array.from({ length: n + 1 }, () => []);

for (let input of inputs) {
  const [from, to] = input;

  graph[from].push(to);
  graph[to].push(from);
}

const parent = new Array(n + 1);
// DFS
// start = 1
// stack의 맨 마지막 요소를 꺼내서, 그 요소와 근접한 요소들을 탐색한다.
// 인접한 요소가 아직 탐색하지 않은 요소라면
//    parent[인접한 요소] = 현재 탐색 중인 요소
//    stack.push(인접한 요소)

function DFS() {
  const stack = [1];

  while (stack.length > 0) {
    const current = stack.pop();

    graph[current].forEach((node) => {
      if (!parent[node]) {
        parent[node] = current;
        stack.push(node);
      }
    });
  }
}

DFS();

console.log(parent.slice(2).join("\n"));
