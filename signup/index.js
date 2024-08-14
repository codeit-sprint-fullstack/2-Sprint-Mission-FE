// 이메일 입력상태 함수
function validateEmail() {
  const elInputEmail = document.querySelector('#email');
  const blankEmailError = document.querySelector('.blank-email-error');
  const emailError = document.querySelector('.email-error');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (elInputEmail.value.length === 0) {
    blankEmailError.style.display = 'block';
    elInputEmail.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    emailError.style.display = 'none';
    return false;
  } else if (elInputEmail.value.length > 0 && !emailPattern.test(elInputEmail.value)) {
    blankEmailError.style.display = 'none';
    elInputEmail.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    emailError.style.display = 'block';
    return false;
  } else {
    blankEmailError.style.display = 'none';
    elInputEmail.style.cssText = 'none';
    emailError.style.display = 'none';
    return true;
  }
}

// 비밀번호 입력상태 함수
function validatePassword() {
  const elInputPassword = document.querySelector('#password');
  const blankPasswordError = document.querySelector('.blank-password-error');
  const passwordError = document.querySelector('.password-error');

  if (elInputPassword.value.length === 0) {
    blankPasswordError.style.display = 'block';
    elInputPassword.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    passwordError.style.display = 'none';
    return false;
  } else if (elInputPassword.value.length < 8) {
    blankPasswordError.style.display = 'none';
    elInputPassword.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    passwordError.style.display = 'block';
    return false;
  } else {
    blankPasswordError.style.display = 'none';
    elInputPassword.style.cssText = 'nane;';
    passwordError.style.display = 'none';
    return true;
  }
}

// 비밀번호 확인 입력상태 함수
function validateConfirmPassword() {
  const elInputPassword = document.querySelector('#password');
  const elInputConfirmPassword = document.querySelector('#confirm-password');
  const confirmPasswordError = document.querySelector('.confirm-password-error');
  const rewritePasswordError = document.querySelector('.rewrite-password-error');
  
  if (elInputConfirmPassword.value.length === 0) {
    rewritePasswordError.style.display = 'block';
    elInputConfirmPassword.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    confirmPasswordError.style.display = 'none';
    return false
  } else if (elInputPassword.value !== elInputConfirmPassword.value) {
    rewritePasswordError.style.display = 'none';
    elInputConfirmPassword.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    confirmPasswordError.style.display = 'block';
    return false;
  } else {
    confirmPasswordError.style.display = 'none';
    elInputConfirmPassword.style.cssText = 'none';
    rewritePasswordError.style.display = 'none';
    return true;
  }
}

// 버튼 활성화
function buttonActivation() {
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  const confirmPasswordValid = validateConfirmPassword();
  const signupButton = document.querySelector('#signup-button');
  let formValid = true;

  if(emailValid && passwordValid && confirmPasswordValid) {
    signupButton.disabled = !formValid;
  } else {
    signupButton.disabled = formValid;
  }
}

// 회원가입버튼 클릭시 login페이지로 이동
function goUrl() {
  location.href = '/login';
}

document.querySelector('#email').addEventListener('focusout',validateEmail);// 이메일 입력상태 호출
document.querySelector('#password').addEventListener('focusout',validatePassword); // 비밀번호 입력상태 호출
document.querySelector('#confirm-password').addEventListener('focusout',validateConfirmPassword);// 비밀번호확인 입력상태 호출
document.querySelector('#signup-button').addEventListener('click',goUrl);






