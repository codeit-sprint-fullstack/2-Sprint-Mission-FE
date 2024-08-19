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

function noneNameChecker() {
  if (inputName.value !== '') {
    noneName.classList.add('hide');
    inputName.classList.remove('error');
  } else {
    noneName.classList.remove('hide');
    inputName.classList.add('error');
  }
}

function nonePasswordRepeatChecker() {
  if (inputPasswordRepeat.value !== '') {
    nonePasswordRepeat.classList.add('hide');
    inputPasswordRepeat.classList.remove('error');
  } else {
    nonePasswordRepeat.classList.remove('hide');
    inputPasswordRepeat.classList.add('error');
  }
}

function matchPassword() {
  if (inputPassword.value === inputPasswordRepeat.value) {
    missMatchPassword.classList.add('hide');
    inputPasswordRepeat.classList.remove('error');
  } else {
    missMatchPassword.classList.remove('hide');
    inputPasswordRepeat.classList.add('error');
  }
}

function signupChecker() {
  if (
    inputEmail.value &&
    inputPassword.value &&
    inputName.value &&
    inputPasswordRepeat.value &&
    emailFormat.test(inputEmail.value) &&
    inputPassword.value.length >= 8 &&
    inputPassword.value === inputPasswordRepeat.value
  ) {
    signupBtn.classList.add('button-abled');
    signupBtn.disabled = false;
    signupBtn.style.cursor = 'pointer';
  } else {
    signupBtn.classList.remove('button-abled');
    signupBtn.disabled = true;
  }
}

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

inputEmail.addEventListener('keyup', signupChecker);
inputPassword.addEventListener('keyup', signupChecker);
inputName.addEventListener('keyup', signupChecker);
inputPasswordRepeat.addEventListener('keyup', signupChecker);

inputEmail.addEventListener('focusout', () => isEmailValid(inputEmail.value));
inputPassword.addEventListener('focusout', () =>
  isPasswordValid(inputPassword.value)
);

inputName.addEventListener('focusout', noneNameChecker);
inputPasswordRepeat.addEventListener('focusout', nonePasswordRepeatChecker);
inputPasswordRepeat.addEventListener('focusout', matchPassword);

signupBtn.addEventListener('click', () => isSignupValid(inputEmail.value));
errorOverlay.addEventListener('click', closeModal);
errorOkBtn.addEventListener('click', closeModal);
