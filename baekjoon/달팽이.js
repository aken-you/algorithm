// https://www.acmicpc.net/problem/1913
// * 못 풀었음
// 위로 1칸, 오른쪽 1칸, 아래 2칸, 왼쪽 2칸, 위로 3칸, 오른쪽 3칸, ...
// -> 두번 방향을 전환할 때마다 이동하는 칸의 수가 1씩 증가한다.

// 위, 오른쪽, 아래, 왼쪽
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let inputs = require("fs").readFileSync("../practic.txt").toString().trim();
inputs = inputs.split("\n").map(Number);

const [n, number] = inputs;

const k = Math.floor((n - 1) / 2);
let currentR = k; // 현재 행
let currentC = k; // 현재 열
const result = Array.from({ length: n }, () => new Array(n).fill(null));

let currentDirection = 0; // 방향
let distance = 0; // 현재 방향에서 이동 횟수
let max = 1; // 현재 방향에서 최대 이동 횟수
let directionChange = 0; // 방향 전환

for (let i = 1; i <= n * n; i++) {
  result[currentR][currentC] = i;

  // 위치 이동
  currentR += dx[currentDirection % 4];
  currentC += dy[currentDirection % 4];
  distance++;

  // 이동 횟수가 최대 이동 횟수와 같다면
  //  방향 전환
  //  방향 전환 횟수 1 증가
  //  현재 방향에서 이동 횟수 0으로 초기화
  if (distance === max) {
    currentDirection++;
    directionChange++;
    distance = 0;
  }

  // 방향 전환 횟수가 2번이라면
  //  최대 이동 횟수 1 증가
  //  방향 전환 횟수 0으로 초기화
  if (directionChange === 2) {
    max++;
    directionChange = 0;
  }
}

console.log(result.map((row) => row.join(" ")).join("\n"));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (result[i][j] === number) {
      console.log(i + 1, " ", j + 1);
      break;
    }
  }
}
