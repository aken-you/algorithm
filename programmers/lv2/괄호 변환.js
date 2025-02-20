// https://school.programmers.co.kr/learn/courses/30/lessons/60058
// ! 실패 - 재귀로 풀 생각을 전혀 못했음

function balanceCheck(s) {
  let check = 0;

  for (let i of s) {
    if (i === "(") {
      check++;
    } else {
      check--;
    }
  }

  return check === 0;
}

function collectCheck(s) {
  let result = true;
  let stack = [];

  for (let str of s) {
    if (str === "(") {
      stack.push(str);
      continue;
    }

    if (stack.length > 0) stack.pop();
    else return false;
  }

  return stack.length === 0;
}

function solution(p) {
  // 1
  if (p.length === 0 || collectCheck(p)) {
    return p;
  }

  let u = "";
  let v = "";

  // 2
  for (let i = 2; i <= p.length; i += 2) {
    u = p.slice(0, i);
    v = p.slice(i);

    if (balanceCheck(u)) {
      break;
    }
  }

  // 3
  if (collectCheck(u)) {
    return u + solution(v);
  }

  // 4

  // 4-1 ~ 4-3
  let result = "(" + solution(v) + ")";

  // 4-4
  u = u.slice(1, u.length - 1);
  u = [...u].map((e) => (e === "(" ? ")" : "(")).join("");

  // 4-5
  return result + u;
}
