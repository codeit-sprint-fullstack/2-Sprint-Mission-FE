function validateName(name) {
  if (name.length === 0) {
    return {
      status: "ERROR",
      message: "상품명을 입력해주세요"
    };
  } else if (name.length > 10) {
    return {
      status: "ERROR",
      message: "10자 이내로 입력해주세요"
    };
  } else
    return {
      status: "PASS",
      message: ""
    };
}
export default validateName;
