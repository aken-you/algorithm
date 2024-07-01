// https://school.programmers.co.kr/learn/courses/30/lessons/131701
// * 내 풀이
// 원형 수열의 연속하는 부분 수열의 합으로 만들 수 있는 경우의 수

// 누적합
function solution(elements) {
  const answer = new Set(elements);
  const n = elements.length;

  const ele = [...elements, ...elements];
  const sums = new Array(ele.length).fill(0);

  sums[0] = ele[0];

  for (let i = 1; i < ele.length; i++) {
    sums[i] = sums[i - 1] + ele[i];
  }

  // 2~n까지 순회 (i)
  // i-1 ~ n+i-1까지 순회 j
  // j === i-1이라면 answer.add(sums[j] );
  // j !== i-1이라면 answer.add(sums[j] - sums[j-i]);

  for (let i = 2; i <= n; i++) {
    for (let j = i - 1; j < n + i; j++) {
      if (j === i - 1) answer.add(sums[j]);
      else answer.add(sums[j] - sums[j - i]);
    }
  }

  return answer.size;
}
