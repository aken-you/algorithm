// https://www.acmicpc.net/problem/17298
// * 못 풀었음
let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n");

const n = Number(inputs[0]);

const arr = inputs[1].split(" ").map(Number);

const result = new Array(n).fill(-1);
const stack = [];

// ! 맨 뒤 요소부터 탐색해야 한다!
// stack의 맨 마지막 요소 <= arr[i] 이라면
//  stack.pop();
// 위 과정을 (stack에 요소 존재 && stack의 맨 마지막 요소 <= arr[i])라면 반복
// stack에 요소가 없다면 -1
// stack의 맨 마지막 요소 > arr[i]이라면, result[i] = stack[stack.length - 1]
// stack에 arr[i] 넣기

for (let i = n - 1; i >= 0; i--) {
  // for 문과 상관없이 시간복잡도: O(n) - stack에는 최대 n개의 요소가 들어갈 수 있어서
  while (stack.length > 0 && stack[stack.length - 1] <= arr[i]) {
    stack.pop();
  }

  if (stack.length === 0) {
    result[i] = -1;
  } else {
    result[i] = stack[stack.length - 1];
  }

  stack.push(arr[i]);
}

console.log(result.join(" "));
