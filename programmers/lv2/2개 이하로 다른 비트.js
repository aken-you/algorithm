// https://school.programmers.co.kr/learn/courses/30/lessons/77885
// ! 실패 - 시간초과
// 수가 10^15까지 이므로, 2진수를 비교했을 때부터 이미 시간초과 났을 것
// num =  > x && 비트가 1~2개 다른 수들 중에서 제일 작은 수

// numbers 순회 (base)
// base보다 큰 수 순회 (bigger)
// bigger와 base를 2진수로 변환하고 다른 비트의 개수를 구함
// 만약 1~2개 차이난다면 result.push(bigger); break;
function solution(numbers) {
  var result = [];

  for (let i = 0; i < numbers.length; i++) {
    const base = numbers[i];

    let bigger = base + 1;

    // 제일 작은 수 구하기
    while (true) {
      let base2 = base.toString(2);
      let bigger2 = bigger.toString(2);

      // 비트 수 차이 계산
      const max = Math.max(base2.length, bigger2.length);
      base2 = base2.padStart(max, "0");
      bigger2 = bigger2.padStart(max, "0");
      let cnt = 0;

      for (let i = max - 1; i >= 0; i--) {
        if (cnt >= 3) break;
        if (base2[i] !== bigger2[i]) cnt++;
      }

      if (cnt > 0 && cnt <= 2) {
        result.push(bigger);

        break;
      }

      bigger += 1;
    }
  }

  return result;
}

// * 풀이
// numbers 순회 (base)
// base가 짝수라면 맨 끝자리가 0으로 끝나므로
//  맨 끝자리만 1로 바꿈
// base가 홀수라면 뒤에서 01로 끝나는 숫자를 찾는다
//  0 => 1, 1 => 0으로 바꾼다.
function solution(numbers) {
  var result = [];

  for (let i = 0; i < numbers.length; i++) {
    const base = numbers[i];
    const base2 = "0" + base.toString(2);

    if (base % 2 === 0) {
      result.push(parseInt(base2.slice(0, base2.length - 1) + "1", 2));
    } else {
      const lastIndex = base2.lastIndexOf("01");

      const num2 =
        base2.slice(0, lastIndex) + "10" + base2.slice(lastIndex + 2);

      result.push(parseInt(num2, 2));
    }
  }

  return result;
}
