function validateTags(tags, tagValue) {
  if (tagValue.length > 5) {
    return {
      status: "ERROR",
      message: "5글자 이내로 입력해주세요"
    };
  } else if (tags.includes(tagValue))
    return {
      status: "ERROR",
      message: "똑같은 태그가 이미 있습니다"
    };
  else
    return {
      status: "PASS",
      message: ""
    };
}
export default validateTags;
