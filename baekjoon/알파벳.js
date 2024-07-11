// https://www.acmicpc.net/problem/1987
// * 내 풀이
// return 지날 수 있는 최대 칸 수
// 새로 이동한 칸 알파벳 != 지금까지 지나온 모든 칸 알파벳

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();
inputs = inputs.split("\n");

const [r, c] = inputs[0].split(" ").map(Number);

const graph = inputs.slice(1).map((e) => e.split(""));

// 알파벳 방문 체크
const alphabet = {};

graph.flat().forEach((e) => (alphabet[e] = false));

const checked = Array.from({ length: r }, () => Array(c).fill(false));

// dfs - 재귀
// 시작 노드는 [0,0];

// 현재 노드와 인접한 노드들 순회
//    만약 방문하지 않은 노드이고 방문하지 않은 알파벳이라면
//        방문 true로 표시
//        알파벳 방문 true로 표시
//        dfs 재귀 호출 (cnt++하고 인접한 노드 위치 전달)
//        방문 false로 표시
//        알파벳 방문 false로 표시

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
let max = 0;

const dfs = (node, cnt) => {
  const [x, y] = node;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= r || ny >= c) continue;
    if (checked[nx][ny]) continue;
    if (alphabet[graph[nx][ny]]) continue;

    checked[nx][ny] = true;
    alphabet[graph[nx][ny]] = true;

    dfs([nx, ny], cnt + 1);

    checked[nx][ny] = false;
    alphabet[graph[nx][ny]] = false;
  }

  if (cnt > max) max = cnt;
};

checked[0][0] = true;
alphabet[graph[0][0]] = true;
dfs([0, 0], 1);

console.log(max);

// * 다른 풀이 - 굳이 방문 표시를 하는 배열이 2개 있을 필요는 x
// 알파벳 방문 여부만으로도 충분히 가능
const dfs = (node, cnt) => {
  const [x, y] = node;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= r || ny >= c) continue;
    if (alphabet[graph[nx][ny]]) continue;

    alphabet[graph[nx][ny]] = true;

    dfs([nx, ny], cnt + 1);

    alphabet[graph[nx][ny]] = false;
  }

  if (cnt > max) max = cnt;
};

alphabet[graph[0][0]] = true;
dfs([0, 0], 1);

console.log(max);
