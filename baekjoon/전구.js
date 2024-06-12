// https://www.acmicpc.net/problem/21918

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();
inputs = inputs.split("\n").map((input) => input.trim().split(" ").map(Number));

const [n, m] = inputs[0];

let arr = [null, ...inputs[1]];

// 1: i번째 전구의 상태 => x
// 2: l~r까지 전구 상태 변경
// 3: l~r까지 전구 끔
// 4: l~r까지 전구 킴

function solution(a, b, c, arr) {
  if (a === 1) {
    arr[b] = c;
  } else if (a === 2) {
    for (let i = b; i <= c; i++) {
      arr[i] = arr[i] === 1 ? 0 : 1;
    }
  } else if (a === 3) {
    for (let i = b; i <= c; i++) {
      arr[i] = 0;
    }
  } else if (a === 4) {
    for (let i = b; i <= c; i++) {
      arr[i] = 1;
    }
  }

  return arr;
}

for (let i = 2; i < m + 2; i++) {
  const [a, b, c] = inputs[i];
  arr = solution(a, b, c, arr);
}

console.log(arr.slice(1).join(" "));
