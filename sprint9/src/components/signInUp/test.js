function test(isConfirming, value = 10, password = 1) {
  return isConfirming
    ? (value) => value === password && '비밀번호가 일치하지 않습니다.'
    : undefined;
}

const confirmPassword = test(true);
console.log(confirmPassword(1)); // true
console.log(confirmPassword(2)); // "비밀번호가 일치하지 않습니다."
//TODO: 나중에 삭제할 것

//NOTE: 함수 안에 함수가 있는 형태와 같음(고차함수). true/false를 반환하는게 아니라 truthy/falsy는 앞에서 판명되고,
//||: 앞의 연산이 false일 때 뒤에 값 출력
//&&: 앞의 연산이 true일 때 뒤에 값 출력
function getPasswordCheckFunction(isConfirming) {
  if (isConfirming) {
    return function (value) {
      if (value === password) {
        return true; // 또는 원하는 값을 반환할 수 있습니다.
      } else {
        return '비밀번호가 일치하지 않습니다.';
      }
    };
  } else {
    return undefined;
  }
}
