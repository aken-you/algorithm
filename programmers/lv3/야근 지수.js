// https://school.programmers.co.kr/learn/courses/30/lessons/12927
// !실패

function solution(n, works) {
  // n이 남은 작업량보다 클 경우, 피로도는 0
  if (n >= works.reduce((acc, curr) => acc + curr, 0)) return 0;

  const sorted = works.sort((a, b) => b - a);

  while (n) {
    const maxNum = sorted[0]; // 최댓값으로 고정

    for (let i = 0; i < sorted.length; i++) {
      // 최댓값보다 크다면 1 차감 => sorted의 최댓값은 항상 맨 앞에 위치
      if (sorted[i] >= maxNum) {
        n -= 1;
        sorted[i] -= 1;
      }

      if (n === 0) break;
    }
  }

  return sorted.reduce((acc, curr) => acc + curr * curr, 0);
}
