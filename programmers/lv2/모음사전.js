// https://school.programmers.co.kr/learn/courses/30/lessons/84512
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
