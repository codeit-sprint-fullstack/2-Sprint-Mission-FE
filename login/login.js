const inputEmail = document.querySelector('#useremail');
const inputPassword = document.querySelector('#password');
const loginBtn = document.querySelector('.login-btn');
const errorModal = document.querySelector('.error-modal');
const errorOkBtn = document.querySelector('.error-ok');
const errorOverlay = document.querySelector('.modal-overlay');
const noneEmail = document.querySelector('.none-email-value');
const nonePassword = document.querySelector('.none-password-value');
const formatErrorEmail = document.querySelector('.email-format-error');
const formatErrorPassword = document.querySelector('.password-format-error');
const hidePasswordIcon = document.querySelector('.password-hide');
const showPasswordIcon = document.querySelector('.password-show');

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: 'codeit101!' },
  { email: 'codeit2@codeit.com', password: 'codeit202!' },
  { email: 'codeit3@codeit.com', password: 'codeit303!' },
  { email: 'codeit4@codeit.com', password: 'codeit404!' },
  { email: 'codeit5@codeit.com', password: 'codeit505!' },
  { email: 'codeit6@codeit.com', password: 'codeit606!' }
];

const emailFormat =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

// 이메일 유효성 검증 함수
function isEmailValid(email) {
  if (email !== '') {
    noneEmail.classList.add('hide');
    inputEmail.classList.remove('error');
    formatErrorEmail.classList.add('hide');

    if (!emailFormat.test(email)) {
      formatErrorEmail.classList.remove('hide');
      inputEmail.classList.add('error');
      noneEmail.classList.add('hide');
    }
  } else {
    noneEmail.classList.remove('hide');
    inputEmail.classList.add('error');
    formatErrorEmail.classList.add('hide');
  }
}

// 비밀번호 유효성 검증 함수
function isPasswordValid(password) {
  if (password !== '') {
    nonePassword.classList.add('hide');
    inputPassword.classList.remove('error');
    formatErrorPassword.classList.add('hide');

    if (password.length < 8) {
      formatErrorPassword.classList.remove('hide');
      inputPassword.classList.add('error');
      nonePassword.classList.add('hide');
    }
  } else {
    nonePassword.classList.remove('hide');
    inputPassword.classList.add('error');
    formatErrorPassword.classList.add('hide');
  }
}

// 비밀번호 표시 함수
function showPassword() {
  if (inputPassword.type === 'password') {
    inputPassword.type = 'text';
    showPasswordIcon.classList.remove('hide');
    hidePasswordIcon.classList.add('hide');
  }
}

// 비밀번호 숨기기 함수
function hidePassword() {
  if (inputPassword.type === 'text') {
    inputPassword.type = 'password';
    hidePasswordIcon.classList.remove('hide');
    showPasswordIcon.classList.add('hide');
  }
}

// 로그인 버튼 활성화 함수
function loginBtnActivation(email, password) {
  if (email && password && emailFormat.test(email) && password.length >= 8) {
    loginBtn.classList.add('button-abled');
    loginBtn.disabled = false;
    loginBtn.style.cursor = 'pointer';
  } else {
    loginBtn.classList.remove('button-abled');
    loginBtn.disabled = true;
  }
}

// 유저 데이터 확인 함수
function isLoginValid(email, password) {
  const emailMatch = USER_DATA.find((value) => value.email === email);
  const passwordMatch = USER_DATA.find((value) => value.password === password);

  if (!(emailMatch && passwordMatch)) {
    return errorModal.classList.remove('hide');
  }

  alert('로그인에 성공하였습니다!');
  location.href = '../items';
}

// 모달 닫는 함수
function closeModal() {
  errorModal.classList.add('hide');
}

// 로그인 버튼 활성화 이벤트 생성
inputEmail.addEventListener('keyup', () =>
  loginBtnActivation(inputEmail.value, inputPassword.value)
);
inputPassword.addEventListener('keyup', () =>
  loginBtnActivation(inputEmail.value, inputPassword.value)
);

// 포커스 아웃 시 유효성 검증 이벤트 생성
inputEmail.addEventListener('focusout', () => isEmailValid(inputEmail.value));
inputPassword.addEventListener('focusout', () =>
  isPasswordValid(inputPassword.value)
);

// 유저 데이터 확인 이벤트 생성
loginBtn.addEventListener('click', () =>
  isLoginValid(inputEmail.value, inputPassword.value)
);
errorOverlay.addEventListener('click', closeModal);
errorOkBtn.addEventListener('click', closeModal);

// 비밀번호 표시/숨기기 설정
hidePasswordIcon.addEventListener('click', showPassword);
showPasswordIcon.addEventListener('click', hidePassword);
