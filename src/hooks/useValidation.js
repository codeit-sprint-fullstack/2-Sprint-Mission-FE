export default function useValidation() {
  const validationFunc = (name, value) => {
    switch (name) {
      case 'name':
        return nameValidation(value);
      case 'description':
        return descriptionValidation(value);
      case 'price':
        return priceValidation(value);
      case 'tag':
        return tagValidation(value);
      default:
        return 'Invalid input name';
    }
  };

  return validationFunc;
}

function nameValidation(value) {
  let errMsg;
  if (!value?.trim?.()) {
    errMsg = '1자 이상 입력해주세요';
  } else if (value?.length > 10) {
    errMsg = '10자 이내로 입력해주세요';
  } else {
    errMsg = '';
  }

  return errMsg;
}

function descriptionValidation(value) {
  let errMsg;
  if (value?.trim?.().length <= 10) {
    errMsg = '10자 이상 입력해주세요';
  } else if (value?.length > 100) {
    errMsg = '100자 이내로 입력해주세요';
  } else {
    errMsg = '';
  }

  return errMsg;
}

function priceValidation(value) {
  const p = Number(value);
  let errMsg;
  if (!p) {
    errMsg = '숫자로 입력해주세요';
  } else if (p < 0) {
    errMsg = '양수로 입력해주세요';
  } else {
    errMsg = '';
  }

  return errMsg;
}

function tagValidation(value) {
  let errMsg;
  if (value?.length > 5) {
    errMsg = '5글자 이내로 입력해주세요';
  } else {
    errMsg = '';
  }

  return errMsg;
}
