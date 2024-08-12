// https://school.programmers.co.kr/learn/courses/30/lessons/131704
// * 풀이
// 크기 동일
// 1~n 순서대로 이동
// 보조 컨테이너 => stack
// 맨 앞의 상자만 뺄 수 있음
// return 몇 개 상자 실을 수 있는지
// 일반 컨테이너 => origin

// idx: queue의 맨 앞 요소
// order 순회 (current)

// 아래 과정 반복
// stack의 마지막 요소 === current
//  stack.pop()
//  result += 1;
// origin의 마지막 요소 === current
//  origin.pop();
//  result += 1;
// 위의 두 케이스가 아닐 경우,
//  stack.push(origin.pop());

function solution(order) {
  let result = 0;
  const n = order.length;
  const origin = Array.from({ length: n }, (e, idx) => n - idx);

  const stack = [];

  for (let i = 0; i < order.length; i++) {
    const current = order[i];

    while (stack.length <= n && origin.length >= 0) {
      if (stack[stack.length - 1] === current) {
        stack.pop();
        result += 1;
        break;
      }

      if (origin[origin.length - 1] === current) {
        origin.pop();
        result += 1;
        break;
      }

      stack.push(origin.pop());
    }
  }

  return result;
}
