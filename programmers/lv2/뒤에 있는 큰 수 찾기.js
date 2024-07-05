// https://school.programmers.co.kr/learn/courses/30/lessons/154539
// * 내 풀이
// ! 백준 - 오큰수랑 같은 문제
// 자신 > 뒤에 있는 숫자 이면서 가장 가까이 있는 수

// stack이 비어있다면, -1
// 현재 숫자 < stack 맨 마지막 숫자,
//  answer[i] = stack 맨 마지막 숫자
//  stack.push(현재 숫자)
// 현재 숫자 >= stack 맨 마지막 숫자, stack.pop();

function solution(numbers) {
  const n = numbers.length;
  var answer = new Array(n);
  const stack = [numbers[n - 1]];

  answer[n - 1] = -1;

  for (let i = n - 2; i >= 0; i--) {
    const current = numbers[i];

    while (true) {
      const last = stack[stack.length - 1];

      if (current < last) {
        answer[i] = last;
        stack.push(current);
        break;
      }

      if (stack.length === 0) {
        answer[i] = -1;
        stack.push(current);
        break;
      }

      stack.pop();
    }
  }

  return answer;
}
