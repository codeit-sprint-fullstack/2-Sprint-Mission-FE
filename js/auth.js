// auth.js
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
  { email: 'buffso@naver.com', password: "11111111" },
];

// 이메일 유효성 검증
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}
// 가입된 이메일 체크
function findUserByEmail(email) {
  return USER_DATA.find(user => user.email === email);    // find : 첫번째 찾은 이메일을 return;
}
// 비밀번호 유효성 검증
function validatePassword(password) {
  return password.length >= 8;
}

// 로그인 처리
function handleLogin(event) {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  if(!validateEmail(email)) {
    showModal('유효한 이메일 주소를 입력해 주세요.', 'error');
    return;
  }
  const user = findUserByEmail(email);
  if(user) {
    if(user.password === password) {
      showModal('로그인 성공', 'info', '/items');
    } else {
      showModal('비밀번호가 일치하지 않습니다.', 'error');
    } 
  } else {
    showModal('비밀번호가 일치하지 않습니다.', 'error');
  }
}

// 회원가입 처리
function handleSignup(event) {
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
  console.log('회원 가입 후 - 전체 사용자 데이터:');
  console.table(USER_DATA);

  if(USER_DATA.some(user => user.email === email)) {           // some 찾다가 있으면 true를 return
    showModal('회원 가입 성공', 'info', '/login');
  } else {
    showModal('회원 가입에 실패하였습니다. 다시 시도해 주시기 바랍니다.', 'error');
  }  
}

// 에러 메시지 처리 공통함수 설정
function setErrorMessage(inputElement, errorMsgElement, message) {
  inputElement.classList.add('input-error');
  errorMsgElement.textContent = message;
  errorMsgElement.style.display = 'block';
}
function clearErrorMessage(inputElement, errorMsgElement) {
  inputElement.classList.remove('input-error');
  errorMsgElement.style.display = 'none';
}
function setErrorMessageStyles(errorMsgElement) {
  errorMsgElement.style.color = 'red';
  errorMsgElement.style.fontSize = '1.6rem';
  errorMsgElement.style.textAlign = 'left';  
  errorMsgElement.style.padding = '0.5rem';
  errorMsgElement.style.display = 'none';
}
// 로그인 버튼 활성화/비활성화 함수
function toggleButtonState() {
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
    submitButton.classList.add('disabled');
    console.log('submit button disabled');
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove('disabled');
    console.log('submit button enabled');
  }
}

// 비밀번호 표시/숨기기 토글 함수
function togglePasswordVisibility(passwordInput, visibilityIcon) {
  const isPasswordVisible = passwordInput.type === 'text';
  passwordInput.type = isPasswordVisible ? 'password' : 'text';
  visibilityIcon.src = isPasswordVisible ? '/images/btn_visibility_off_24px.svg' : '/images/btn_visibility_on_24px.svg';
  visibilityIcon.alt = isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기';
}

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
  emailInput.addEventListener('blur', toggleButtonState); 
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
  passwordInput.addEventListener('blur', toggleButtonState); 

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
  passwordConfirmInput.addEventListener('blur', toggleButtonState); 

  // 비밀번호 확인 표시/숨기기
  const passwordConfirmVisibilityIcon = document.querySelector('#password-confirm-visibility');
  passwordConfirmVisibilityIcon.addEventListener('click', function () {
    togglePasswordVisibility(passwordConfirmInput, passwordConfirmVisibilityIcon);
  });
}

/* 폼 제출 처리 */
const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

if (loginForm) {
  console.log('로그인 폼 - 전체 사용자 데이터:');
  console.table(USER_DATA);
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

/* 모달 다이얼로그 요소 생성 */
const modalElement = document.createElement('dialog');
modalElement.id = 'error-modal';

modalElement.innerHTML = `
  <div class="modal-content">
    <p id="modal-message">오류 메시지가 여기에 표시됩니다.</p>
    <button id="modal-confirm-btn">확인</button>
  </div>
`;
document.body.appendChild(modalElement);

// 모달 다이얼로그 콘트롤
const modalMessage = modalElement.querySelector('#modal-message');
const confirmButton = modalElement.querySelector('#modal-confirm-btn');

function showModal(message, type = 'info', redirectUrl = null) {
  modalMessage.textContent = message;

  // 모달 메시지 색상을 type에 따라 변경
  if (type === 'error') {
    modalMessage.style.color = 'red';
  } else {
    modalMessage.style.color = '#333'; 
  }

  modalElement.showModal();

  // 확인 버튼 클릭 시 모달 닫기 및 페이지 이동 처리
  confirmButton.addEventListener('click', () => {
    closeModal();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, { once: true }); // 'once: true'를 통해 이벤트 핸들러가 한 번만 실행되도록 설정
}

function closeModal() {
  modalElement.close();
}

// 확인 버튼 클릭 시 모달 닫기
confirmButton.addEventListener('click', closeModal);
