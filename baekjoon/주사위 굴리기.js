// https://www.acmicpc.net/problem/14499
// ! 실패

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();
inputs = inputs.split("\n").map((str) => str.split(" ").map(Number));

const [n, m, ix, iy, k] = inputs[0];

// 동, 서, 북, 남
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

// 지도 칸 수가 0: 주사위 바닥 면 -> 지도
// 0 x: 지도 -> 주사위 바닥 면, 지도 칸: 0
// 주사위는 지도의 바깥으로 이동시킬 수 없다

let dic = new Array(6).fill(0); // 주사위: [bottom, front, left, right, back, top]
let [x, y] = [ix, iy]; // 주사위 위치
const map = inputs.slice(1, n + 1); // 지도

// 0: bottom, 1: front, 2: left, 3: right, 4: back, 5: top
//   1
// 2 0 3
//   4
//   5

// * 주사위 상태 업데이트 잘못함
const move = (direction) => {
  const [bottom, front, left, right, back, top] = [...dic];

  switch (direction) {
    case 1: // 동쪽
      dic = [right, front, bottom, top, back, left];
      break;
    case 2: // 서쪽
      dic = [left, front, top, bottom, back, right];
      break;
    case 3: // 북쪽
      dic = [back, bottom, left, right, top, front];
      break;
    case 4: // 남쪽
      dic = [front, top, left, right, bottom, back];
      break;
  }
};

const changeDic = (direction) => {
  // 주사위가 이동한 위치
  const nx = x + dx[direction - 1];
  const ny = y + dy[direction - 1];

  // 주사위는 지도의 바깥으로 이동시킬 수 없다
  if (nx < 0 || nx >= n || ny < 0 || ny >= m) return;

  // 이동한 후 주사위 상태 변경
  move(direction);

  const bottom = dic[0]; // 주사위 바닥면

  // 지도 칸 수가 0: 주사위 바닥 면 -> 지도
  if (map[nx][ny] === 0) {
    map[nx][ny] = bottom;
  } else {
    // 0 x: 지도 -> 주사위 바닥 면, 지도 칸: 0
    dic[0] = map[nx][ny];
    map[nx][ny] = 0;
  }

  // 주사위 위치 업데이트
  x = nx;
  y = ny;

  // 주사위 상단 출력
  const top = dic[5];
  console.log(top);
};

const directions = inputs.at(-1);

for (let d of directions) {
  changeDic(d);
}
