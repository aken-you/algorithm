// https://leetcode.com/problems/two-sum/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = {}; // key: number, value: number가 있는 index 배열 (오름차순으로 정렬된 상태)

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (map[num] === undefined) map[num] = [i];
    else map[num] = [...map[num], i];
  }

  const keys = Object.keys(map)
    .map(Number)
    .sort((a, b) => a - b);

  for (let i = 0; i < keys.length; i++) {
    const num = keys[i];
    const diff = target - num;

    if (map[diff] === undefined) continue;

    if (num === diff) {
      return map[num];
    }

    return [map[num][0], map[diff][0]];
  }
};
