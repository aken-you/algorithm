// https://school.programmers.co.kr/learn/courses/30/lessons/42746#
// !실패

// 3, 30이 있을 경우
// 303 < 330이므로 3이 앞에 있어야 한다.

function solution(numbers) {
  numbers.sort((a, b) => {
    let A = String(a);
    let B = String(b);

    if (A === B) return 0;

    const aHead = +A[0];
    const bHead = +B[0];

    // 맨 앞자리가 다를 경우
    if (aHead > bHead) return -1;
    else if (aHead < bHead) return 1;

    // 맨 앞자리가 같을 경우
    const combine1 = +(A + B); // 303
    const combine2 = +(B + A); // 330

    return combine2 - combine1;
  });

  const result = numbers.map(String).join("");

  return result[0] === "0" ? "0" : result;
}

// * sort 동작 방식
// 양수가 되면 자리가 바꾸는 방식

// arr.sort((a, b) => a - b) => 오름차순
// a > b일 경우에만 a와 b의 자리를 바꾼다.

// ! 실패
function solution(numbers) {
  const result = numbers
    .map(String)
    .sort((a, b) => {
      return b + a - (a + b);
    })
    .join("");

  return result[0] === "0" ? "0" : result;
}
