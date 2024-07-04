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
