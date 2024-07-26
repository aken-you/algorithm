// https://www.acmicpc.net/problem/11726
// * 풀이
// return 직사각형을 채우는 방법의 수 % 10,007

let n = require("fs").readFileSync("/dev/stdin").toString().trim();
n = Number(n);

const dp = new Array(n + 1);

dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}

console.log(dp[n]);
