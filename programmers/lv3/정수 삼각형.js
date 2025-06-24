// https://school.programmers.co.kr/learn/courses/30/lessons/43105
// !실패

// * dp
// return 거쳐간 숫자의 최댓값

// 0~triangle.length - 1 순회(i)
// const arr = triangle[i]

// arr 순회 (j)
// triangle[i+1][j], triangle[i+1][j+1] 탐색
// 숫자 더하기

function solution(triangle) {
  const sumT = Array.from({ length: triangle.length }, (e, i) => [
    ...triangle[i],
  ]);

  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      const left = triangle[i - 1][j - 1] ?? 0;
      const right = triangle[i - 1][j] ?? 0;

      if (left >= right) {
        triangle[i][j] += left;
      } else {
        triangle[i][j] += right;
      }
    }
  }

  return Math.max(...triangle[triangle.length - 1]);
}

// 실패한 내 코드 - 시간초과
// 시간복잡도: O(2^n) - 재귀로 모든 경로를 탐색하기 때문

function solution(triangle) {
  let max = 0;

  function start(current, sum) {
    const [x, y] = current;

    if (x === triangle.length - 1) {
      max = Math.max(sum, max);
      return;
    }

    const arr = triangle[x];

    start([x + 1, y], sum + triangle[x + 1][y]);
    start([x + 1, y + 1], sum + triangle[x + 1][y + 1]);
  }

  start([0, 0], triangle[0][0]);

  return max;
}
