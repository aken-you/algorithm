// https://school.programmers.co.kr/learn/courses/30/lessons/92334

// k번 이상 신고 => 정지 => 정지 사실을 신고한 유저에게 발송
// 동일한 유저에 대한 신고 횟수 = 1회
// return 처리 결과 메일 받은 횟수

// report 순회
// 이용자id가 신고한id를 userReport에 저장
// 신고한id 신고횟수 1 증가 (badCnt[신고한id index] += 1)

// 신고 횟수가 담긴 배열을 순회
// k 이상인 id 찾기

// userReport 순회
// value인 set에 k이상인 id의 개수를 answer에 저장

// * 시간복잡도: O(N^2)

function solution(id_list, report, k) {
  const answer = new Array(id_list.length).fill(0);
  const idMap = {};

  id_list.forEach((e, idx) => (idMap[e] = idx));

  const userReport = Array.from({ length: id_list.length }, () => new Set()); // 유저가 신고한 id를 Set에 저장
  const badCnt = new Array(id_list.length).fill(0);

  // report 순회
  // 이용자id가 신고한id를 userReport에 저장
  // 신고한id 신고횟수 1 증가 (badCnt[신고한id index] += 1)
  for (let str of report) {
    const [a, b] = str.split(" ");

    const aIdx = idMap[a];
    const bIdx = idMap[b];

    if (!userReport[aIdx].has(bIdx)) {
      userReport[aIdx].add(bIdx);
      badCnt[bIdx] += 1;
    }
  }

  // 신고 횟수가 담긴 배열(badCnt)을 순회
  // k 이상인 id 찾기
  const out = new Set(); // k 이상인 id가 담김

  for (let i = 0; i < badCnt.length; i++) {
    const cnt = badCnt[i];

    if (cnt >= k) out.add(i);
  }

  // userReport 순회
  // value인 set에 k이상인 id의 개수를 answer에 저장
  userReport.forEach((badSet, idx) => {
    const arr = [...badSet];

    answer[idx] = arr.filter((e) => out.has(e)).length;
  });

  return answer;
}

// * 다른 풀이

// 시간복잡도: O(N)
function solution(id_list, report, k) {
  // 동일한 유저를 여러번 신고하면 1회로 처리되기 때문에 Set처리
  const reports = [...new Set(report)].map((str) => str.split(" "));

  const cnts = new Map(); // 신고 받은 횟수 저장

  for (const users of reports) {
    cnts.set(users[1], cnts.get(users[1]) + 1 || 1);
  }

  const userReport = new Map();

  for (const users of reports) {
    if (cnts.get(users[1]) >= k) {
      userReport.set(users[0], userReport.get(users[0]) + 1 || 1);
    }
  }

  const answer = id_list.map((user) => userReport.get(user) || 0);

  return answer;
}
