// https://www.acmicpc.net/problem/11659

// * 내 풀이 - 시간 초과
// 수의 개수: n
// 합을 구해야 하는 횟수: m
// 두번째 줄부터 i ~ j번째 수까지의 합

// 시간 복잡도: O(n * m) => O(100000 * 100000) = O(100억) = 100초
const fs = require("fs");
let inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
inputs = inputs.map((input) => input.trim().split(" ").map(Number));

const n = inputs[0][0];
const m = inputs[0][1];

let result = "";

for (let idx = 2; idx < 2 + m; idx++) {
  const [i, j] = inputs[idx];

  let sum = 0;

  inputs[1].forEach((e, idx) => {
    if (idx >= i - 1 && idx <= j - 1) {
      sum += e;
    }
  });

  if (idx === 2) result += `${sum}`;
  else result += `\n${sum}`;
}

console.log(result);

// * 해답: 누적합
// 시간복잡도: O(n + m)
const fs = require("fs");
let inputs = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
inputs = inputs.map((input) => input.trim().split(" ").map(Number));

const n = inputs[0][0];
const m = inputs[0][1];
const arr = inputs[1];

let result = "";
const sum = new Array(n + 1).fill(0);

// 누적합
for (let idx = 1; idx <= arr.length; idx++) {
  sum[idx] = sum[idx - 1] + arr[idx - 1];
}

for (let idx = 2; idx < m + 2; idx++) {
  const [i, j] = inputs[idx];

  if (result.length === 0) result += `${sum[j] - sum[i - 1]}`;
  else result += `\n${sum[j] - sum[i - 1]}`;
}
