// https://school.programmers.co.kr/learn/courses/30/lessons/62048
// !다시 풀어보기

// w * h - 대각선에 포함되는 사각형 수

function solution(w, h) {
  let answer = BigInt(w * h);
  let cnt = 0;

  const stack = [[0, 0]];

  while (stack.length) {
    const [x, y] = stack.pop();
    const nx = x + 1;

    const ny = Math.floor((h * nx) / w);

    cnt += Math.ceil((h * nx) / w) - y;

    if (nx > w - 1 || ny > h - 1) continue;

    stack.push([nx, ny]);
  }

  return BigInt(answer) - BigInt(cnt); // answer가 큰 숫자일 경우 BigInt로 변환
}

// * 다른 풀이
// 최대공약수
function solution(w, h) {
  const gcd = (a, b) => (a % b === 0 ? b : gcd(b, a % b));
  let cnt = w + h - gcd(w, h); // 대각선에 포함되는 사각형 수

  return w * h - cnt;
}
