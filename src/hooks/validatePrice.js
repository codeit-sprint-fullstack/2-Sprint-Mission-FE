function validatePrice(price) {
  if (Number.isInteger(price) && price > 0)
    return {
      status: "PASS",
      message: ""
    };
  else if (price <= 0)
    return {
      status: "ERROR",
      message: "가격은 0보다 커야합니다"
    };
  else
    return {
      status: "ERROR",
      message: "숫자로 입력해주세요"
    };
}
export default validatePrice;
