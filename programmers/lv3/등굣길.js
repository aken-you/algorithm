// https://school.programmers.co.kr/learn/courses/30/lessons/42898
// !실패 - 효율성

// dfs로 풀었으나 시간 초과 발생
// 오른쪽, 아래로만 이동 가능 => 모든 경우는 오른쪽으로 m-1, 아래로 n-1 이동 => 모든 길이 최단 경로
// 현재 칸의 경우의 수 = 왼쪽 경우의 수 + 위쪽 경우의 수

function solution(m, n, puddles) {
  var answer = 0;
  let min;

  const dp = Array.from({ length: n }, () => new Array(m).fill(1));

  puddles.forEach(([y, x]) => {
    if (x === 1) {
      for (let i = x; i < n; i++) {
        dp[i][0] = 0;
      }
    }

    if (y === 1) {
      for (let i = y; i < m; i++) {
        dp[0][i] = 0;
      }
    }

    dp[x - 1][y - 1] = 0;
  });

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (dp[i][j] === 0) continue;

      dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000007;
    }
  }

  return dp[n - 1][m - 1];
}
