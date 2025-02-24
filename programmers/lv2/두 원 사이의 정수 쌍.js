// https://school.programmers.co.kr/learn/courses/30/lessons/181187

// return 두 원 사이 공간의 x와 y 모두 정수인 점 개수

// x 또는 y 축에 있는 점 개수 * 4 + 축 외의 곳에 있는 점 개수 * 4
// x 또는 y 축에 있는 점 개수: r2 - r1 + 1
// 축 외의 곳에 있는 점 개수: x축: 1~r2-1 y축: 1~r2-1
//  i ** 2 + j ** 2가 r1 ** 2와 r2 **2 사이에 존재

function solution(r1, r2) {
  let answer = (r2 - r1 + 1) * 4;
  let cnt = 0;

  for (let i = 1; i < r2; i++) {
    const startY = Math.ceil(Math.sqrt(r1 * r1 - i * i)) || 1; // 만약 앞의 값이 0이면 1로 변환 (이미 x축 개수는 쟀기때문)
    const endY = Math.floor(Math.sqrt(r2 * r2 - i * i));

    cnt += endY - startY + 1;

    console.log(startY, endY - startY + 1);
  }

  answer += cnt * 4;

  return answer;
}
