// https://school.programmers.co.kr/learn/courses/30/lessons/43164
// ! 실패

// ICN 출발 항상
// 항공권 모두 사용
// 가능한 경로 2개 이상일 경우, 알파벳 순서가 앞서는 경로를 return
// return 방문하는 경로

// dfs
// tickets 순회
// 다음 티켓 순회
//  현재 티켓 도착지 = 다음 티켓 출발지
// 다음 티켓이 여러개일 경우, 알파벳 순서가 앞서는 경로 탐색

function compare(aStr, bStr) {
  if (aStr === bStr) return 0;

  const arr = [aStr, bStr];

  arr.sort();

  if (aStr === arr[0])
    return -1; // a가 더 앞섬
  else return 1; // a가 더 뒤임
}

function solution(tickets) {
  const answer = [];
  const n = tickets.length;

  const checked = new Array(n).fill(false);

  function dfs(idx, arr) {
    if (checked.filter((e) => e).length === n) {
      answer.push(arr);
      return;
    }
    const [from, to] = tickets[idx];

    for (let i = 0; i < n; i++) {
      if (checked[i]) continue;

      const next = tickets[i];

      // 현재 티켓 도착지 != 다음티켓 출발지
      if (to !== next[0]) continue;

      checked[i] = true;

      dfs(i, [...arr, next[1]]);
      checked[i] = false;
    }
  }

  for (let i = 0; i < n; i++) {
    const [from, to] = tickets[i];

    if (from !== "ICN") continue;

    checked[i] = true;
    dfs(i, [from, to]);
    checked[i] = false;
  }

  answer.sort((arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      const str1 = arr1[i];
      const str2 = arr2[i];

      const result = compare(str1, str2);

      if (result !== 0) return result;
    }

    return 0;
  });

  return answer[0];
}
