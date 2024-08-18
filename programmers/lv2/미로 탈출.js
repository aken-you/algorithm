// https://school.programmers.co.kr/learn/courses/30/lessons/159993
// ! 실패 - 예외처리
// 통로 + 벽
// 벽은 지나갈 수 x
// 통로들 중 한 칸은 레버가, 한 칸은 문이 있음
// 레버를 당긴 후 문을 열어야 함
// ! 레버를 당기지 않았어도 출구를 지나갈 수 있음
// return 미로를 탈출하는데 필요한 최소 시간
//  탈출할 수 없으면 return -1

function solution(maps) {
  let answer;
  const n = maps.length;
  const m = maps[0].length;

  let S;
  let L;
  let E;

  // 시작 지점 S, 레버 L, 출구 E 찾기
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (maps[i][j] === "S") S = [i, j];
      else if (maps[i][j] === "L") L = [i, j];
      else if (maps[i][j] === "E") E = [i, j];
    }
  }

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  const bfs = (start, end) => {
    let distance;
    const queue = [start];
    const checked = Array.from({ length: n }, () => new Array(m).fill(false));
    const dis = Array.from({ length: n }, () => new Array(m).fill(0));

    checked[start[0]][start[1]] = true;

    while (queue.length) {
      const [x, y] = queue.shift();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        // 범위를 벗어난 경우
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        // 벽이거나 이미 방문한 경우
        if (maps[nx][ny] === "X" || checked[nx][ny]) continue;

        // 출구인 경우
        if (nx === end[0] && ny === end[1]) {
          checked[nx][ny] = true;
          dis[nx][ny] = dis[x][y] + 1;
          distance = dis[nx][ny];
          break;
        }

        // 방문하지 않고 출구가 아닌 경우
        checked[nx][ny] = true;
        dis[nx][ny] = dis[x][y] + 1;
        queue.push([nx, ny]);
      }

      if (checked[end[0]][end[1]]) {
        break;
      }
    }

    return distance;
  };

  // 시작 ~ 레버 거리
  const dis1 = bfs(S, L);
  if (dis1 === undefined) return -1;

  // 레버 ~ 출구 거리
  const dis2 = bfs(L, E);
  if (dis2 === undefined) return -1;

  return dis1 + dis2;
}
