// https://school.programmers.co.kr/learn/courses/30/lessons/49994
// * 풀이
// 좌표평면의 경계를 넘어가는 명령어는 무시
// return 캐릭터가 처음 걸어본 길의 길이

// 길을 이동할 때마다 시작점과 도착점을 기록

// 이동할 때마다
//  기록한 루트 중에 이미 지나간 길이라면 기록하고 이동
//      만약 범위를 벗어나면 이동 x, 기록 x
//  이미 지나간 길이라면 이동 (기록 x)

function solution(dirs) {
  let answer = 0;
  const route = [];
  let currentX = 0;
  let currentY = 0;

  const d = { U: [0, 1], D: [0, -1], R: [1, 0], L: [-1, 0] };

  for (let i = 0; i < dirs.length; i++) {
    const [dx, dy] = d[dirs[i]];
    const nextX = currentX + dx;
    const nextY = currentY + dy;

    if (nextX < -5 || nextX > 5 || nextY < -5 || nextY > 5) continue;

    const flag =
      route.filter((info) => {
        const [startX, startY] = info[0];
        const [endX, endY] = info[1];

        if (
          startX === currentX &&
          startY === currentY &&
          endX === nextX &&
          endY === nextY
        )
          return true;
        if (
          startX === nextX &&
          startY === nextY &&
          endX === currentX &&
          endY === currentY
        )
          return true;

        return false;
      }).length === 1;

    if (!flag) {
      answer++;
      route.push([
        [currentX, currentY],
        [nextX, nextY],
      ]);
    }

    currentX = nextX;
    currentY = nextY;
  }

  return answer;
}
