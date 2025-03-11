// https://school.programmers.co.kr/learn/courses/30/lessons/67257
// ! 실패

// 결과가 음수라면 절댓값으로 변환
// return 가장 큰 상금 금액

function calculate(op, a, b) {
  if (op === "+") return a + b;
  else if (op === "-") return a - b;

  return a * b;
}

function solution(expression) {
  var answer = 0;

  const operators = []; // expression에 존재하는 연산자들

  if (expression.includes("-")) operators.push("-");
  if (expression.includes("+")) operators.push("+");
  if (expression.includes("*")) operators.push("*");

  // dfs로 연산자의 우선순위 경우의 수 구하기
  const cases = [];

  const dfs = (arr) => {
    if (arr.length === operators.length) {
      cases.push(arr);
      return;
    }

    for (let i = 0; i < operators.length; i++) {
      const op = operators[i];

      if (arr.includes(op)) continue;
      dfs([...arr, op]);
    }
  };

  dfs([]);

  // 모든 경우의 수를 고려하여 계산
  for (let priority of cases) {
    // nums.length = ops.length + 1
    // nums[0]과 nums[1] 사이의 연산자: ops[0]
    const nums = expression.match(/[0-9]+/g).map(Number);
    const ops = expression.match(/[\-\+\*]/g);

    // 연산자 우선순위대로 계산
    for (let p of priority) {
      let idx = ops.indexOf(p);

      while (idx !== -1) {
        nums[idx] = calculate(p, nums[idx], nums[idx + 1]);

        nums.splice(idx + 1, 1);
        ops.splice(idx, 1);

        idx = ops.indexOf(p);
      }
    }

    const result = Math.abs(nums[0]);

    answer = Math.max(answer, result);
  }

  return answer;
}
