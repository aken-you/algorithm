// https://school.programmers.co.kr/learn/courses/30/lessons/17680?language=javascript#

// * 첫 번째 풀이 - 통과 x
// ! LRU 개념 모름, 예외사항 생각 못함
// ! 예외사항 예시: 캐시 크기가 4일 때 1,2,3,1,4,5일 경우
// 캐시 크기에 따른 실행시간 측정
// 도시 이름: 영문자, 대소문자 구분 x

// cache hit: 1
// cache miss: 5

// 1. cities를 순회한다.
// 2. cache에 현재 도시가 있는지 확인한다.
//  있다면, 실행시간 += 1
//  없다면, 실행시간 += 5
// 3. 현재 캐시 크기가 cacheSize라면 cache에 맨 앞에 있는 요소를 삭제하고 현재 도시를 추가
//  현재 캐시 크기가 cacheSize보다 작다면 캐시에 현재 도시 추가

function solution(cacheSize, cities) {
  let result = 0;
  const cache = [];

  if (cacheSize === 0) {
    return cities.length * 5;
  }

  cities.forEach((city) => {
    if (cache.includes(city.toLowerCase())) {
      result += 1;
    } else {
      result += 5;
    }

    if (cache.length === cacheSize) cache.shift();
    cache.push(city.toLowerCase());
  });

  return result;
}

// * 예외 처리 함
// 캐시 크기에 따른 실행시간 측정
// 도시 이름: 영문자, 대소문자 구분 x

// cache hit: 1
// cache miss: 5

// 1. cities를 순회한다.
// 2. cache에 현재 도시가 있는지 확인한다.
//  ! 있다면, 실행시간 += 1로하고 cache에서 현재 도시의 위치를 업데이트 - 예외 처리
//  없다면, 실행시간 += 5
// 3. 현재 캐시 크기가 cacheSize라면 cache에 맨 앞에 있는 요소를 삭제하고 현재 도시를 추가
//  현재 캐시 크기가 cacheSize보다 작다면 캐시에 현재 도시 추가

// 시간 복잡도: O(cities.length * cache.length * c.length) = O(100000 * 30 * 20)

function solution(cacheSize, cities) {
  let result = 0;
  let cache = [];

  if (cacheSize === 0) {
    return cities.length * 5;
  }

  cities.forEach((city) => {
    const c = city.toLowerCase();
    let index = cache.indexOf(c);

    if (index > -1) {
      result += 1;
      cache.splice(index, 1);
    } else {
      result += 5;
    }

    if (cache.length === cacheSize) cache.shift();
    cache.push(c);
  });

  return result;
}
