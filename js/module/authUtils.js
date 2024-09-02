import { showModal } from './uiUtils.js';

export const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
  { email: 'buffso@naver.com', password: "11111111" },
];

// 이메일 유효성 검증
export function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
// 가입된 이메일 체크
export function findUserByEmail(email) {
  return USER_DATA.find(user => user.email === email);    // find : 첫번째 찾은 이메일을 return;
}
// 비밀번호 유효성 검증
export function validatePassword(password) {
  return password.length >= 8;
}

// 에러 메시지 처리 공통함수 설정
export function setErrorMessage(inputElement, errorMsgElement, message) {
  inputElement.classList.add('input-error');
  errorMsgElement.textContent = message;
  errorMsgElement.style.display = 'block';
}
export function clearErrorMessage(inputElement, errorMsgElement) {
  inputElement.classList.remove('input-error');
  errorMsgElement.style.display = 'none';
}
export function setErrorMessageStyles(errorMsgElement) {
  errorMsgElement.style.color = 'red';
  errorMsgElement.style.fontSize = '1.6rem';
  errorMsgElement.style.textAlign = 'left';  
  errorMsgElement.style.padding = '0.5rem';
  errorMsgElement.style.display = 'none';
}

// 로그인 버튼 활성화/비활성화 함수
export function toggleButtonState() {
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const submitButton = document.querySelector('.btn_submit');

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const emailErrorMsg = document.querySelector('#email-error-msg');
  const passwordErrorMsg = document.querySelector('#password-error-msg');
  const passwordConfirmInput = document.querySelector('#password-confirm');
  const passwordConfirmErrorMsg = document.querySelector('#password-confirm-error-msg');

  const emailErrorMsgVisible = emailErrorMsg ? emailErrorMsg.style.display === 'block' : false;
  const passwordErrorMsgVisible = passwordErrorMsg ? passwordErrorMsg.style.display === 'block' : false;
  const passwordConfirmErrorMsgVisible = passwordConfirmErrorMsg ? passwordConfirmErrorMsg.style.display === 'block' : false;

  const isPasswordConfirmValid = passwordConfirmInput ? passwordConfirmInput.value.trim() !== '' : true;

  // 이메일, 비밀번호, 또는 비밀번호 확인 입력값이 없거나, 에러 메시지가 표시된 경우 버튼 비활성화
  if (
    !emailValue ||
    !passwordValue ||
    !isPasswordConfirmValid ||
    emailErrorMsgVisible ||
    passwordErrorMsgVisible ||
    passwordConfirmErrorMsgVisible
  ) {
    submitButton.disabled = true;                   // submitButton 은 전역 변수
    submitButton.style.backgroundColor = '#9CA3AF'
    submitButton.classList.add('disabled');
    //console.log('submit button disabled');
  } else {
    submitButton.disabled = false;
    submitButton.style.backgroundColor = '#3694FF'
    submitButton.classList.remove('disabled');
    //console.log('submit button enabled');
  }
}

// 비밀번호 표시/숨기기 토글 함수
export function togglePasswordVisibility(passwordInput, visibilityIcon) {
  const isPasswordVisible = passwordInput.type === 'text';
  passwordInput.type = isPasswordVisible ? 'password' : 'text';
  visibilityIcon.src = isPasswordVisible ? '/images/btn_visibility_off_24px.svg' : '/images/btn_visibility_on_24px.svg';
  visibilityIcon.alt = isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기';
}

/* ********************** */
/*  로그인 처리            */
/* ********************** */
export function handleLogin(event) {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  if(!validateEmail(email)) {
    showModal('유효한 이메일 주소를 입력해 주세요.', 'error');
    return;
  }
  const user = findUserByEmail(email);
  if(!user) {
    showModal('비밀번호가 일치하지 않습니다.', 'error');
    return;
  }
  if(user.password !== password) {
    showModal('비밀번호가 일치하지 않습니다.', 'error');
    return;
  }
  showModal('로그인 성공', 'info', '/items');
}

/* ********************** */
/*  회원가입 처리          */
/* ********************** */
export function handleSignup(event) {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const nick = document.querySelector('#nick').value;
  const password = document.querySelector('#password').value;
  const passwordConfirm = document.querySelector('#password-confirm').value;

  if(!validateEmail(email)) {
    showModal('유효한 이메일 주소를 입력해 주세요.', 'error');
    return;
  }
  if(findUserByEmail(email)) {
    showModal('이미 사용중인 이메일 주소 입니다.', 'error');
    return;
  }
  if(password !== passwordConfirm) {
    showModal('비밀번호가 일치하지 않습니다.', 'error');
    return;
  }
  
  // 회원가입 성공 처리 (여기서는 단순히 USER_DATA 에 추가)
  USER_DATA.push({email, password, nick});
  //console.log('회원 가입 후 - 전체 사용자 데이터:');
  //console.table(USER_DATA);

  if(USER_DATA.some(user => user.email === email)) {           // some 찾다가 있으면 true를 return
    showModal('회원 가입 성공', 'info', '/login');
  } else {
    showModal('회원 가입에 실패하였습니다. 다시 시도해 주시기 바랍니다.', 'error');
  }  
}

