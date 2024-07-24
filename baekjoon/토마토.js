// https://www.acmicpc.net/problem/7576
// * 풀이 - bfs (1시간만에 겨우 풀었음)
// return 토마토가 모두 익게 되는 최소 일수
//    모두 익지 못하는 상황일 경우 -1
//    이미 다 익어있다면 0 출력
// m: 가로, n: 세로
// 보관 후 하루 지나면 인접한 토마토가 익음

// 1: 익음
// 0: 익지 x
// -1: 토마토 x

// 그래프 확인
// 맨 처음 익은 토마토의 위치를 확인
// 1 또는 -1로만 이뤄져 있다면 0 출력

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n").map((input) => input.trim().split(" ").map(Number));

const [m, n] = inputs[0];

const graph = inputs.slice(1);
const dis = Array.from({ length: n }, () => new Array(m).fill(null));

function solution() {
  const first = [];
  let cnt = 0;

  // 1,000,000
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] === 1) first.push([i, j]);
      else if (graph[i][j] === 0) cnt += 1;
    }
  }

  if (cnt === 0 && first.length > 0) {
    console.log(0);
    return;
  }

  // ! 탐색 시작점이 여러개일 경우, 모든 시작점들을 queue에 넣으면 된다.
  bfs(first);

  let result = 0;

  // 천만
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] === 0 && dis[i][j] === null) {
        result = -1;
        break;
      }

      result = Math.max(result, dis[i][j]);
    }

    if (result === -1) {
      break;
    }
  }

  console.log(result);
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

// bfs
// 현재 노드와 인접한 노드를 확인
//    0이고 방문하지 않았다면, 거리를 체크하고 queue에 넣는다.

// 탐색을 마친 후에 거리를 저장하는 배열 확인
//    만약 0이고 체크하지 못한 노드가 있다면 -1 출력

function bfs(arr) {
  const queue = [...arr];

  for (let i = 0; i < arr.length; i++) {
    dis[arr[i][0]][arr[i][1]] = 0;
  }

  // ! idx로 queue를 탐색하면 queue.shift()보다 시간이 줄어든다.
  let idx = 0;

  while (idx < queue.length) {
    const [x, y] = queue[idx];
    idx += 1;

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + x;
      const ny = dy[i] + y;

      // * 범위 확인
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      // * 벽이거나 이미 익었거나 이미 방문한 경우
      if (graph[nx][ny] === -1 || graph[nx][ny] === 1 || dis[nx][ny] !== null)
        continue;

      // * 아직 안익었고 방문하지 않은 경우
      const distance = dis[x][y] + 1;

      dis[nx][ny] = distance;
      queue.push([nx, ny]);
    }
  }
}

solution();
