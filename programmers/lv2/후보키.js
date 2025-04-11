// https://school.programmers.co.kr/learn/courses/30/lessons/42890
// !실패

// 후보키: 유일성과 최소성을 만족
// return 후보키의 개수

// 유일성
// 속성으로 relation이 중복될 경우, true를 반환
function checkUniqueness(relation, combi) {
  const rowSet = new Set();

  for (let i = 0; i < relation.length; i++) {
    const row = relation[i];
    const value = combi.map((a) => row[a]).join("-");

    if (rowSet.has(value)) return false;

    rowSet.add(value);
  }

  return true;
}

function checkMinimality(candidates, combi) {
  let flag = true;

  candidates.forEach((candidate) => {
    // 후보키가 combi에 포함될 때 => 후보키 x
    if (candidate.every((e) => combi.includes(e))) {
      flag = false;
      return;
    }
  });

  return flag;
}

function solution(relation) {
  let answer = new Set();

  const M = relation[0].length;
  const checked = new Array(M).fill(false);

  const combis = []; // 모든 조합의 경우의 수

  const getCombis = (cols, num = 0) => {
    for (let i = num; i < M; i++) {
      combis.push([...cols, i]);
      getCombis([...cols, i], i + 1);
    }
  };

  getCombis([]);
  // 꼭 필요한 속성들로만 구성하기 위해, 속성들의 개수가 작은 조합부터 확인
  combis.sort((a, b) => a.length - b.length); // !정렬하지 않아서 계속 통과 못했음

  combis.forEach((combi) => {
    const unique = checkUniqueness(relation, combi);

    if (unique) {
      const minimality = checkMinimality([...answer], combi);
      if (minimality) answer.add(combi);
    }
  });

  return answer.size;
}
