/**
 * 천의 자리마다 ,를 붙여주는 함수
 *
 * @param {number} price
 * @returns {string}
 */
export function toPriceString(price) {
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

function isValidDateOrDateString(val) {
  // NOTE 유효한 Date 객체인가?
  if (val instanceof Date && !isNaN(val)) return true;

  // NOTE 유효한 날짜 형식의 string인가? - 이 경우 ISO 8601 형식인가?
  if (typeof val === 'string') {
    const timestamp = Date.parse(val);
    if (!isNaN(timestamp)) {
      const date = new Date(timestamp);
      return date.toISOString().startsWith(val) || /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/.test(val);
    }
  }

  return false;
}

/**
 * Date 객체나 날짜 형식 string을 '년. 월. 일' 형식으로 변경
 *
 * @param {Date|string} value
 * @returns {string}
 */
export function toDateString(value) {
  if (!isValidDateOrDateString(value)) return null;

  // NOTE value가 string이면 Date 객체로 변환
  const date = value instanceof Date ? value : new Date(value);

  // NOTE 년 월 일 추출. 월 일의 경우 1자리면 0을 채운다.
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}. ${month}. ${day}`;
}
