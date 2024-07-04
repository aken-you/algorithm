// https://school.programmers.co.kr/learn/courses/30/lessons/12924
// 2개로 쪼개는게 가능하다면
//  2*i + 1 = n
// 3개: 3*i + 3
// 4*i + 6

// k개: k*i+(1+2+3+ ... + k-1) = n
function solution(n) {
  let rest = 0;
  let k = 2;
  let result = 1;

  while (n - rest - k > 0) {
    rest += k - 1;

    if ((n - rest) % k === 0) {
      result++;
    }

    k++;
  }

  return result;
}
