// https://school.programmers.co.kr/learn/courses/30/lessons/17679
// * 풀이

function getCnt(m, n, board) {
  const bumb = [];
  const checked = Array.from({ length: m }, () => Array(n).fill(false));

  for (let i = 0; i < m - 1; i++) {
    for (let j = 0; j < n - 1; j++) {
      const arr = [
        [i, j],
        [i, j + 1],
        [i + 1, j],
        [i + 1, j + 1],
      ];

      // [i,j], [i,j+1], [i+1,j], [i+1, j+1]이 모두 같은 요소라면 bumb에 좌표들 넣기
      let base = board[i][j];
      let isSame = arr.every(([x, y]) => board[x][y] === base);

      if (!isSame || base === " ") continue;

      for (let [x, y] of arr) {
        if (!checked[x][y]) bumb.push([x, y]);
        checked[x][y] = true;
      }
    }
  }

  // bumb 순회
  // board[x][y] = " "
  // board 열 순회(j)
  // str = ''
  // board 행 순회(i)
  //  만약 board[i][j] === ' '라면 continue;
  //  else str += board[i][j]
  // str = str.padStart( m, " ")
  // str 순회하면서 board 업데이트

  bumb.forEach(([x, y]) => {
    board[x][y] = " ";
  });

  for (let j = 0; j < n; j++) {
    let str = "";

    for (let i = 0; i < m; i++) {
      if (board[i][j] === " ") continue;

      str += board[i][j];
    }

    // ! padStart 문법 기억하기
    str = str.padStart(m, " ");

    for (let i = 0; i < m; i++) {
      board[i][j] = str[i];
    }
  }

  return [bumb.length, board];
}

function solution(m, n, board) {
  let answer = 0;
  // ! 요소가 string이면 다 쪼개야함 => 그래야 각 요소를 변경할 수 있음
  board = board.map((e) => e.split(""));

  while (true) {
    const [result, b] = getCnt(m, n, board);

    if (result === 0) break;

    board = b;
    answer += result;
  }

  return answer;
}
