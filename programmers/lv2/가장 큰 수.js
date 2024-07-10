// https://school.programmers.co.kr/learn/courses/30/lessons/42746#
// !실패

function solution(numbers) {
  numbers.sort((a, b) => {
    let A = String(a);
    let B = String(b);

    if (A === B) return 0;

    const aHead = +A[0];
    const bHead = +B[0];

    if (aHead > bHead) return -1;
    else if (aHead < bHead) return 1;

    const combine1 = +(A + B);
    const combine2 = +(B + A);

    return combine2 - combine1;
  });

  const result = numbers.map(String).join("");

  return result[0] === "0" ? "0" : result;
}

// * sort 동작 방식
// 양수가 되면 자리가 바꾸는 방식

// arr.sort((a, b) => a - b) => 오름차순
// a > b일 경우에만 a와 b의 자리를 바꾼다.
