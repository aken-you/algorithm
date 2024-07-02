// https://school.programmers.co.kr/learn/courses/30/lessons/12941
// * 내 풀이
// 길이 같은 배열 A B
// 자연수로 이뤄짐

// A는 오름차순, B는 내림차순
function solution(A, B) {
  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);

  return A.reduce((acc, curr, idx) => {
    return acc + curr * B[idx];
  }, 0);
}
