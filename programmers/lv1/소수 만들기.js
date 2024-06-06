// 3개 수를 더했을 때 소수가 되는 경우의 수

// sosu = new Set()
// 1. 3개의 수를 더한다.
// 2. 합이 소수인지 확인한다. 맞다면 sosu에 넣기
// 3. 소수의 개수를 반환

function isPrime(number) {
  let flag = true;

  if (number === 1) return false;

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      flag = false;
      break;
    }
  }

  return flag;
}

function solution(nums) {
  const cases = [];

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const sum = nums[i] + nums[j] + nums[k];
        cases.push(sum);
      }
    }
  }

  return cases.filter((e) => isPrime(e)).length;
}
