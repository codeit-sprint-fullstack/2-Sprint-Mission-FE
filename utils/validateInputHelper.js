import validator from "validator";
import { FIELD_TYPES, VALIDATION_STATE } from "@/constants";
const { NAME, DESCRIPTION, PRICE, TAG, EMAIL, PASSWORD } = FIELD_TYPES;
const { SUCCESS, FALSE } = VALIDATION_STATE;
export const changeInputValue = (setFn, inputField, value) => {
  setFn((prev) => ({
    ...prev,
    [inputField]: value
  }));
};
export const validateField = (
  setValiateFn,
  setErrorMessageFn,
  name,
  value,
  tagList = []
) => {
  const changeState = (validation, message) => {
    setErrorMessageFn((prev) => ({
      ...prev,
      [name]: message
    }));
    setValiateFn((prev) => ({
      ...prev,
      [name]: validation
    }));
  };
  function isInteger(value) {
    // 숫자 타입일 경우
    if (typeof value === "number") {
      return Number.isInteger(value);
      //return true;
    }
    if (typeof value === "string") {
      // 문자열이 정수로 변환 가능한지 체크
      const trimmedValue = value.trim(); // 공백 제거
      const parseIntValue = parseInt(trimmedValue);
      const result =
        !isNaN(parseIntValue) && parseIntValue.toString() === trimmedValue;
      return result;
    }
    return false;
  }
  switch (name) {
    case NAME:
      if (value.length < 1) changeState(FALSE, "1글자 이상 입력하세요");
      else if (value.length > 10)
        changeState(FALSE, "10글자 이내로 입력하세요");
      else changeState(SUCCESS, "");
      break;
    case DESCRIPTION:
      if (value.length < 10) changeState(FALSE, "10글자 이상 입력하세요");
      else if (value.length > 100)
        changeState(FALSE, "100글자 이내로 입력하세요");
      else changeState(SUCCESS, "");
      break;
    case PRICE:
      if (!isInteger(value)) changeState(FALSE, "정수를 입력해주세요");
      else if (Number(value) < 1) changeState(FALSE, "1이상의 값을 넣어주세요");
      else changeState(SUCCESS, "");
      break;
    case TAG:
      if (value.length < 1) changeState(FALSE, "1글자 이상 입력하세요");
      else if (value.length > 5) changeState(FALSE, "5글자 이내로 입력하세요");
      else if (tagList.includes(value))
        changeState(FALSE, "이미 등록된 태그 입니다");
      else changeState(SUCCESS, "");
      break;
    case EMAIL:
      if (value.length < 1) changeState(FALSE, "1글자 이상 입력하세요");
      else if (!validator.isEmail(value))
        changeState(FALSE, "이메일이 아닙니다");
      else changeState(SUCCESS, "");
      break;
    case PASSWORD:
      if (value.length < 8)
        changeState(FALSE, "비밀번호를 8자 이상 입력해주세요");
      else changeState(SUCCESS, "");
      break;
  }
};
