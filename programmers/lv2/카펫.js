// https://school.programmers.co.kr/learn/courses/30/lessons/42842
// * 내 풀이
// 가로 >= 세로
// return [가로, 세로]

// 세로 최대 = 가로, 세로 최소 = 3
// 가로 최대 = (brown-2)/2
// 2가로 + 2(세로 - 2) = brown
// (가로-2) * (세로-2) = yellow
function solution(brown, yellow) {
  let row = (brown - 2) / 2;
  let col = 3;

  while (col <= row) {
    const size = (row - 2) * (col - 2);
    if (size === yellow) {
      break;
    }

    row--;
    col++;
  }

  return [row, col];
}

// * 다른 풀이
// yellow의 약수 구하기 (i, b)
// (x+2) * 2 + (y) * 2 =  brown일 때 break;
function solution(brown, yellow) {
  let result = [];

  for (let i = 1; i <= Math.sqrt(yellow); i++) {
    if (yellow % i !== 0) continue;

    const b = yellow / i;

    const row = Math.max(i, b);
    const col = Math.min(i, b);

    const cnt = (row + 2) * 2 + col * 2;

    if (cnt === brown) {
      result = [row, col];
      break;
    }
  }

  return result.map((e) => e + 2);
}
