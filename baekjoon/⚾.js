// https://www.acmicpc.net/problem/17281
// ! 실패
// - 구조분해할당으로 배열 자체를 재할당했더니 시간초과났음 => 기존에 있는 배열 재사용하기

// N이닝
//    3아웃 => 이닝 종료

// 1~9번 타자
// 1번: 4번 타자

// 주자: 루에 있는 선수
//    이닝 시작 => 주자 x

// return 최고 득점

const inputs = require("fs").readFileSync("./dev/stdin").toString().split("\n");

const N = Number(inputs[0]);
const innings = inputs.slice(1).map((inning) => inning.split(" ").map(Number));

let max = 0;
let base1 = 0;
let base2 = 0;
let base3 = 0;

// 모든 타순의 경우의 수를 돌면서 최고 점수 구하기
const startGame = (playerOrder) => {
  let totalScore = 0; // 총 점수
  let nextPlayerIdx = 0;

  for (let i = 0; i < N; i++) {
    base1 = 0;
    base2 = 0;
    base3 = 0;

    let out = 0;

    while (out < 3) {
      const player = playerOrder[nextPlayerIdx % 9];
      const num = innings[i][player];

      switch (num) {
        case 0: // 아웃
          out += 1;
          break;
        case 1: // 1루타
          totalScore += base3;

          base3 = base2;
          base2 = base1;
          base1 = 1;
          break;
        case 2: // 2루타
          totalScore += base3 + base2;

          base3 = base1;
          base2 = 1;
          base1 = 0;
          break;
        case 3: // 3루타
          totalScore += base3 + base2 + base1;

          base3 = 1;
          base2 = 0;
          base1 = 0;
          break;
        case 4: // 홈런
          totalScore += base3 + base2 + base1 + 1;

          base3 = 0;
          base2 = 0;
          base1 = 0;
          break;
      }

      nextPlayerIdx += 1;
    }
  }

  max = Math.max(totalScore, max);
};

// 타순의 모든 경우의 수 구하기

const hitter = new Array(9).fill(-1);
hitter[3] = 0; // 1번 선수 4번 타자로 고정

const getPermutations = (playerNumber) => {
  if (playerNumber === 9) {
    startGame(hitter);
    return;
  }

  for (let i = 0; i < 9; i++) {
    if (hitter[i] !== -1) continue;

    hitter[i] = playerNumber; // 타순에 선수 배치
    getPermutations(playerNumber + 1); // 다음 선수 배치
    hitter[i] = -1; // 타순 초기화
  }
};

getPermutations(1);
console.log(max);
