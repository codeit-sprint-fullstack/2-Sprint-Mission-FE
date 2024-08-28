import {
  USER_DATA,
  validateEmail, validatePassword, 
  setErrorMessage, setErrorMessageStyles, clearErrorMessage, 
  toggleButtonState, togglePasswordVisibility,
  handleLogin, handleSignup 
} from './module/authUtils.js';

// javascript를 불러올 때 defer 속성을 추가했기 때문에 'document.addEventListener('DOMContentLoaded', ...)'를  사용안함

/* 로그인/회원가입 버튼 초기 설정 및 상태 제어 */
const submitButton = document.querySelector('.btn_submit');
submitButton.disabled = true;  // 초기 상태는 비활성화

/* 이메일 오류 입력 방지 */
const emailInput = document.querySelector('#email');

if(emailInput) {
  // 동적으로 에러메시지 요소 생성
  const emailErrorMsg = document.createElement('span');
  emailErrorMsg.id = 'email-error-msg';           
  emailErrorMsg.className = 'email-error-msg';

  // 스타일 속성 설정
  setErrorMessageStyles(emailErrorMsg);

  // 이메일 입력 필드 아래에 추가
  emailInput.parentElement.appendChild(emailErrorMsg);

  // Focus out 처리
  emailInput.addEventListener('blur', function() {
    if(emailInput.value.trim() === '') {
      setErrorMessage(emailInput, emailErrorMsg, '이메일을 입력해 주세요');
    } else if(!validateEmail(emailInput.value.trim())) {
      setErrorMessage(emailInput, emailErrorMsg, '잘못된 이메일 형식입니다');
    } else {
      clearErrorMessage(emailInput, emailErrorMsg);
    }
    toggleButtonState();
  });
  emailInput.addEventListener('input', toggleButtonState);          // 여기도 'blur 를 했더니 blur 이벤트가 두번 실행됨
}

/* 패스워드 오류 입력 방지 */
const passwordInput = document.querySelector('#password');

if(passwordInput) {
  const passwordErrorMsg = document.createElement('span');
  passwordErrorMsg.id = "password-error-msg";
  passwordErrorMsg.className = "password-error-msg"

  setErrorMessageStyles(passwordErrorMsg);

  passwordInput.parentElement.appendChild(passwordErrorMsg);

  passwordInput.addEventListener('blur', function () {
    if(passwordInput.value.trim() === '') {
      setErrorMessage(passwordInput, passwordErrorMsg, '비밀번호를 입력해 주세요');
    } else if(!validatePassword(passwordInput.value)) {
      setErrorMessage(passwordInput, passwordErrorMsg, '비밀번호를 8자 이상 입력해 주세요');
    } else {
      clearErrorMessage(passwordInput, passwordErrorMsg);
    }
    toggleButtonState();
  });
  passwordInput.addEventListener('input', toggleButtonState); 

  // 비밀번호 표시/숨기기
  const passwordVisibilityIcon = document.querySelector('#password-visibility');
  passwordVisibilityIcon.addEventListener('click', function () {
    togglePasswordVisibility(passwordInput, passwordVisibilityIcon);
  });
}

/* 패스워드 확인 오류 입력 방지 */
const passwordConfirmInput = document.querySelector('#password-confirm');

if(passwordConfirmInput) {
  const passwordConfirmErrorMsg = document.createElement('span');
  passwordConfirmErrorMsg.id = "password-confirm-error-msg";
  passwordConfirmErrorMsg.className = "password-confirm-error-msg"

  setErrorMessageStyles(passwordConfirmErrorMsg);

  passwordConfirmInput.parentElement.appendChild(passwordConfirmErrorMsg);

  passwordConfirmInput.addEventListener('blur', function () {
    if(passwordConfirmInput.value.trim() === '') {
      setErrorMessage(passwordConfirmInput, passwordConfirmErrorMsg, '비밀번호를 다시 한 번 입력해 주세요');
    } else if(!validatePassword(passwordConfirmInput.value)) {
      setErrorMessage(passwordConfirmInput, passwordConfirmErrorMsg, '비밀번호를 8자 이상 입력해 주세요');
    } else {
      clearErrorMessage(passwordConfirmInput, passwordConfirmErrorMsg);
    }
    toggleButtonState();
  });
  passwordConfirmInput.addEventListener('input', toggleButtonState); 

  // 비밀번호 확인 표시/숨기기
  const passwordConfirmVisibilityIcon = document.querySelector('#password-confirm-visibility');
  passwordConfirmVisibilityIcon.addEventListener('click', function () {
    togglePasswordVisibility(passwordConfirmInput, passwordConfirmVisibilityIcon);
  });
}

/* 로그인 폼 제출 처리 */
const loginForm = document.querySelector('#login-form');

if (loginForm) {
  // console.log('로그인 폼 - 전체 사용자 데이터:');
  // console.table(USER_DATA);
  loginForm.addEventListener('submit', handleLogin);

  // 엔터키로 폼 submit 처리
  loginForm.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // 기본 폼 제출 막기
      const emailValue = emailInput.value.trim();
      const passwordValue = passwordInput.value.trim();

      // 유효성 검사 통과 시에만 handleLogin 호출
      if (validateEmail(emailValue) && validatePassword(passwordValue)) {
        handleLogin(event);
      }
    }
  });
}
/* 회원가입 폼 제출 처리 */
const signupForm = document.querySelector('#signup-form');

if(signupForm) {
  signupForm.addEventListener('submit', handleSignup);

  // 엔터키로 폼 submit 처리
  signupForm.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const emailValue = emailInput.value.trim();
      const passwordValue = passwordInput.value.trim();
      const passwordConfirmValue = passwordConfirmInput.value.trim();

      // 유효성 검사 통과 시에만 handleSignup 호출
      if (
        validateEmail(emailValue) &&
        validatePassword(passwordValue) &&
        passwordValue === passwordConfirmValue
      ) {
        handleSignup(event);
      }
    }
  });  
}
