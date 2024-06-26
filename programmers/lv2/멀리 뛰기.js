// * 틀린 내 풀이
// 한 번에 1칸 or 2칸
// return 끝에 도달하는 경우의 수 % 1234567

function factorial(n) {
  if (n === 0) return 1;

  let result = 1;
  let num = 1;

  while (num <= n) {
    result *= num;
    num++;
  }

  return result;
}

function combination(a, b) {
  if (b === 0 || a === b) return 1;
  return factorial(a) / (factorial(b) * factorial(a - b));
}

// 2의 갯수는 1개씩 늘어나고, 2가 위치할 경우의 수는 1씩 줄어든다.
// b가 Math.floor(n/2)일때까지 반복

function solution(n) {
  let result = 0;
  let a = n;
  let b = 0;

  while (2 * b <= n) {
    result += combination(a, b);

    a -= 1;
    b += 1;
  }

  return result % 1234567;
}
