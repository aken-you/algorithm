// https://school.programmers.co.kr/learn/courses/30/lessons/49993
// * 풀이
// return 스킬 트리 개수

// 각 스킬 이전에 배워야 할 것들 저장 (before)
// skill_trees 순회 (str)
// str 순회 (s) (stack = [] 초기화)
// s가 skill 중 하나일 경우
//  s === skill[0]이면 stack.push
//  s !== skill[0]이면
//      before[s] === stack의 맨 마지막 요소, stack.push
//      before[s] !== stack의 맨 마지막 요소, 불가능한 스킬 트리

function solution(skill, skill_trees) {
  var result = 0;
  const before = {};
  const can = skill.split("");

  for (let i = 1; i < can.length; i++) {
    before[can[i]] = can[i - 1];
  }

  for (let i = 0; i < skill_trees.length; i++) {
    const str = skill_trees[i];
    let flag = true;
    const stack = [];

    for (let j = 0; j < str.length; j++) {
      const s = str[j];

      if (!can.includes(s)) {
        continue;
      }

      if (s === skill[0]) {
        stack.push(s);
        continue;
      }

      if (before[s] !== stack[stack.length - 1]) {
        flag = false;
        break;
      }

      stack.push(s);
    }

    if (flag) result += 1;
  }

  return result;
}

// * 다른 사람 풀이 - 정규표현식
// skill_trees 순회 (str)
// str에서 CBD 아닌 것들은 제외 (str = str.replace(/[^CBD]/g, ''))
// 다음 조건을 만족하는 str 개수 구하기
//  str.length = 0 || skill.indexOf(str) === 0
function solution(skill, skill_trees) {
  // * 동적 입력에서 정규식을 빌드하려면 RegExp() 생성자의 첫 번째 인수로 문자열을 사용합니다.
  const reg = new RegExp(`[^${skill}]`, "g");

  return skill_trees
    .map((str) => str.replace(reg, ""))
    .filter((str) => (str.length = 0 || skill.indexOf(str) === 0)).length;
}
