export const setError = (inputName, inputError, message) => {
  inputName.classList.add('fail');
  inputName.classList.remove('pass');
  inputError.value = message;
}

export const clearError = (inputName, inputError) => {
  inputName.classList.remove('fail');
  inputName.classList.add('pass');
  inputError.value = '';
}