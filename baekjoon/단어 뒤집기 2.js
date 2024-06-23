// https://www.acmicpc.net/problem/17413
// * 풀이
// 단어만 뒤집는다.
// <와 > 사이에는 알파멧 소문자와 공백만 있음
// 단어: 알파벳 소문자 + 숫자
// 연속하는 단어는 공백 하나로 구분

// 시간복잡도: O(n)

let input = require("fs").readFileSync("/dev/stdin").toString().trim();

// 문자를 순회한다
// 만약 현재 문자가 <라면
//    str에 문자가 있다면, (처음에 예외 생각 못했음)
//      result += str.split('').reverse().join('');
//      str = '' 초기화
//    flag = true
//    str += currentStr
// 만약 현재 문자가 >라면
//    str += currentStr
//    result += str
//    str = '' 초기화
//    flag = false;
// 만약 현재 문자가 <,>,공백이 아니라면
//    str += currentStr
// 만약 현재 문자가 공백이라면
//    만약 flag = false라면
//        result += str.split('').reverse().join('')
//        result += ' ' (처음에 예외 생각 못했음)
//        str = '' 초기화
//    만약 flag = true라면
//        str += ' ';

let result = "";
let str = "";
let flag = false;

for (let currentStr of input) {
  if (currentStr === "<") {
    if (str.length > 0) {
      result += str.split("").reverse().join("");
      str = "";
    }
    flag = true;
    str += currentStr;
  } else if (currentStr === ">") {
    str += currentStr;
    result += str;
    str = "";
    flag = false;
  } else if (currentStr === " ") {
    if (!flag) {
      result += str.split("").reverse().join("");
      result += " ";
      str = "";
    } else {
      str += " ";
    }
  } else {
    str += currentStr;
  }
}

if (str.length > 0) {
  result += str.split("").reverse().join("");
}

console.log(result);

// * 다른 풀이 - 정규 표현식 사용
console.log(
  input.replace(/<[a-z ]+>|[a-z0-9 ]+/g).reduce((str) => {
    if (str.startsWith("<")) return str;
    return str.split("").reverse().join("");
  })
);
