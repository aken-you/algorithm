// https://school.programmers.co.kr/learn/courses/30/lessons/12914
// * 틀린 내 풀이
// 한 번에 1칸 or 2칸
// return 끝에 도달하는 경우의 수 % 1234567

function factorial(n) {
  if (n === 0) return 1;

  let result = 1;
  let num = 1;

  while (num <= n) {
    result *= num;
    num++;
  }

  return result;
}

function combination(a, b) {
  if (b === 0 || a === b) return 1;
  return factorial(a) / (factorial(b) * factorial(a - b));
}

// 2의 갯수는 1개씩 늘어나고, 2가 위치할 경우의 수는 1씩 줄어든다.
// b가 Math.floor(n/2)일때까지 반복

function solution(n) {
  let result = 0;
  let a = n;
  let b = 0;

  while (2 * b <= n) {
    result += combination(a, b);

    a -= 1;
    b += 1;
  }

  return result % 1234567;
}

// * 다른 풀이 - DP
// return 경우의 수 % 1234567
// 1 - 1
// 2 - 1+1,2
// 3
//  1의 경우에서 끝에 +2하기: 1+2
//  2의 경우에서 끝에 +1하기: 1+1+1, 2+1
// 4
//  2의 경우에서 끝에 +2하기: 1+1+2, 2+2
//  3의 경우에서 끝에 +1하기: 1+2+1, 1+1+1+1, 2+1+1

function solution(n) {
  // dp
  const dp = new Array(n + 1).fill(0);

  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 1234567;
  }

  return dp[n];
}
