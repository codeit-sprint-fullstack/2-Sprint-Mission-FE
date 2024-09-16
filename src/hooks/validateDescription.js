function validateDescription(description) {
  if (description.length < 10)
    return {
      status: "ERROR",
      message: "10자 이상 입력해주세요"
    };
  else if (description.length > 100)
    return {
      status: "ERROR",
      message: "100자 이내로 입력해주세요"
    };
  else
    return {
      status: "PASS",
      message: ""
    };
}
export default validateDescription;
