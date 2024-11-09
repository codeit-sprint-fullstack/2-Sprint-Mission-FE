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

/**
 * Base64Url 형식을 Base64 형식으로
 *
 * @param {string} b64u
 * @returns {string}
 */
function b64uTob64(b64u) {
  let b64 = b64u.split('-').join('+').split('_').join('/');

  // NOTE Base64 형식은 4의 배수 길이를 가져야함.
  while (b64 % 4 > 0) b64 += '=';

  return b64;
}

/**
 * JWT 토큰을 파싱하는 함수
 *
 * @param {jwt} token
 * @returns {{ header: object; payload: object; signature: object; }}
 */
export function parsingJWT(token) {
  try {
    // NOTE token을 구분자(.)을 이용해서 쪼갬
    const splittedToken = token.split('.');
    if (splittedToken.length !== 3) throw new Error('input is not jwt');

    // NOTE b64u 형식인 각 파트를 b64로 변경한 후, decode
    const header = JSON.parse(atob(b64uTob64(splittedToken[0])));
    const payload = JSON.parse(atob(b64uTob64(splittedToken[1])));
    const signature = splittedToken[2];

    return { header, payload, signature };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * jwt를 파싱해서 토큰이 만료됐는지 확인하는 함수
 *
 * @param {jwt} token
 * @returns {boolean}
 */
export function isTokenExpired(token) {
  // NOTE token이 없거나 jwt 토큰 형식이지만 payload나 exp가 없으면 만료된 것으로 간주한다.
  if (!token) return true;
  const { payload } = parsingJWT(token);
  if (!payload || !payload.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000); // Unix time 형식의 현재 시간
  return payload.exp < currentTime;
}
