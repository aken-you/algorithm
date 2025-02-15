// https://school.programmers.co.kr/learn/courses/30/lessons/169199
// ! 실패

function solution(board) {
  let answer = -1;

  let start;
  let end;

  // 시작점 찾기
  board.forEach((b, idx) => {
    for (let i = 0; i < b.length; i++) {
      const s = b[i];

      if (s === "R") start = [idx, i];
    }
  });

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  // bfs
  const checked = Array.from({ length: board.length }, () =>
    new Array(board[0].length).fill(0)
  );
  const queue = [[...start, 0]];

  checked[start[0]][start[1]] = 1;

  while (queue.length) {
    const [x, y, cnt] = queue.shift();

    if (board[x][y] === "G") {
      answer = cnt;
      break;
    }

    // 다음 노드 탐색
    for (let i = 0; i < dx.length; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      // 벽이 아니라면 한 방향으로 이동
      while (board[nx] && board[nx][ny] && board[nx][ny] !== "D") {
        nx += dx[i];
        ny += dy[i];
      }

      // D을 마주하기 전의 위치
      nx -= dx[i];
      ny -= dy[i];

      if (checked[nx][ny] === 0) {
        checked[nx][ny] = 1;
        queue.push([nx, ny, cnt + 1]);
      }
    }
  }

  return answer;
}
