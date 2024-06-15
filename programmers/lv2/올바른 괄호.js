// https://school.programmers.co.kr/learn/courses/30/lessons/12909?language=javascript
// * 풀이
// 올바른 괄호면 true 아니면 false

// stack
// 맨 앞이 ) 이거나 맨 마지막이 (라면 false
// s 문자를 순회한다. (i)
// s[i]가 )이고 stack의 맨 마지막 요소가 (라면, stack.pop
// 아니라면 stack.push
// stack에 요소가 있다면 false을 반환, 없다면 true 반환

// 시간복잡도: O(n)

function solution(s) {
  if (s[0] === ")" || s[s.length - 1] === "(") return false;

  const stack = [];

  for (let str of s) {
    if (str === ")" && stack[stack.length - 1] === "(") stack.pop();
    else stack.push(str);
  }

  return stack.length === 0;
}
