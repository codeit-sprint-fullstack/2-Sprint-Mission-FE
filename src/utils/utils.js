/**
 * 천의 자리마다 ,를 붙여주는 함수
 *
 * @param {number} price
 * @returns {string}
 */
export function priceFunc(price) {
  if (typeof price !== 'number') return 'NaN';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * input이 empty한지 확인해주는 함수
 *
 * @param {*} input
 * @returns {boolean}
 */
export function isEmpty(input) {
  if (
    typeof input === 'undefined' ||
    input === null ||
    input === '' ||
    // input === "null" || // null 문자열. 필요에 따라 주석 해제
    input.length === 0 ||
    (typeof input === 'object' && !Object.keys(input).length)
  )
    return true;
  else return false;
}
