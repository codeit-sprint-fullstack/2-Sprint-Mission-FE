function minMaxLength(min: number, max: number) {
  return {
    minLength: { value: min, message: `최소 ${min}자 이상 입력해주세요` },
    maxLength: { value: max, message: `최대 ${max}자까지 입력할 수 있습니다` }
  };
}

export const AUTH = {
  EMAIL: {
    required: "이메일을 입력해 주세요",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/,
      message: "유효한 이메일이 아닙니다"
    }
  },
  PASSWORD: {
    required: "비밀번호를 입력해 주세요",
    pattern: {
      value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
      message: "영문 대소문자, 숫자, 특수문자(!@#$%^&*) 입력 가능합니다"
    },
    ...minMaxLength(8, 14)
  },
  NICKNAME: {
    required: "닉네임을 입력해 주세요",
    ...minMaxLength(1, 20)
  },
  CONFIRM_PW: {
    required: "확인 비밀번호를 입력해 주세요",
    pattern: {
      value: /^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/,
      message: "영문 대소문자, 숫자, 특수문자(!@#$%^&*) 입력 가능합니다"
    },
    ...minMaxLength(8, 14)
  }
};

export const PRODUCT = {
  TITLE: {
    required: "제목을 입력해 주세요",
    pattern: {
      value: /^(?!\s*$).+/,
      message: "빈 문자열이나 공백은 입력할 수 없습니다"
    },
    ...minMaxLength(1, 50)
  },
  CONTENT: {
    required: "내용을 입력해 주세요",
    pattern: {
      value: /^(?!\s*$).+/,
      message: "빈 문자열이나 공백은 입력할 수 없습니다"
    },
    ...minMaxLength(1, 500)
  },
  PRICE: {
    required: "가격을 입력해 주세요",
    pattern: {
      value: /^(?!\s*$)\d+$/,
      message: "숫자만 입력해 주세요"
    },
    ...minMaxLength(1, 10)
  },
  TAG: {
    required: "태그를 입력해 주세요",
    pattern: {
      value: /^(?!\s*$)[^,\s]+(,[^,\s]+)*$/,
      message: "쉼표로 구분해서 입력해주세요"
    },
    ...minMaxLength(1, 50)
  }
};
