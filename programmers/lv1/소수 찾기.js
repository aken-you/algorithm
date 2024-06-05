// * 첫 번째 풀이 - 통과 x

// 1. 2~n까지 순환 (num)
// 2. 2~Math.sqrt(num)까지 순환 (i)
// 3. num%i === 0이라면, flag = true로 하고 2번 순환 break;
// 4. flag === false일 경우 cnt++;

// 시간복잡도: O(n * sqrt(n))

function solution(n) {
  let cnt = 0;

  for (let num = 2; num <= n; num++) {
    let flag = false;

    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        flag = true;
        break;
      }
    }

    if (flag === false) {
      cnt++;
    }
  }

  return cnt;
}

// 에라토스테네스의 체
// 나누는 숫자와 몫 중 하나는 무조건 sqrt(n) 이하
function solution(n) {
  const isPrime = new Array(n + 1).fill(true);

  // 0, 1은 소수가 아니므로 false
  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (isPrime[i] === false) continue;

    // i의 배수는 소수가 아니므로 false
    for (let j = i * 2; j <= n; j += i) {
      isPrime[j] = false;
    }
  }

  return isPrime.filter((b) => b === true).length;
}
