// https://school.programmers.co.kr/learn/courses/30/lessons/131130
// ! 실패 - 예외상황 생각 못함

// return 최고 점수
function getScore(arr) {
  if (arr.length === 1) return 0; // ! 예외 상황임 - cards의 모든 상자를 한 번에 열었을 경우, 하나의 상자 그룹만 존재하므로 score는 0점

  const lens = arr.map((e) => e.length).sort((a, b) => b - a);

  return lens[0] * lens[1];
}

function solution(cards) {
  var answer = 0;
  const n = cards.length;

  cards = cards.map((e) => e - 1);

  // arr: 집합
  // num: 최근에 방문한 상자 번호
  const dfs = (arr, num, opened) => {
    if (arr.flat().length === n) {
      answer = Math.max(getScore(arr), answer);
      return;
    }

    const nextBox = cards[num];

    // 다음 상자가 이미 열려있을 경우 => 그룹 마무리하고 임의의 다른 상자 하나 추가
    // 다음 상자가 열려있지 x => 그룹에 넣기

    if (opened[nextBox]) {
      const newNextBox = opened.findIndex((e, idx) => e === false);
      opened[newNextBox] = true;

      dfs([...arr, [newNextBox]], newNextBox, opened);
    } else {
      arr[arr.length - 1].push(nextBox);

      opened[nextBox] = true;
      dfs(arr, nextBox, opened);
    }
  };

  // i: 상자 번호
  for (let i = 0; i < n; i++) {
    const opened = new Array(n).fill(false);

    opened[i] = true;
    dfs([[i]], i, opened);
  }

  return answer;
}
