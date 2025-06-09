// https://school.programmers.co.kr/learn/courses/30/lessons/43163

// return 최소 단계

// words에 target이 없는 경우, 0 반환

// dfs
// 현재 탐색하는 word가 target인 경우 탐색 정지
//  cnt가 minCnt보다 작을 경우 갱신
// 하나만 다른 word를 다음에 탐색

function solution(begin, target, words) {
  if (!words.includes(target)) return 0;

  const checked = new Array(words.length).fill(false); // 방문했는지 확인하는 이유는 최소 횟수로 단어를 만들어야 하므로

  let minCnt;

  function dfs(current, cnt) {
    if (current === target) {
      if (minCnt === undefined) minCnt = cnt;
      else minCnt = Math.min(cnt, minCnt);
      return;
    }

    for (let i = 0; i < words.length; i++) {
      const nextWord = words[i];

      if (checked[i]) continue;

      let diffCnt = 0;

      for (let j = 0; j < nextWord.length; j++) {
        if (diffCnt > 1) {
          break;
        }
        if (nextWord[j] !== current[j]) diffCnt += 1;
      }

      if (diffCnt !== 1) continue;

      checked[i] = true;
      dfs(nextWord, cnt + 1);
      checked[i] = false;
    }
  }

  dfs(begin, 0);

  return minCnt;
}
