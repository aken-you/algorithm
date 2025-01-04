// https://school.programmers.co.kr/learn/courses/30/lessons/12905?language=javascript#
// ! 실패 - 아이디어를 얻지 못했음

// return 가장 큰 정사각형 넓이

// * 아이디어
// 노드가 정사각형의 가장 오른쪽 밑일 경우,
// 정사각형 크기 = 왼쪽, 위, 왼쪽 위 노드 중 가장 작은 값 + 1
// => 이미 했던 연산을 이용해 값을 구함 => dp

// n * m 탐색

function solution(board) {
  const n = board.length;
  const m = board[0].length;

  const arr = Array.from({ length: n }, (_, i) => [...board[i]]);

  const dx = [-1, -1, 0];
  const dy = [0, -1, -1];

  let max = 0;

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (board[i][j] === 0) continue;

      let min = -1;

      for (let k = 0; k < dx.length; k++) {
        const nx = i + dx[k];
        const ny = j + dy[k];

        if (min === -1) min = arr[nx][ny];

        if (min > arr[nx][ny]) min = arr[nx][ny];
      }

      arr[i][j] = min + 1;

      if (max < arr[i][j]) max = arr[i][j];
    }
  }

  if (max === 0) {
    for (let i = 0; i < n; i++) {
      if (board[i][0] === 1) max = 1;
    }
    for (let i = 0; i < m; i++) {
      if (board[0][i] === 1) max = 1;
    }
  }

  return max * max;
}
