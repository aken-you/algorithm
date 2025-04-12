// https://www.acmicpc.net/problem/3020
// !실패 - 아이디어를 생각하지 못함

// binary search
// lower bound: K 이상의 값이 처음 나오는 인덱스를 반환
// upper bound: K 초과의 값이 처음 나오는 인덱스를 반환

const inputs = require("fs")
  .readFileSync("./dev/stdin")
  .toString()
  .trim()
  .split("\n");

// 길이 N, 높이 H
const [N, H] = inputs[0].split(" ").map(Number);

// 높이 7
// 석순: [1,3,5], 종유순: [5,3,1] = [1,3,5]
// 2구간을 지나친다고 가정
// 부딪히는 석순 수: 석순 총 개수 - 2보다 같거나 큰 석순 수
// 부딪히는 종유석 수: 종유석 총 개수 - (7-2 = 5)보다 큰 종유석 수
// K구간을 지날 때 부딪히는 석순 수: 석순의 총 개수 - lowerBound(석순, K)
// K구간을 지날 때 부딪히는 종유석 수: 종유석의 총 개수 - upperBound(종유석, H-K)

// 석순
const lower = inputs
  .slice(1, N + 1)
  .filter((_, i) => i % 2 === 0)
  .map(Number)
  .sort((a, b) => a - b);
// 종유석
const upper = inputs
  .slice(1, N + 1)
  .filter((_, i) => i % 2 === 1)
  .map(Number)
  .sort((a, b) => a - b);

// lower bound: K 이상의 값이 처음 나오는 인덱스를 반환
function lowerBound(arr, target) {
  let start = 0;
  let end = arr.length;

  // start = end이면, target 이상의 값이 처음 나오는 인덱스가 됨
  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] < target) {
      start = mid + 1; // 오른쪽 탐색
    } else {
      end = mid;
    }
  }

  return start;
}

// upper bound: K 초과의 값이 처음 나오는 인덱스를 반환
function upperBound(arr, target) {
  let start = 0;
  let end = arr.length;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] <= target) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }

  return end;
}

// K구간을 지날 때 부딪히는 석순 수: 석순의 총 개수 - lowerBound(석순, K)
// K구간을 지날 때 부딪히는 종유석 수: 종유석의 총 개수 - upperBound(종유석, H-K)

let min = -1;
let cnt = 0;

for (let k = 1; k <= H; k++) {
  const crashedCnt =
    lower.length -
    lowerBound(lower, k) +
    upper.length -
    upperBound(upper, H - k);

  if (min === -1 || min >= crashedCnt) {
    cnt = min === crashedCnt ? cnt + 1 : 1;
    min = crashedCnt;
  }
}

console.log(min, cnt);

// ! 틀린 코드 (시간초과)
// const cnt = new Array(H).fill(0);

// // i가 홀수: 석순, 짝수: 종유석
// for (let i = 1; i <= N; i++) {
//   const len = Number(inputs[i]);

//   // 석순
//   if (i % 2 === 1) {
//     for (let j = 0; j < len; j++) cnt[j] += 1;
//   } else {
//     // 종유석
//     for (let j = H - 1; j >= H - len; j--) cnt[j] += 1;
//   }
// }

// // 장애물 최솟값인 높이 찾기

// const min = Math.min(...cnt);
// const totalCnt = cnt.filter((e) => e === min).length;

// console.log(min + " " + totalCnt);
