// https://school.programmers.co.kr/learn/courses/30/lessons/134239

// 우박 수열 구하기
// x=k일 때, 누적 정적분 값 구하기

function solution(k, ranges) {
  const result = [];

  const dots = [[0, k]];
  const size = [];

  while (k !== 1) {
    // 짝수
    if (k % 2 === 0) {
      const [lx, ly] = dots[dots.length - 1];

      // 항 구하기
      k = k / 2;
      dots.push([dots.length, k]);

      // 넓이
      const s = (ly + k) / 2;
      size.push(s);

      continue;
    }

    // 홀수
    const [lx, ly] = dots[dots.length - 1];

    k = k * 3 + 1;
    dots.push([dots.length, k]);

    // 넓이
    const s = (ly + k) / 2;
    size.push(s);
  }

  const n = size.length;

  // ranges 순회
  // 시작점: a
  // 끝점: n - b
  // 시작점과 끝점까지의 넓이 구하기
  for (let i = 0; i < ranges.length; i++) {
    const [a, mb] = ranges[i];
    const b = n + mb;
    let sum = 0;

    if (a > b) {
      result.push(-1);
      continue;
    }

    for (let j = a; j < b; j++) {
      sum += size[j];
    }

    result.push(sum);
  }

  return result;
}
