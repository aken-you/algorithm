// https://www.acmicpc.net/problem/2839
// * 풀이
// 3, 5
// return 최소 봉지 수

let input = require("fs").readFileSync("/dev/stdin").toString();

const n = Number(input);
const arr = Array(n + 1).fill(-1);

const dfs = (num, cnt) => {
  if (num >= n) {
    if (num > n) return;

    if (arr[num] === -1) arr[num] = cnt;
    else if (cnt < arr[num]) arr[num] = cnt;

    return;
  }

  if (arr[num + 3] === -1 || arr[num + 3] > cnt + 1) {
    arr[num + 3] = cnt + 1;
    dfs(num + 3, cnt + 1);
  }

  if (arr[num + 5] === -1 || arr[num + 5] > cnt + 1) {
    arr[num + 5] = cnt + 1;
    dfs(num + 5, cnt + 1);
  }
};

dfs(0, 0);

console.log(arr[n]);

// * 다른 풀이
let input = require("fs").readFileSync("/dev/stdin").toString();

const n = Number(input);

let result = Math.floor(n / 5);
let rest = n % 5;

while (result > 0) {
  if (rest % 3 === 0) {
    break;
  }

  result -= 1;
  rest += 5;
}

if (rest % 3 === 0) {
  console.log(result + Math.floor(rest / 3));
} else {
  console.log(-1);
}
