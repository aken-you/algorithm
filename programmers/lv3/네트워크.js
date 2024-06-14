// https://school.programmers.co.kr/learn/courses/30/lessons/43162
// * 풀이
// return 네트워크 개수

// 0번 컴퓨터부터 dfs를 돌린다.
// 네트워크 수 1 증가.
// 다 돌린 다음에도 탐색하지 않은 노드가 있다면, 그 노드를 기점으로 dfs를 돌린다.
// dfs를 다 돌릴 때마다 네트워크 수 1 증가

// 모든 노드를 다 방문할때까지 위와 같은 과정을 반복

function dfs(graph, checked, node) {
  checked[node] = true;

  const adjacent = graph[node];

  adjacent.forEach((n) => {
    if (!checked[n]) {
      dfs(graph, checked, n);
    }
  });
}

function solution(n, computers) {
  let cnt = 0;

  // 우선 인접리스트로 노드 관계 정해보자.
  const arr = Array.from({ length: n }, (e) => new Array());

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (computers[i][j] === 1 && i !== j) arr[i].push(j);
    }
  }

  const checked = new Array(n).fill(false);
  let startNode = 0;

  while (startNode !== -1) {
    dfs(arr, checked, startNode);

    startNode = checked.findIndex((e) => e === false);
    cnt++;
  }

  return cnt;
}

// * 다른 풀이 - 문제에서 주어진 computers를 바로 사용하는 방법
function dfs(graph, checked, node) {
  if (checked[node]) return;

  checked[node] = true;

  for (let i = 0; i < graph.length; i++) {
    if (graph[node][i] === 1) dfs(graph, checked, i);
  }
}

function solution(n, computers) {
  let cnt = 0;
  const arr = computers;
  const checked = new Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    if (checked[i]) continue;

    dfs(arr, checked, i);
    cnt++;
  }

  return cnt;
}
