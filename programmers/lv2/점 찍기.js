// ! 실패 - 시간초과
// https://school.programmers.co.kr/learn/courses/30/lessons/140107

function solution(k, d) {
  let result = 0;

  for (let a = 0; a <= d; a += k) {
    const maxY = Math.floor(Math.floor((d * d - a * a) ** 0.5) / k);

    result += maxY + 1; // 0 ~ maxY까지의 개수
  }

  return result;
}
