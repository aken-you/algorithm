// https://school.programmers.co.kr/learn/courses/30/lessons/42577
// 한 번호가 다른 번호의 접두어인 경우가 있으면 false 반환

// phone_book을 순회한다. (str)
// str의 맨 끝 글자부터 지워보면서, nums에 있는지 확인
//  남은 글자가 있을 때까지 지우기
// 그럼에도 없다면 다음 글자로 넘어간다.
// 있다면 answer = false로 바꾸고 break한다

// 시간복잡도: O(n * 20) = O(100만 * 20)

function solution(phone_book) {
  let answer = true;
  const nums = new Set(phone_book);

  for (let i = 0; i < phone_book.length; i++) {
    const str = phone_book[i];
    let s = str.slice(0, str.length - 1);

    while (s.length > 0) {
      if (nums.has(s)) {
        answer = false;
        break;
      }

      s = str.slice(0, s.length - 1);
    }

    if (!answer) break;
  }

  return answer;
}
