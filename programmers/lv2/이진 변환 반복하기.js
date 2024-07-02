// https://school.programmers.co.kr/learn/courses/30/lessons/70129
// * 내 풀이
// x에서 1의 개수를 구한다
// 개수를 2진법으로 바꿈
// return [이진 변환 횟수, 제거된 0의 개수]

// str에서 0이 있다면, 개수를 구하고 0을 제거
//  zeroCnt += 0의 개수
// str의 길이를 재고, 길이의 이진수를 구함
// 여기까지 cnt++;
// str = 이진수
// 이 과정을 str === 1일 때까지 반복

function solution(s) {
  let zeroCnt = 0;
  let cnt = 0;
  let str = s;

  while (str !== "1") {
    const oneStr = str
      .split("")
      .filter((e) => e === "1")
      .join("");

    zeroCnt += str.length - oneStr.length;
    str = oneStr.length.toString(2);
    cnt++;
  }

  return [cnt, zeroCnt];
}
