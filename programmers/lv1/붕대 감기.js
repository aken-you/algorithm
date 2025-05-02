// https://school.programmers.co.kr/learn/courses/30/lessons/250137

// t초 붕대 + 1초마다 x만큼 회복 (+ t초 연속으로 붕대 성공하면 y 회복)
//  최대 체력 존재
//  공격 당하면, 기술 취소 + 체력 회복 x + 체력 -= 피해량
//      => 공격 끝나면 다시 붕대 감기, 연속 시간 0
//  체력 0 이하면 die
//  return 모든 공격이 끝난 직후 남은 체력
//      죽으면 -1

// health: 최대 체력
function solution(bandage, health, attacks) {
  const [t, x, y] = bandage;

  const endTime = attacks[attacks.length - 1][0];
  let time = 0;
  let currentH = health;
  let cnt = 0; // 연속 성공 횟수

  while (time < endTime) {
    // 시간 증가
    time += 1;
    // time에 공격이 있는지 확인
    const attack = attacks.find((arr) => arr[0] === time);

    //  공격 당하면, 기술 취소 + 체력 회복 x + (체력 -= 피해량)
    if (attack) {
      currentH -= attack[1];
      cnt = 0;

      // 만약 체력이 0이하면, die
      if (currentH <= 0) return -1;
      continue;
    }

    // t초 붕대 + 1초마다 x만큼 회복 (+ t초 연속으로 붕대 성공하면 y 회복)
    cnt += 1;
    currentH += x;
    if (cnt % t === 0 && cnt > 0) {
      currentH += y;
      cnt = 0;
    }

    currentH = currentH >= health ? health : currentH;
  }

  return currentH;
}
