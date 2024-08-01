// https://school.programmers.co.kr/learn/courses/30/lessons/152996#
// * 풀이
// 2, 3,4
// 짝궁: 시소에 걸리는 토크의 크기가 서로 상쇄되어 완전한 균형
// 사람 무게 x 좌석 간의 거리

// return 시소 짝꿍 몇 쌍

// weights 순회 (i)
// weight에 (2, 3, 4)를 곱하여 결과 저장
//  처음 나오는 무게라면 result[무게] = [i];
//  아니라면 result[무게].push(i);

// 무게가 같은 사람이 2명 이상이면 (n: 무게가 같은 사람 수)
//  answer += (n * (n - 1)) / 2;

// Object.values(result) 순회 (people)
// answer += people.length * (people.length-1)/2;
// people 중에서 같은 무게인 사람이 있다면 (n: 같은 무게인 사람 수), answer -= (n * (n - 1)) / 2;

function solution(weights) {
  let answer = 0;
  const result = {};
  const w = {};

  for (let i = 0; i < weights.length; i++) {
    w[weights[i]] = 1 + (w[weights[i]] || 0);

    for (let j = 2; j <= 4; j++) {
      const weight = weights[i] * j;

      if (!result[weight]) result[weight] = [i];
      else result[weight].push(i);
    }
  }

  // 무게가 같은 사람들끼리 짝꿍인 경우의 수 구하기
  for (let n of Object.values(w)) {
    if (n <= 1) continue;

    answer += (n * (n - 1)) / 2;
  }

  for (let people of Object.values(result)) {
    const n = people.length;

    if (n === 1) continue;

    answer += (n * (n - 1)) / 2;

    // 같은 무게인 사람들 중에서 짝꿍인 경우의 수 빼기 (이미 앞에서 계산했기 때문에)
    const arr = people.map((v) => weights[v]);

    const v = {};

    for (let i = 0; i < arr.length; i++) {
      const weight = arr[i];
      v[weight] = 1 + (v[weight] || 0);
    }

    for (let cnt of Object.values(v)) {
      if (cnt === 1) continue;

      answer -= (cnt * (cnt - 1)) / 2;
    }
  }

  return answer;
}
