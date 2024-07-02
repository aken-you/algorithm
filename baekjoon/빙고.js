// https://www.acmicpc.net/problem/2578
// * 내 풀이
// return 사회자가 몇 번째 수를 부른 후 철수가 빙고를 외치게 되는지

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();
inputs = inputs.split("\n").map((e) => e.split(" ").map(Number));

const bingo = inputs.slice(0, 5);
const numbers = [];

inputs.slice(5).forEach((arr) => {
  arr.forEach((e) => {
    numbers.push(e);
  });
});

// 가로, 세로, 대각선 => 빙고
const check = (checked) => {
  let cnt = 0;

  for (let i = 0; i < 5; i++) {
    let row = true;
    let col = true;

    for (let j = 0; j < 5; j++) {
      if (!checked[i][j]) {
        row = false;
      }
      if (!checked[j][i]) {
        col = false;
      }
    }

    if (row) cnt++;
    if (col) cnt++;
  }

  let flag1 = true;
  let flag2 = true;

  for (let i = 0; i < 5; i++) {
    if (!checked[i][i]) {
      flag1 = false;
    }

    if (!checked[i][4 - i]) {
      flag2 = false;
    }
  }

  if (flag1) cnt++;
  if (flag2) cnt++;

  return cnt;
};

const checked = Array.from({ length: 5 }, () => Array(5).fill(false));
let result = 0;

for (let idx = 0; idx < numbers.length; idx++) {
  const num = numbers[idx];

  let x = null;
  let y = null;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (bingo[i][j] === num) {
        x = i;
        y = j;
        break;
      }
    }

    if (x !== null && y !== null) break;
  }

  if (x !== null && y !== null) checked[x][y] = true;

  const cnt = check(checked);

  if (cnt >= 3) {
    result = idx + 1;
    break;
  }
}

console.log(result);
