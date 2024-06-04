// 더해서 만들 수 있는 모든 수 경우를 배열로 (오름차순)

// result = new Set()
// 1. 인덱스 0부터 순환한다.(i)
// 2. 인덱스 i+1부터 마지막까지 순환한다. (j)
// 3. numbers[i] + numbers[j]가 result에 없다면, push한다.
// 4. 마지막으로 오름차순으로 정렬한다.

// 시간 복잡도: O(n^2logn)
// for문 두 번 + Set 객체의 has는 O(1)
// result의 크기가 최악의 경우 n^(n-1)
// 따라서 sort를 사용하면 O(n^2log(n^2)) = O(n^2logn)

function solution(numbers) {
  const result = new Set();

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];

      result.add(sum);
    }
  }

  return [...result].sort((a, b) => a - b);
}
