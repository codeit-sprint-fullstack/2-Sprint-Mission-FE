const inputEmail = document.querySelector('#useremail');
const inputPassword = document.querySelector('#password');
const inputName = document.querySelector('#nickname');
const inputPasswordRepeat = document.querySelector('#password-repeat');
const signupBtn = document.querySelector('.signup-btn');
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

function noneEmailChecker() {
  if (inputEmail.value !== '') {
    noneEmail.classList.add('hide');
    inputEmail.classList.remove('error');
  } else {
    noneEmail.classList.remove('hide');
    inputEmail.classList.add('error');
  }
}

function nonePasswordChecker() {
  if (inputPassword.value !== '') {
    nonePassword.classList.add('hide');
    inputPassword.classList.remove('error');
  } else {
    nonePassword.classList.remove('hide');
    inputPassword.classList.add('error');
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

const emailFormat =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

function emailFormatChecker() {
  if (emailFormat.test(inputEmail.value)) {
    formatErrorEmail.classList.add('hide');
    inputEmail.classList.remove('error');
  } else {
    formatErrorEmail.classList.remove('hide');
    inputEmail.classList.add('error');
  }
}

function passwordFormatChecker() {
  if (inputPassword.value.length >= 8) {
    formatErrorPassword.classList.add('hide');
    inputPassword.classList.remove('error');
  } else {
    formatErrorPassword.classList.remove('hide');
    inputPassword.classList.add('error');
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

function matchSignup() {
  const emailMatch = USER_DATA.find(
    (value) => value.email === inputEmail.value
  );

  if (!emailMatch) {
    location.href = '../login';
  } else {
    alert('사용 중인 이메일입니다.');
  }
}

inputEmail.addEventListener('keyup', signupChecker);
inputPassword.addEventListener('keyup', signupChecker);
inputName.addEventListener('keyup', signupChecker);
inputPasswordRepeat.addEventListener('keyup', signupChecker);

inputEmail.addEventListener('focusout', noneEmailChecker);
inputPassword.addEventListener('focusout', nonePasswordChecker);
inputName.addEventListener('focusout', noneNameChecker);
inputPasswordRepeat.addEventListener('focusout', nonePasswordRepeatChecker);

inputEmail.addEventListener('focusout', emailFormatChecker);
inputPassword.addEventListener('focusout', passwordFormatChecker);

inputPasswordRepeat.addEventListener('focusout', matchPassword);
signupBtn.addEventListener('click', matchSignup);
