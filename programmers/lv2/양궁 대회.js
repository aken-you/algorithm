// https://school.programmers.co.kr/learn/courses/30/lessons/92342
// !실패

// 어피치와 라이언 총 점수 계산
function calculate(apeachInfo, ryanInfo) {
  let apeachScore = 0;
  let ryanScore = 0;

  for (let i = 0; i < apeachInfo.length; i++) {
    const aScore = apeachInfo[i];
    const bScore = ryanInfo[i];
    const k = 10 - i;

    if (aScore === 0 && bScore === 0) continue;

    if (aScore >= bScore) apeachScore += k;
    else ryanScore += k;
  }

  return [apeachScore, ryanScore];
}

// 가장 낮은 점수를 더 많이 맞힌 경우 판별
function hasSmallerScore(baseArr, arr) {
  for (let i = 10; i >= 0; i--) {
    if (baseArr[i] === arr[i]) continue;
    else if (baseArr[i] < arr[i]) return true;
    else return false;
  }
}

// n: 화살의 개수
function solution(n, info) {
  let maxDiff = 0;
  let answer = new Array(11).fill(0);

  // 사용한 화살 개수, 현재 점수, 라이언 화살 정보
  const dfs = (usedCnt, currentScore, ryanInfo) => {
    if (currentScore === 10 && usedCnt < n) {
      ryanInfo[currentScore] = n - usedCnt; // 남은 화살 모두 사용
      usedCnt = n;
    }

    if (usedCnt === n) {
      const [apeachScore, ryanScore] = calculate(info, ryanInfo);
      const diff = ryanScore - apeachScore;

      if (maxDiff < diff) {
        maxDiff = diff;
        answer = ryanInfo;
      } else if (maxDiff === diff) {
        // 가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지 일 경우
        // return 가장 낮은 점수를 더 많이 맞힌 경우
        if (hasSmallerScore(answer, ryanInfo)) answer = ryanInfo;
      }

      return;
    }

    const apeachCnt = info[currentScore]; // 어피치가 현재 점수에 쏜 화살 수

    // * 라이언이 점수 획득한 경우: 어피치보다 한 개 더 맞춤
    const rest = n - usedCnt;

    if (rest >= apeachCnt + 1) {
      ryanInfo[currentScore] = apeachCnt + 1;
      dfs(usedCnt + apeachCnt + 1, currentScore + 1, [...ryanInfo]);
      ryanInfo[currentScore] = 0; // 초기화
    }

    // 라이언이 현재 점수를 안맞춘 경우
    dfs(usedCnt, currentScore + 1, [...ryanInfo]);
  };

  dfs(0, 0, new Array(11).fill(0));

  return maxDiff === 0 ? [-1] : answer;
}

// !실패
function whoIsWinner(apeach, ryan) {
  let aScore = 0;
  let rScore = 0;

  for (let i = 0; i < apeach.length; i++) {
    const aCnt = apeach[i];
    const rCnt = ryan[i];

    const score = 10 - i;

    if (aCnt > rCnt) aScore += score;
    else if (aCnt < rCnt) rScore += score;
    else {
      if (aCnt === 0 && rCnt === 0) continue;

      aScore += score;
    }
  }

  if (aScore >= rScore) return { winner: "apeach", diff: aScore - rScore };

  return { winner: "ryan", diff: rScore - aScore };
}

function getLower(arr1, arr2) {
  for (let i = arr1.length - 1; i >= 0; i--) {
    if (arr1[i] > arr2[i]) {
      return arr1;
    } else if (arr1[i] < arr2[i]) {
      return arr2;
    } else {
      continue;
    }
  }

  return arr1;
}

function solution(n, info) {
  let answer = [];
  let maxDiff;

  const arr = new Array(11).fill(0);

  function dfs(currentIdx, remain) {
    if (currentIdx === 10) {
      arr[currentIdx] = remain;

      const { winner, diff } = whoIsWinner(info, arr);

      if (winner === "ryan") {
        if (maxDiff === undefined || maxDiff < diff) {
          maxDiff = diff;
          answer = [...arr];
        } else if (maxDiff === diff) {
          answer = [...getLower(answer, arr)];
        }
      }

      // 초기화
      arr[currentIdx] = 0;

      return;
    }

    const aCnt = info[currentIdx];
    const need = aCnt + 1;

    // * 화살을 쏠 수 있을 경우
    if (remain >= need) {
      arr[currentIdx] = need;
      dfs(currentIdx + 1, remain - need);
      arr[currentIdx] = 0;
    }

    // * 화살을 쏘지 않는 경우
    dfs(currentIdx + 1, remain);
  }

  dfs(0, n);

  return answer.length === 0 ? [-1] : answer;
}
