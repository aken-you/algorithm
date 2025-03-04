// https://school.programmers.co.kr/learn/courses/30/lessons/160585#

// 선공: O, 후공: X

// return 규칙을 지켜서 진행했을 때 나올 수 있는 게임 상황 ? 1 : 0

function getWinner(board) {
  const winner = new Set();

  for (let i = 0; i < 3; i++) {
    // 가로행 동일
    if (board[i].every((e) => e === board[i][0])) {
      winner.add(board[i][0]);
    }

    // 세로행 동일
    let base = board[0][i];
    let flag = true;

    for (let j = 0; j < 3; j++) {
      if (base !== board[j][i]) {
        flag = false;
        break;
      }
    }

    if (flag) winner.add(base);
  }

  // 대각선 동일
  let baseCross1 = board[0][0];
  let flag1 = true;
  let baseCross2 = board[2][0];
  let flag2 = true;

  for (let i = 0; i < 3; i++) {
    if (baseCross1 !== board[i][i]) flag1 = false;
    if (baseCross2 !== board[2 - i][i]) flag2 = false;
  }

  if (flag1) winner.add(baseCross1);
  if (flag2) winner.add(baseCross2);

  return winner;
}

function solution(board) {
  var answer = -1;

  board = board.map((str) => str.split(""));

  let oCnt = 0;
  let xCnt = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "O") oCnt += 1;
      else if (board[i][j] === "X") xCnt += 1;
    }
  }

  // X만 있을 경우: 0
  if (oCnt === 0 && xCnt > 0) return 0;
  // .만 있을 경우: 1
  if (oCnt === 0 && xCnt === 0) return 1;
  // O 개수 < X 개수: 0
  if (oCnt < xCnt) return 0;

  // O 개수 = X 개수인데 O가 이미 승리했을 경우: 0
  if (oCnt === xCnt) {
    const winner = getWinner(board);

    if (winner.has("O")) return 0;
    else return 1;
  }

  // O 개수 > X 개수
  // O 개수와 X 개수 차이가 1이 아닐 경우
  if (oCnt > xCnt + 1) return 0;

  // X가 이미 승리했을 경우: 0
  const winner = getWinner(board);

  if (winner.has("X")) return 0;

  return 1;
}

// 다른 풀이
function won(board, t) {
  // 가로줄 판단.
  for (const row of board) {
    if (row[0] === t && row[1] === t && row[2] === t) {
      return true;
    }
  }

  // 세로줄 판단.
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === t && board[1][col] === t && board[2][col] === t) {
      return true;
    }
  }

  // 대각선 판단.
  if (board[0][0] === t && board[1][1] === t && board[2][2] === t) {
    return true;
  }
  if (board[2][0] === t && board[1][1] === t && board[0][2] === t) {
    return true;
  }

  return false;
}

function solution(board) {
  // 문자열의 각 행을 배열로 변환.
  board = board.map((row) => row.split(""));

  let oCnt = 0;
  let xCnt = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "O") oCnt += 1;
      else if (board[i][j] === "X") xCnt += 1;
    }
  }

  // O의 개수는 X의 개수와 같거나 1 많아야 함.
  if (!(oCnt === xCnt || oCnt === xCnt + 1)) {
    return 0;
  }

  // O와 X 둘 다 승리한 경우는 불가능.
  if (won(board, "O") && won(board, "X")) {
    return 0;
  }

  // O가 승리했다면, O의 개수는 X의 개수보다 1 더 많아야 함.
  if (won(board, "O") && oCnt !== xCnt + 1) {
    return 0;
  }

  // X가 승리했다면, O의 개수와 X의 개수가 같아야 함.
  if (won(board, "X") && oCnt !== xCnt) {
    return 0;
  }

  return 1;
}
