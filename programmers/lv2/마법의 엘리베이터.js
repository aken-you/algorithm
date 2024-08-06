// https://school.programmers.co.kr/learn/courses/30/lessons/148653#
// !실패 - 예외상황 생각 못함
// 현재 + 버튼 값
//  <0 일 경우, 움직이지 x
// 버튼 1번 마법 돌 1개 사용
// return 필요한 마법의 돌의 최소 개수

// num = storey
// num를 10으로 나누고 난 몫과 나머지를 구한다.
// 나머지 < 5
//  answer += 나머지;
//  num = 몫
// !예외: 나머지 = 5
//  몫/10 < 5, num = a; answer + b;
//  몫/10 >= 5, num=a+1; answer + (10-b)
// 나머지 > 5
//  answer += 10 - 나머지
//  num = 몫 + 1

function solution(storey) {
  var answer = 0;
  let num = storey;

  while (num > 0) {
    const a = Math.floor(num / 10);
    const b = num % 10;

    if (b < 5) {
      answer += b;
      num = a;
    } else if (b > 5) {
      answer += 10 - b;
      num = a + 1;
    } else {
      if (a % 10 < 5) {
        num = a;
        answer += b;
      } else {
        num = a + 1;
        answer += 10 - b;
      }
    }
  }

  return answer;
}
