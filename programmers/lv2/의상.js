// https://school.programmers.co.kr/learn/courses/30/lessons/42578
// !1번 테스트 - 런타임 에러
// 최소 한 개의 의상은 입는다.
// 서로 다른 옷의 조합의 수를 return

// 5개 중에 i개를 고른다. -> 조합
// result += clothes[고른 수 중 하나].length * ... * clothes[고른 수 중 하나].length

function combination(arr, selectNum) {
  if (selectNum === 1) return arr.map((e) => [e]);

  const result = [];

  arr.forEach((fixed, idx) => {
    const rest = arr.slice(idx + 1);
    const com = combination(rest, selectNum - 1);
    const attached = com.map((ar) => [fixed, ...ar]);

    result.push(...attached);
  });

  return result;
}

function solution(clothes) {
  let result = 0;
  const clo = {};

  clothes.forEach(([name, category]) => {
    if (!clo[category]) clo[category] = [name];
    else clo[category].push(name);
  });

  const keys = Object.keys(clo);

  let i = 1;

  while (i <= keys.length) {
    const combi = combination(keys, i);

    combi.forEach((arr) => {
      let sum = 1;

      arr.forEach((category) => {
        sum *= clo[category].length;
      });

      result += sum;
    });

    i++;
  }

  return result;
}

// * 풀이
// 1종류 N개, 2종류 M개라고 하면
// 1종류만 선택할 경우: N
// 2종류만 선택할 경우: M
// 1종류와 2종류 둘 다 선택할 경우: N * M
// (N + 1) * (M + 1) - 1

function solution(clothes) {
  let result = 1;
  const clo = {};

  clothes.forEach(([name, category]) => {
    if (!clo[category]) clo[category] = [name];
    else clo[category].push(name);
  });

  const keys = Object.keys(clo);

  keys.forEach((key) => {
    result *= clo[key].length + 1;
  });

  return result - 1;
}
