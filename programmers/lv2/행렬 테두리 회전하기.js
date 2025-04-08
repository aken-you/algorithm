// https://school.programmers.co.kr/learn/courses/30/lessons/77485

// return 그 회전에 의해 위치가 바뀐 숫자들 중 가장 작은 숫자들을 순서대로 담은 배열

function solution(rows, columns, queries) {
  const answer = [];
  let num = 0;
  const arr = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => {
      num++;
      return num;
    })
  );

  // query 범위를 가지고 시계 방향으로 회전
  function rotate(query) {
    const [x1, y1, x2, y2] = query.map((e) => e - 1);

    let updatedNum = arr[x1][y1];
    let min = updatedNum;
    let direction = "r";

    // x1, y1의 오른쪽에 있는 노드부터 업데이트 시작
    let x = x1;
    let y = y1 + 1;

    while (!(x === x1 && y === y1)) {
      const temp = arr[x][y];
      arr[x][y] = updatedNum;
      updatedNum = temp;

      min = Math.min(min, updatedNum);

      if (x === x1 && y === y2) {
        direction = "d"; // 아래로 이동
      } else if (x === x2 && y === y2) {
        direction = "l"; // 왼쪽으로 이동
      } else if (x === x2 && y === y1) {
        direction = "u"; // 위쪽으로 이동
      }

      if (direction === "r") {
        y += 1;
      } else if (direction === "d") {
        x += 1;
      } else if (direction === "l") {
        y -= 1;
      } else if (direction === "u") {
        x -= 1;
      }
    }

    // x1, y1 값 업데이트
    arr[x1][y1] = updatedNum;

    return min;
  }

  for (const query of queries) {
    const min = rotate(query);
    answer.push(min);
  }

  return answer;
}
