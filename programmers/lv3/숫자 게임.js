// https://school.programmers.co.kr/learn/courses/30/lessons/12987

// N명씩 팀
// return B팀이 얻을 수 있는 최대 승점

// A 7 5 3 1
// B 8 6 2 2

// A, B 오름차순으로 정렬
// A[aI] < B[bI]면, 이김 => aI += 1, bI += 1
// 아니면, aI += 1
function solution(A, B) {
  let answer = 0;

  let aI = 0;
  let bI = 0;

  A.sort((a, b) => b - a);
  B.sort((a, b) => b - a);

  while (bI < B.length && aI < A.length) {
    if (A[aI] < B[bI]) {
      aI += 1;
      bI += 1;
      answer += 1;
    } else {
      aI += 1;
    }
  }

  return answer;
}
