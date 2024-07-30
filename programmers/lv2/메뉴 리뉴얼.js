// https://school.programmers.co.kr/learn/courses/30/lessons/72411
// ! 실패
// 단품 메뉴 조합
// 가장 많이 함께 주문한 단품메뉴
// 최소 2가지 이상의 단품
// 최소 2명 이상의 손님이 주문한 단품 메뉴 조합만 포함
// return "코스요리 메뉴 구성"
//  각 원소에 저장된 문자열 또한 알파벳 오름차순
//  만약 가장 많이 함께 주문된 메뉴 구성이 여러 개라면, 모두 배열에 담기

// 시간복잡도: orders.length * (2^(orders 요소 길이)) * course.length = 20 * (2^(10)) * 10
// 조합

function combination(arr, selectedNum) {
  if (selectedNum === 1) return arr.map((e) => [e]);

  const result = [];

  arr.forEach((fixed, idx, origin) => {
    const rest = origin.slice(idx + 1);
    // ! 아직 선별되지 않은 요소들(rest) 중 선택하기 위해 첫 번째 인수로 rest 넘겨주기
    const coms = combination(rest, selectedNum - 1);
    // ! fixed를 가장 우선으로 뽑은 요소이므로 맨 앞에 위치 (단, 문제에서 알파벳 오름차순으로 정렬)
    const attached = coms.map((c) => [fixed, ...c].sort().join(""));

    result.push(...attached);
  });

  return result;
}

// course 순회 (cnt = course[i])
//  orders 순회 (str = orders[j])
//    str에서 cnt개를 선택한 조합 구하기
//    조합 결과들을 word에 저장
//  조합 결과들 중 values가 가장 큰 값 찾기
//    만약 큰 값 < 2이면 다음 cnt로 넘어가기
//  큰 값과 value가 같은 key를 result에 추가

function solution(orders, course) {
  let answer = [];

  for (let i = 0; i < course.length; i++) {
    const cnt = course[i];
    const combinationCnt = {};

    // cnt
    for (let j = 0; j < orders.length; j++) {
      const str = orders[j];
      const combinations = combination(str.split(""), cnt);

      combinations.forEach(
        (c) => (combinationCnt[c] = (combinationCnt[c] || 0) + 1)
      );
    }

    const max = Math.max(...Object.values(combinationCnt));

    if (max < 2) continue;

    for (const [key, value] of Object.entries(combinationCnt)) {
      if (value === max) answer.push(key);
    }
  }

  answer.sort();
  return answer;
}
