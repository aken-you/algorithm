// https://school.programmers.co.kr/learn/courses/30/lessons/17686
// * 풀이

// 파일 명에 포함된 숫자를 반영한 정렬 기능
// 영문 대소문자, " ", ., -로 이뤄짐
// 숫자를 하나 이상 포함
// HEAD, NUMBER, TAIL
// HEAD: 문자
// NUMBER: 1~5글자 사이의 연속된 숫자 (0~99999)
// TAIL: 나머지 (숫자 다시 나타날 수 o, 아무 글자 없을 수도)

// HEAD 기준으로 사전 순으로 정렬 (대소문자 구분 x)
// HEAD 부분이 같을 경우, NUMBER 숫자 순으로 정렬
//  숫자 앞의 0은 무시
// HEAD와 NUMBER 부분이 같을 경우, 원래 입력에 주어진 순서 유지

// sort((a,b) => {...})
// a와 b 각각 HEAD, NUMBER, TAIL을 찾는다.
// HEAD를 소문자로 바꾼다.
//  만약 소문자로 바꾼 HEAD가 동일하다면, NUMBER 비교
//  다르다면 a와 b 문자열 비교
// NUMBER 비교
//  오름차순으로 정렬
//  만약 동일할 경우, a가 b보다 앞에 있도록 정렬

function solution(files) {
  var answer = [];

  files.sort((a, b) => {
    const aStr = a.match(/[^0-9]+/g);
    const aNum = Number(a.match(/[0-9]+/g)[0]);
    const bStr = b.match(/[^0-9]+/g);
    const bNum = Number(b.match(/[0-9]+/g)[0]);

    const aHEAD = aStr[0].toLowerCase();
    const bHEAD = bStr[0].toLowerCase();

    if (aHEAD !== bHEAD) {
      const head = [aHEAD, bHEAD].sort();

      // aHEAD가 먼저 오도록 정렬 = return -1
      if (head[0] === aHEAD) {
        return -1;
      } else if (head[0] === bHEAD) {
        // bHEAD가 먼저 오도록 정렬 = 순서바뀜 = return 1
        return 1;
      }
    }

    // NUMBER 비교
    //  만약 동일할 경우, 순서 유지
    if (aNum === bNum) {
      return 0;
    }

    // 오름 차순으로 정렬
    return aNum - bNum;
  });

  return files;
}

// * arr.sort(compareFunction(a,b))
// compareFunction(a,b) 반환값 > 0: a가 b보다 먼저 오도록 정렬
// compareFunction(a,b) 반환값 < 0: b가 a보다 먼저 오도록 정렬
// compareFunction(a,b) 반환값 = 0: a와 b의 순서 변경 x
