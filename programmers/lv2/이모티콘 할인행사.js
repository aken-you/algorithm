// https://school.programmers.co.kr/learn/courses/30/lessons/150368

// n명에게 m개 할인 판매 10~40
// 일정 비율 이상 할인 => 모두 구매
// 이모티콘 구매 비용 합 >= 가격: 구매 취소. 플러스 가입
// return [플러스 가입자 수, 매출액]

// 목표
// 1. 플러스 사용자 최대
// 2. 판매액 최대

function solution(users, emoticons) {
  const n = users.length;
  const m = emoticons.length;

  // emoticons에 있는 이모티콘의 할인율 모든 경우의 수
  const permutations = [];

  const getPermutations = (arr) => {
    if (arr.length === m) {
      permutations.push(arr);
      return;
    }

    for (let i = 1; i <= 4; i++) {
      getPermutations([...arr, i * 10]);
    }
  };

  getPermutations([]);

  const answer = [0, 0];

  for (const permutaion of permutations) {
    // permutaion: 이모티콘 할인율 배열
    let plusCnt = 0;
    let totalPurchase = 0;

    // users 순회
    // user가 사는 이모티콘 가격 합 구하기
    for (const user of users) {
      const [limitPercent, limitPrice] = user;
      let price = 0;

      for (let i = 0; i < m; i++) {
        // 할인 퍼센트 이상인 이모티콘일 경우 구매
        if (permutaion[i] >= limitPercent)
          price += (1 - permutaion[i] / 100) * emoticons[i];
      }

      //  구매하는 가격 합 >= 구매 기준 가격, 플러스 구매
      if (price >= limitPrice) {
        // plus 구매
        plusCnt += 1;
      } else {
        totalPurchase += price;
      }
    }

    // 목표
    // 1. 플러스 사용자 최대
    // 2. 판매액 최대
    if (answer[0] < plusCnt) {
      answer[0] = plusCnt;
      answer[1] = totalPurchase;
    } else if (answer[0] === plusCnt) {
      if (answer[1] < totalPurchase) answer[1] = totalPurchase;
    }
  }

  return answer;
}
