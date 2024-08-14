// https://school.programmers.co.kr/learn/courses/30/lessons/135807
// * 풀이

// return 가장 큰 양의 정수
//  없으면 0 return;

// 최대 공약수만 구하면, 최대 공약수의 약수들 = 공약수
function gcd(a, b) {
  return a % b === 0 ? b : gcd(b, a % b);
}

// 철수 - a, 영희 - b
// 만약 gcdA = 12, gcdB = 4더라도
// gcdA % gcdB === 0이면, return 0
// 그렇지 않다면 gcdA와 gcdB 중 가장 큰 수 찾기
function solution(arrayA, arrayB) {
  let max = 0;
  let gcdA = arrayA[0];
  let gcdB = arrayB[0];

  for (let i = 1; i < arrayA.length; i++) {
    gcdA = gcd(gcdA, arrayA[i]);
    gcdB = gcd(gcdB, arrayB[i]);
  }

  if (arrayB.every((e) => e % gcdA !== 0)) max = Math.max(max, gcdA);
  if (arrayA.every((e) => e % gcdB !== 0)) max = Math.max(max, gcdB);

  return max === 1 ? 0 : max;
}
