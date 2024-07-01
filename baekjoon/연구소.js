// https://www.acmicpc.net/problem/14502
// * 실패
// * 1. bfs

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n").map((input) => input.split(" ").map(Number));

const [n, m] = inputs[0];

const maps = inputs.slice(1);

const empty = [];
const virus = [];

// ! virus랑 empty를 구분하지 않았음
// cases에 0인 곳을 넣고, virus에 2인 곳을 넣는다.
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (maps[i][j] === 2) virus.push([i, j]);
    else if (maps[i][j] === 0) empty.push([i, j]);
  }
}

// 만약 2라면 거기서부터 bfs 돌림
// start를 queue에 넣고 방문 표시.
// 현재 노드와 인접한 노드가 1. 탐색하지 않았고 2. 0이라면 => 2로 바꾼다.
// 모든 노드의 탐색을 마쳤다면, 0인 노드의 개수를 구한다.

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const space = empty.length - 3;

function bfs(graph) {
  // ! queue에 2인 노드들을 모두 넣어줌
  const queue = JSON.parse(JSON.stringify(virus));

  // 새로 전염된 바이러스의 개수
  let virusCnt = 0;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      // ! nx === n, ny === m인 경우도 그래프 범위 벗어남
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      if (graph[nx][ny] === 0) {
        queue.push([nx, ny]);
        graph[nx][ny] = 2;
        virusCnt++;
      }
    }
  }

  return space - virusCnt;
}

let max = 0;

for (let i = 0; i < empty.length - 2; i++) {
  for (let j = i + 1; j < empty.length - 1; j++) {
    for (let k = j + 1; k < empty.length; k++) {
      // ! 깊은 복사 하는 새로운 방법을 알게 됨
      const graph = JSON.parse(JSON.stringify(maps));

      // 새로 벽을 세움
      graph[empty[i][0]][empty[i][1]] = 1;
      graph[empty[j][0]][empty[j][1]] = 1;
      graph[empty[k][0]][empty[k][1]] = 1;

      const cnt = bfs(graph);

      if (cnt > max) {
        max = cnt;
      }
    }
  }
}

console.log(max);

// * 2. dfs
// 새로 세울 수 있는 벽 3개
// 1: 벽
// 2: 바이러스
// 0: 바이러스 퍼질 수 있음

// 바이러스가 퍼질 수 없는 곳: 안전 영역

// return 안전 영역 크기 최댓값

// 모든 영역 중에 3개를 골라서 벽을 세움
// dfs를 돌린 다음, 0인 영역의 개수를 구함
// 영역 개수 > max라면 max = 영역 개수

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n").map((e) => e.split(" ").map(Number));

const [n, m] = inputs[0];

const graph = inputs.slice(1);

const dots = [];
const virus = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (graph[i][j] === 0) dots.push([i, j]);
    else if (graph[i][j] === 2) virus.push([i, j]);
  }
}

const cases = [];

for (let i = 0; i < dots.length - 2; i++) {
  for (let j = i + 1; j < dots.length - 1; j++) {
    for (let k = j + 1; k < dots.length; k++) {
      cases.push([i, j, k]);
    }
  }
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const dotsCnt = dots.length;
let max = 0;

for (let i = 0; i < cases.length; i++) {
  const [first, second, third] = cases[i];

  let newGraph = graph.slice(0).map((arr) => [...arr]);

  newGraph[dots[first][0]][dots[first][1]] = 1;
  newGraph[dots[second][0]][dots[second][1]] = 1;
  newGraph[dots[third][0]][dots[third][1]] = 1;

  const checked = Array.from({ length: n }, () => Array(m).fill(false));
  let cnt = 0;

  // dfs
  const dfs = (node) => {
    const [x, y] = node;

    if (!checked[x][y]) {
      checked[x][y] = true;
      newGraph[x][y] = 2;
      cnt++;
    }

    for (let j = 0; j < 4; j++) {
      const nx = x + dx[j];
      const ny = y + dy[j];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (checked[nx][ny]) continue;
      if (newGraph[nx][ny] === 1) continue;

      dfs([nx, ny]);
    }
  };

  for (let k = 0; k < virus.length; k++) {
    dfs(virus[k]);
  }

  let result = dotsCnt - 3 - cnt + virus.length;

  if (result > max) {
    max = result;
  }
}

console.log(max);
