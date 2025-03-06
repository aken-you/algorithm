// https://school.programmers.co.kr/learn/courses/30/lessons/181188
// !실패

// * 그리디 알고리즘
// 현재 상황에서 가장 최선의 선택을 하는 알고리즘

function solution(targets) {
  let answer = 0;

  // 끝점 기준으로 오름차순 정렬
  targets.sort((a, b) => {
    return a[1] - b[1];
  });

  let last = [0, 0];

  for (let b of targets) {
    // 끝점보다 시작점이 크거나 같으면, 요격
    if (last[1] <= b[0]) {
      last = b;
      answer += 1;
    }
  }

  return answer;
}

// 다른 풀이
// 시작점을 기준으로 오름차순 정렬
function solution(targets) {
  var answer = 0;

  // 시작점 기준으로 오름차순 정렬
  targets.sort((a, b) => {
    return a[0] - b[0];
  });

  let [s, e] = [0, 0];

  for (let tg of targets) {
    // tg 시작점이 e와 같거나 클경우
    if (tg[0] >= e) {
      [s, e] = tg;
      answer++;
    } else if (s <= tg[0] && tg[1] <= e) {
      // (s, e) 범위 내에 tg가 있을 경우
      [s, e] = tg;
    }
  }

  return answer;
}
