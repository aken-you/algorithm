// 0~arr1.length-1까지 순회 (i)
//  0~arr2[0].length-1까지 순회(j)
//      sum = 0 초기화
//   0~arr1[0].length-1까지 순회(k)
//      sum+=arr1[i][k] * arr2[k][j]
//   result[i][j] = sum;

// 시간복잡도: O(n^3)

function solution(arr1, arr2) {
  const n = arr1.length;
  const m = arr2[0].length;
  const answer = Array.from({ length: n }, () => new Array(m));

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2[0].length; j++) {
      let sum = 0;

      for (let k = 0; k < arr1[0].length; k++) {
        sum += arr1[i][k] * arr2[k][j];
      }

      answer[i][j] = sum;
    }
  }

  return answer;
}
