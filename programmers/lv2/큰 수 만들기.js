// https://school.programmers.co.kr/learn/courses/30/lessons/42883#
// ! 실패 - 맨 처음에 dfs로 풀었더니 시간 초과 뜸
// return "어떤 숫자가에서 k개의 수를 제거했을 때 가장 큰 숫자"

// * stack
// number 순회 (num)
// i <= numbers.length - (k - stack.length)
//  stack에 넣는다.
// stack의 마지막 값과 num 비교
//  stack < num, stack.pop(); stack.push(num);

function solution(number, k) {
  const nums = number.split("");
  const stack = [];

  for (let i = 0; i < number.length; i++) {
    const num = Number(number[i]);

    while (k > 0 && stack[stack.length - 1] < num) {
      stack.pop();
      k--;
    }

    stack.push(num);
  }

  return stack.slice(0, nums.length - k).join("");
}
