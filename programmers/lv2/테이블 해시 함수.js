// https://school.programmers.co.kr/learn/courses/30/lessons/147354

// 행 = 튜플, 열 = 컬럼
// 첫 컬럼 = 기본키 (모든 튜플에 대해 중복 x)

function solution(data, col, row_begin, row_end) {
  // 정렬
  data.sort((a, b) => {
    return a[col - 1] - b[col - 1] || b[0] - a[0];
  });

  const nums = [];

  for (let i = row_begin - 1; i < row_end; i++) {
    const arr = data[i];
    const sum = arr.reduce((acc, curr) => acc + (curr % (i + 1)), 0);

    nums.push(sum);
  }

  let answer = nums[0];

  for (let i = 1; i < nums.length; i++) {
    answer = answer ^ nums[i]; // bitwise XOR
  }

  return answer;
}

// * bitwise
// XOR: ^
// 1. 두 비트가 서로 다르면 1
// 2. 두 비트가 서로 같으면 0

// &: AND
// 두 비트가 1인 경우에만 1

// |: OR
// 두 비트 중 하나라도 1이면 1

// ~: NOT
// 1은 0으로, 0은 1로
