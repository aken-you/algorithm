// https://school.programmers.co.kr/learn/courses/30/lessons/12936
// ! 실패

// * 모범 풀이
// return 사전 순으로 나열 했을 때, k번째 방법

function factorial(num) {
  let result = 1;

  for (let i = 2; i <= num; i++) result *= i;

  return result;
}

// n=3, k=5 => [3, 1, 2]
// 맨 앞자리 수부터 찾아나가기
// 맨 앞자리를 제외한 나머지 수들의 경우의 수는 (n-1)!
// k / (n-1)! = 몫은 맨 앞자리 수의 인덱스, 나머지는 다음 자리 수의 경우의 수

// 맨 앞자리 수
// 맨 앞자리를 1로 고정하면 나머지 수들의 경우의 수는 2! = 2
// 맨 앞자리를 2로 고정하면 나머지 수들의 경우의 수는 2! = 2
// 4 / (3-1)! = 2 ... 0 => 맨 앞자리 수는 nums[2] = 3 => nums에 3 제거 (nums = [1, 2])
// 두 번째 자리 수
// 0 / (2-1)! = 0 ... 0 => 두 번째 자리 수는 nums[0] = 1 => nums에 1 제거 (nums = [2])
// 세 번째 자리 수
// 0 / (1-1)! = 0 ... 0 => 세 번째 자리 수는 nums[0] = 2

function solution(n, k) {
  let result = [];
  let nth = k - 1;
  let factorialN = factorial(n);
  const nums = Array.from({ length: n }, (e, idx) => idx + 1);

  while (result.length < n) {
    factorialN = factorialN / nums.length;

    const num = Math.floor(nth / factorialN);
    const rest = nth % factorialN;

    result.push(nums[num]);
    nums.splice(num, 1);
    nth = rest;
  }

  return result;
}
