// https://school.programmers.co.kr/learn/courses/30/lessons/81302

// 맨해튼 거리 > 2 or 응시자가 앉아있는 자리 사이가 파티션으로 막혀있는 경우
// return 거리두기 지키고 있으면 1, 아니면 0

// p가 있는 모든 위치 찾기
function getXY(arr) {
  const N = arr.length;
  const M = arr[0].length;
  const XY = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === "P") {
        XY.push([i, j]);
      }
    }
  }

  return XY;
}

// p를 탐색 시작 노드로 하여 bfs - 거리 재기 (가장 가까운 노드부터 탐색)
// 만약 p와의 거리가 2이하일 경우: 거리두기 지키지 x

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

function bfs(start, place) {
  const queue = [start];
  const N = place.length;
  const M = place[0].length;
  const distance = Array.from({ length: N }, () => new Array(M).fill(0)); // start 노드에서의 거리

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue; // 범위 확인
      if (nx === start[0] && ny === start[1]) continue; // 시작 노드일 경우

      if (distance[nx][ny] > 0) continue; // 이미 방문한 경우
      if (place[nx][ny] === "X") continue; // 파티션이 있을 경우

      // 거리가 2이하인 경우 => 거리두기 지키지 x
      if (place[nx][ny] === "P" && distance[x][y] + 1 <= 2) {
        return 0;
      }

      distance[nx][ny] = distance[x][y] + 1;
      queue.push([nx, ny]);
    }
  }

  return 1;
}

function solution(places) {
  var answer = [];

  for (const place of places) {
    const positions = getXY(place); // P 위치
    let result = 1;

    if (positions.length === 0) {
      answer.push(1);
      continue;
    }

    for (const [x, y] of positions) {
      const can = bfs([x, y], place);

      if (can === 0) {
        result = 0;
        break;
      }
    }

    answer.push(result);
  }

  return answer;
}
