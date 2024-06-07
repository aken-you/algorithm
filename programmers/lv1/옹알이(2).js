// 연속해서 같은 발음 x
// 발음할 수 있는 단어의 개수

// 1. babbling을 순회한다. (s)
// 2. s를 순회한다. (i)
// 3. 이후 발음이 네가지 발음에 해당한다면, 이전 발음과 이후 발음을 비교
//  a. 동일하지 않다면, 이전 발음 = 이후 발음, 이후 발음 = ''
//  b. 동일하면, 발음할 수 없음
// 4. 이후 발음이 남아있다면 flag = false;

// 시간복잡도: O(babbling 길이 * babbling[i] 길이 * can 길이) = O(100 * 30 * 4)

function solution(babbling) {
  let cnt = 0;
  const can = ["aya", "ye", "woo", "ma"];

  babbling.forEach((s) => {
    let before = "";
    let current = "";
    let flag = true;

    for (let i = 0; i < s.length; i++) {
      current += s[i];

      if (can.includes(current)) {
        if (before === current) {
          flag = false;
          break;
        } else {
          before = current;
          current = "";
        }
      }
    }

    if (current.length !== 0) flag = false;

    if (flag) cnt++;
  });

  return cnt;
}
