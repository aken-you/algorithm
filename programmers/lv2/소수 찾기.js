// https://school.programmers.co.kr/learn/courses/30/lessons/42839
// * 내 풀이 1 - permutation
// return 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지

// 에라토스테네스의 체
function isPrime(num) {
  if (num === 1) return false;

  const nums = Array(num + 1).fill(true);

  nums[0] = false;
  nums[1] = false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    for (let j = i * 2; j <= num; j += i) {
      nums[j] = false;
    }
  }

  return nums[num];
}

// numbers에서 종이 조각들을 확인한다.
// 종이 조각들을 조합한다.
// 조합한 숫자가 소수인지 확인한다.

function permutation(arr, selectNum) {
  if (selectNum === 1) return arr.map((e) => [e]);

  const result = [];

  arr.forEach((fixed, idx) => {
    const rest = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    const per = permutation(rest, selectNum - 1);
    const attached = per.map((p) => [fixed, ...p]);

    result.push(...attached);
  });

  return result;
}

function solution(numbers) {
  const nums = numbers.split("");
  const permutations = new Set();
  let result = 0;

  for (let i = 1; i <= nums.length; i++) {
    const cases = permutation(nums, i);

    cases.forEach((arr) => {
      const number = Number(arr.join(""));

      if (!permutations.has(number) && isPrime(number)) result += 1;

      permutations.add(number);
    });
  }

  return result;
}

// * 내 풀이 2 - DFS
// return 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지

// 에라토스테네스의 체
function isPrime(num) {
  if (num === 1) return false;

  const nums = Array(num + 1).fill(true);

  nums[0] = false;
  nums[1] = false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    for (let j = i * 2; j <= num; j += i) {
      nums[j] = false;
    }
  }

  return nums[num];
}

// numbers에서 종이 조각들을 확인한다.
// 종이 조각들을 조합한다.
// 조합한 숫자가 소수인지 확인한다.

function solution(numbers) {
  const nums = numbers.split("");
  const numberCases = new Set();
  let result = 0;
  const checked = Array(nums.length).fill(false);

  const dfs = (str) => {
    if (str.length === nums.length) {
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (checked[i]) continue;

      checked[i] = true;
      numberCases.add(Number(str + `${nums[i]}`));
      dfs(str + `${nums[i]}`);
      checked[i] = false;
    }
  };

  dfs("");

  numberCases.forEach((num) => {
    if (isPrime(num)) result += 1;
  });

  return result;
}
