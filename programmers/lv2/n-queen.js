// https://school.programmers.co.kr/learn/courses/30/lessons/12952
// !실패

// n개의 퀸이 서로 공격할 수 x 배치
// return 공격할 수 없는 배치의 모든 경우의 수

// 1차원 배열로 생각: 각 행에서 queen이 위치한 열 (= 행에 2개의 queen 위치 x)
// [1, 3, 0, 2]
// 중복되는 요소 x = 하나의 열에 2개 이상의 queen 존재 x

// [x, y] 대각선 = [x - 1*n, y - 1*n] or [x+1*n, y+1*n] or [x+1*n, y-1*n] or [x-1*n, y+1*n]
// | x1 - x2 | = | y1 - y2 |

function canNext(board, row) {
  for (let beforeRow = 0; beforeRow < row; beforeRow++) {
    // 전에 놓여진 queen들과 같은 열이면 안됨
    const col = board[row];
    const beforeCol = board[beforeRow];

    if (col === beforeCol) return false;

    // 전에 놓여진 queen들과 동일한 대각선에 위치 x
    const rowDiff = Math.abs(row - beforeRow);
    const colDiff = Math.abs(col - beforeCol);
    if (rowDiff === colDiff) return false;
  }

  return true;
}

function solution(n) {
  let answer = 0;
  const board = new Array(n).fill(-1);

  function nqueen(row) {
    if (row === n) {
      answer += 1;
      return;
    }

    for (let col = 0; col < n; col++) {
      board[row] = col;

      if (canNext(board, row)) {
        nqueen(row + 1);
      }
    }
  }

  // 0번째 행부터 queen 놓기 시작
  const start = 0;

  nqueen(start);

  return answer;
}
