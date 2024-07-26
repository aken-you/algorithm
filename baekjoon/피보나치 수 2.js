// https://www.acmicpc.net/problem/2748
// ! 실패
// 피보나치 수열에서 n번째의 수가 js가 표현할 수 있는 수를 넘어설 수 있음
// => BigInt 사용

let n = require("fs").readFileSync("/dev/stdin").toString().trim();
n = Number(n);

const fibo = new Array(n + 1);

fibo[0] = 0;
fibo[1] = 1;

for (let i = 2; i <= n; i++) {
  fibo[i] = BigInt(fibo[i - 1]) + BigInt(fibo[i - 2]);
}

// BigInt 숫자를 문자열로 변환할 때, BigInt 숫자 끝에 n이 제거
// toString을 사용하면 n을 제거하고 숫자만 문자열로 바꿔줌
console.log(fibo[n].toString());
