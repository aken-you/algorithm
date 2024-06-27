// https://school.programmers.co.kr/learn/courses/30/lessons/84512
// 경우의 수가 많지 않아서 그렇지 좋지 않은 풀이다...
function solution(word) {
  const alpha = ["A", "E", "I", "O", "U", ""];
  let words = new Set();

  for (let a = 0; a < 6; a++) {
    for (let b = 0; b < 6; b++) {
      for (let c = 0; c < 6; c++) {
        for (let d = 0; d < 6; d++) {
          for (let e = 0; e < 6; e++) {
            const str = `${alpha[a]}${alpha[b]}${alpha[c]}${alpha[d]}${alpha[e]}`;
            if (str.length > 0) words.add(str);
          }
        }
      }
    }
  }
  words = [...words];
  words.sort();

  return words.indexOf(word) + 1;
}

// ! DFS
function solution(word) {
  let count = 0;
  let flag = false; // 단어를 찾았는지 여부 - 재귀 호출을 막기 위함
  let vowels = ["A", "E", "I", "O", "U"];

  const dfs = (currentStr) => {
    // 단어가 5글자 초과하거나 단어를 찾았으면 종료
    if (currentStr.length > 5 || flag) return;

    if (currentStr === word) {
      flag = true;
      return;
    }

    count++;

    for (let i = 0; i < 5; i++) {
      dfs(currentStr + vowels[i]);
    }
  };

  dfs("");

  return count;
}

solution("AAAAA");
