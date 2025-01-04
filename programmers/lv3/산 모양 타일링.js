// https://school.programmers.co.kr/learn/courses/30/lessons/258705
// !실패
// tops[0] = 0이라면
// dp1[0] = 2, dp2[0] = 1;

// tops[0] = 1이라면
// dp1[0] = 3, dp2[0] = 1;

// tops 순회
// tops[i+1]가 1이라면,
//  dp1[i+1] = dp1[i] * 3 + dp2[i] * 2
//  dp2[i+1] = dp1[i] + dp2[i]
// tops[i]가 0이라면,
//  dp1[i+1] = dp1[i] * 2 + dp2[i]
//  dp2[i+1] = dp1[i] + dp2[i]

function solution(n, tops) {
  const dp1 = Array.from({ length: n }, () => 0);
  const dp2 = Array.from({ length: n }, () => 0);

  const mock = 10007;

  if (tops[0] === 1) {
    dp1[0] = 3;
    dp2[0] = 1;
  } else {
    dp1[0] = 2;
    dp2[0] = 1;
  }

  for (let i = 1; i < n; i++) {
    if (tops[i] === 1) {
      dp1[i] = (dp1[i - 1] * 3 + dp2[i - 1] * 2) % mock;
      dp2[i] = (dp1[i - 1] + dp2[i - 1]) % mock;
    } else {
      dp1[i] = (dp1[i - 1] * 2 + dp2[i - 1]) % mock;
      dp2[i] = (dp1[i - 1] + dp2[i - 1]) % mock;
    }
  }

  return (dp1[n - 1] + dp2[n - 1]) % mock;
}
