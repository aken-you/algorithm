// https://school.programmers.co.kr/learn/courses/30/lessons/12902
// !실패

// return 직사각형을 채우는 방법의 수

// 가로 n 세로 3

// f(n) = f(n-2) x 3 + f(n-4) x 2 + … + f(2) x 2 + 2

function solution(n) {
  let answer = 0;
  const d = 1000000007;

  if (n % 2) return 0;
  if (n === 2) return 3;
  if (n === 4) return 11;

  const arr = Array(n / 2 + 1).fill(0);

  arr[1] = 3;
  arr[2] = 11;

  for (let i = 3; i <= n / 2; i++) {
    let sum = 2 + arr[i - 1] * 3;

    for (let j = 1; j < i - 1; j++) {
      sum += arr[j] * 2;
    }

    arr[i] = sum % d;
  }

  return arr[n / 2];
}
