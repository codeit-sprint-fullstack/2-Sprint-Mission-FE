const inputEmail = document.querySelector('#useremail');
const inputPassword = document.querySelector('#password');
const inputName = document.querySelector('#nickname');
const inputPasswordRepeat = document.querySelector('#password-repeat');
const signupBtn = document.querySelector('.signup-btn');
const errorModal = document.querySelector('.error-modal');
const errorOkBtn = document.querySelector('.error-ok');
const errorOverlay = document.querySelector('.modal-overlay');
const noneEmail = document.querySelector('.none-email-value');
const nonePassword = document.querySelector('.none-password-value');
const noneName = document.querySelector('.none-nickname-value');
const nonePasswordRepeat = document.querySelector(
  '.none-password-repeat-value'
);
const formatErrorEmail = document.querySelector('.email-format-error');
const formatErrorPassword = document.querySelector('.password-format-error');
const missMatchPassword = document.querySelector('.miss-match-password');
const hidePasswordIcon = document.querySelector('.password-hide');
const showPasswordIcon = document.querySelector('.password-show');
const hidePasswordRepeatIcon = document.querySelector('.password-repeat-hide');
const showPasswordRepeatIcon = document.querySelector('.password-repeat-show');

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
  if (inputPassword.type == 'password') {
    inputPassword.type = 'text';
    showPasswordIcon.classList.remove('hide');
    hidePasswordIcon.classList.add('hide');
  }
}

// 비밀번호 숨기기 함수
function hidePassword() {
  if (inputPassword.type == 'text') {
    inputPassword.type = 'password';
    hidePasswordIcon.classList.remove('hide');
    showPasswordIcon.classList.add('hide');
  }
}

// 닉네임 유효성 검사 함수
function noneNameChecker(name) {
  if (name !== '') {
    noneName.classList.add('hide');
    inputName.classList.remove('error');
  } else {
    noneName.classList.remove('hide');
    inputName.classList.add('error');
  }
}

// 비밀번호 재확인 유효성 검사 함수
function isPasswordRepeatValid(password, rePassword) {
  if (rePassword !== '') {
    nonePasswordRepeat.classList.add('hide');
    inputPasswordRepeat.classList.remove('error');
    missMatchPassword.classList.add('hide');

    if (password !== rePassword) {
      missMatchPassword.classList.remove('hide');
      inputPasswordRepeat.classList.add('error');
      nonePasswordRepeat.classList.add('hide');
    }
  } else {
    nonePasswordRepeat.classList.remove('hide');
    inputPasswordRepeat.classList.add('error');
    missMatchPassword.classList.add('hide');
  }
}

// 비밀번호 표시 함수
function showPasswordRepeat() {
  if (inputPasswordRepeat.type == 'password') {
    inputPasswordRepeat.type = 'text';
    showPasswordRepeatIcon.classList.remove('hide');
    hidePasswordRepeatIcon.classList.add('hide');
  }
}

// 비밀번호 숨기기 함수
function hidePasswordRepeat() {
  if (inputPasswordRepeat.type == 'text') {
    inputPasswordRepeat.type = 'password';
    hidePasswordRepeatIcon.classList.remove('hide');
    showPasswordRepeatIcon.classList.add('hide');
  }
}

// 회원가입 버튼 활성화 함수
function signupBtnActivation(email, password, name, rePassword) {
  if (
    email &&
    password &&
    name &&
    rePassword &&
    emailFormat.test(email) &&
    password.length >= 8 &&
    password === rePassword
  ) {
    signupBtn.classList.add('button-abled');
    signupBtn.disabled = false;
    signupBtn.style.cursor = 'pointer';
  } else {
    signupBtn.classList.remove('button-abled');
    signupBtn.disabled = true;
  }
}

// 중복 이메일 확인 함수
function isSignupValid(email) {
  const emailMatch = USER_DATA.find((value) => value.email === email);

  if (emailMatch) {
    return errorModal.classList.remove('hide');
  }

  if (inputEmail.value !== '') {
    location.href = '../login';
  }
}

// 모달 닫는 함수
function closeModal() {
  errorModal.classList.add('hide');
}

// 회원가입 버튼 활성화 이벤트 생성
inputEmail.addEventListener('keyup', () =>
  signupBtnActivation(
    inputEmail.value,
    inputPassword.value,
    inputName.value,
    inputPasswordRepeat.value
  )
);
inputPassword.addEventListener(
  'keyup',
  signupBtnActivation(
    inputEmail.value,
    inputPassword.value,
    inputName.value,
    inputPasswordRepeat.value
  )
);
inputName.addEventListener(
  'keyup',
  signupBtnActivation(
    inputEmail.value,
    inputPassword.value,
    inputName.value,
    inputPasswordRepeat.value
  )
);
inputPasswordRepeat.addEventListener(
  'keyup',
  signupBtnActivation(
    inputEmail.value,
    inputPassword.value,
    inputName.value,
    inputPasswordRepeat.value
  )
);

// 포커스 아웃 시 유효성 검증 이벤트 생성
inputEmail.addEventListener('focusout', () => isEmailValid(inputEmail.value));
inputPassword.addEventListener('focusout', () =>
  isPasswordValid(inputPassword.value)
);
inputName.addEventListener('focusout', () => noneNameChecker(inputName.value));
inputPasswordRepeat.addEventListener('focusout', () =>
  isPasswordRepeatValid(inputPassword.value, inputPasswordRepeat.value)
);

// 중복 이메일 확인 이벤트 생성
signupBtn.addEventListener('click', () => isSignupValid(inputEmail.value));
errorOverlay.addEventListener('click', closeModal);
errorOkBtn.addEventListener('click', closeModal);

// 비밀번호 표시/숨기기 설정
hidePasswordIcon.addEventListener('click', showPassword);
showPasswordIcon.addEventListener('click', hidePassword);

hidePasswordRepeatIcon.addEventListener('click', showPasswordRepeat);
showPasswordRepeatIcon.addEventListener('click', hidePasswordRepeat);
