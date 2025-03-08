// https://school.programmers.co.kr/learn/courses/30/lessons/68645

// 1 + 2 + 3 + ... + n = n * (n+1) / 2

function solution(n) {
  var answer = [];
  const arr = Array.from({ length: n }, (_, idx) => new Array(idx + 1).fill(0));

  let direction = "down"; // 방향
  let [x, y] = [0, 0]; // 다음에 번호를 채울 좌표

  for (let i = 1; i <= (n * (n + 1)) / 2; i++) {
    arr[x][y] = i;

    if (direction === "down") {
      const [nx, ny] = [x + 1, y];

      // 더이상 내려갈 곳이 없으면 오른쪽으로 방향 틀기
      if (nx >= n || arr[nx][ny] !== 0) {
        direction = "right";
        [x, y] = [x, y + 1];
      } else {
        [x, y] = [nx, ny];
      }
    } else if (direction === "right") {
      const [nx, ny] = [x, y + 1];

      // 더이상 오른쪽으로 갈 곳이 없으면 위로 틀기
      if (ny >= n || arr[nx][ny] !== 0) {
        direction = "up";
        [x, y] = [x - 1, y - 1];
      } else {
        [x, y] = [nx, ny];
      }
    } else if (direction === "up") {
      const [nx, ny] = [x - 1, y - 1];

      // 더이상 위로 갈 곳이 없으면 아래로 틀기
      if (arr[nx][ny] !== 0) {
        direction = "down";
        [x, y] = [x + 1, y];
      } else {
        [x, y] = [nx, ny];
      }
    }
  }

  return arr.flat();
}
