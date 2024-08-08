// https://www.acmicpc.net/problem/14719
// * 풀이 (1시간 동안 풀었음)
// 블록 사이에 빗물이 고임
// return 고이는 빗물의 총량
//    빗물이 고이지 않을 경우 0
let inputs = require("fs").readFileSync("/dev/stdin").toString().split("\n");
inputs = inputs.map((input) => input.split(" ").map(Number));

const [h, w] = inputs[0];
const arr = inputs[1];

let result = 0;

// left < w-1라면 아래 과정을 반복
// arr[left]보다 크거나 같은 요소의 index 찾기 (right)
// right를 못찾았다면, left 이후 요소 중 가장 큰 값 찾기 (max)
//  가장 큰 값 = 0, right = w-1;
//  가장 큰 값 = 0이 아니라면, right = left와 가장 가까이 있고 값이 max인 요소의 index
// arr[left]와 arr[right] 중 작은 높이 값 구하기 (minH)
// left+1~right-1까지 빗물의 양 구하기
// left = right; right = null로 갱신

let left = arr.findIndex((e) => e > 0);
let right = null;

while (left < w - 1) {
  // arr[left]보다 크거나 같은 요소의 index 찾기 (right)
  for (let i = left + 1; i < w; i++) {
    if (arr[left] <= arr[i]) {
      right = i;
      break;
    }
  }

  // right를 못찾았다면, left 이후 요소 중 가장 큰 값 찾기 (max)
  if (right === null) {
    const max = Math.max(...arr.slice(left + 1, w));

    // 가장 큰 값 = 0, right = w-1;
    if (max == 0) right = w - 1;
    else {
      // right = left와 가장 가까이 있고 값이 max인 요소의 index
      for (let i = left + 1; i < w; i++) {
        if (arr[i] === max) {
          right = i;
          break;
        }
      }
    }
  }

  // 빗물 양 구하기
  let cnt = 0;

  // arr[left]와 arr[right] 중 작은 높이 값 구하기 (minH)
  const minH = Math.min(arr[left], arr[right]);

  for (let i = left + 1; i < right; i++) {
    cnt += minH - arr[i];
  }

  left = right;
  right = null;

  result += cnt;
}

console.log(result);

// * 다른 풀이
// 블록 사이에 빗물이 고임
// return 고이는 빗물의 총량
//    빗물이 고이지 않을 경우 0
let inputs = require("fs").readFileSync("/dev/stdin").toString().split("\n");
inputs = inputs.map((input) => input.split(" ").map(Number));

const [h, w] = inputs[0];
const arr = inputs[1];

let result = 0;

for (let i = 1; i < w; i++) {
  // 현재 기둥을 포함하여, 왼쪽에서 가장 큰 기둥과 오른쪽에서 가장 큰 기둥 값을 찾는다.
  const leftMax = Math.max(...arr.slice(0, i + 1));
  const rightMax = Math.max(...arr.slice(i));

  const min = Math.min(leftMax, rightMax);

  result += min - arr[i];
}

console.log(result);
