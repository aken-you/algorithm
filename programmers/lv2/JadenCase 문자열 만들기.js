// https://school.programmers.co.kr/learn/courses/30/lessons/12951
// * 내 풀이
// JadenCase: 첫 문자가 대문자, 그 외 문자는 소문자
// 첫 문자가 알파벳이 아닐 때 + 그 외 문자는 소문자

// s를 ' '기준으로 쪼갬
// 쪼갠 arr를 순회
// 맨 첫번째 문자가 알파벳이 아닐 경우 그대로 두고 + 그 외 문자는 소문자
// 맨 첫번째 문자가 알파벳일 경우 대문자로 바꾸고  + 그 외 문자는 소문자

function solution(s) {
  const arr = s.split(" ");

  for (let i = 0; i < arr.length; i++) {
    let str = "";

    if (/^[a-zA-Z]/.test(arr[i])) {
      str = arr[i][0].toUpperCase();
      str += arr[i].split("").slice(1).join("").toLowerCase();
    } else {
      str += arr[i].toLowerCase();
    }

    arr[i] = str;
  }

  return arr.join(" ");
}
