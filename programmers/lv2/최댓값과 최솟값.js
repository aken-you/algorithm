// https://school.programmers.co.kr/learn/courses/30/lessons/12939
// * 내 풀이
// "최소값 최대값"

function solution(s) {
  const arr = s.split(" ").map(Number);

  const min = Math.min(...arr);
  const max = Math.max(...arr);

  return `${min} ${max}`;
}
