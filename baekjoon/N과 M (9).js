// https://www.acmicpc.net/problem/15663

// 사전 순으로 증가
// 중복되는 수열을 여러 번 출력하면 안됨

const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, m] = inputs[0].split(" ").map(Number);
const arr = inputs[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

const checked = new Array(n).fill(false);

let result = [];

// dfs - 재귀
// cnt = m이면 실행 종료

function dfs(nums, cnt) {
  if (cnt === m) {
    result.push(nums.join(" "));
    return;
  }

  for (let i = 0; i < n; i++) {
    if (checked[i]) continue;

    checked[i] = true;
    dfs([...nums, arr[i]], cnt + 1);
    checked[i] = false;
  }
}

dfs([], 0);

result = new Set(result);
result = [...result];

// result.sort(); sort로 했으나 10 3 4 라면 10 3 4가 먼저 출력된다. 그래서 미리 arr를 오름차순으로 정렬해둔다.

console.log(result.join("\n"));
