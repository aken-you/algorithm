// https://school.programmers.co.kr/learn/courses/30/lessons/258709
// ! 실패
// n개 주사위 (1~n번)
// 나온 수의 합 => 점수가 더 큰 쪽이 승리, 같으면 무승부

// return 승리확률이 가장 높은 주사위 번호를 오름차순으로 정렬한 배열

// * combination
function combination(arr, selectedNum) {
  if (selectedNum === 1) return arr.map((e) => [e]);

  const result = [];

  arr.forEach((fixed, idx, origin) => {
    const rest = origin.slice(idx + 1);
    const coms = combination(rest, selectedNum - 1);
    const attached = coms.map((c) => [fixed, ...c]);

    result.push(...attached);
  });

  return result;
}

// "1,4": [승, 무, 패]

// dice에서 각자 n/2개 씩 주사위 고름
// a, b 각각 주사위 합 모든 경우의 수를 구하기

function solution(dice) {
  const nums = Array.from({ length: dice.length }, (_, i) => i);
  const combinations = combination(nums, dice.length / 2);

  let maxResult = [0, 0];

  combinations.forEach((dice1) => {
    const dice2 = nums.filter((e) => !dice1.includes(e));

    const aSum = getSum(dice, dice1);
    const bSum = getSum(dice, dice2);

    let cnt = 0;

    for (let i = 0; i < aSum.length; i++) {
      cnt += binarySearch(bSum, aSum[i]);
    }

    if (maxResult[1] < cnt) maxResult = [dice1, cnt];
  });

  return maxResult[0].map((e) => e + 1);
}

// 주사위 합 모든 경우의 수
function getSum(dice, combi) {
  const result = [];

  // 재귀 함수 이용
  const calculate = (cnt, sum) => {
    if (cnt === combi.length) {
      result.push(sum);
      return;
    }

    for (let i = 0; i < 6; i++) {
      calculate(cnt + 1, sum + dice[combi[cnt]][i]);
    }
  };

  calculate(0, 0);

  return result.sort((a, b) => a - b);
}

// binary search를 이용하여 크기 비교
function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return start;
}
