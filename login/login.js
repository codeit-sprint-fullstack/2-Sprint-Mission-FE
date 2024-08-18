const inputEmail = document.querySelector('#useremail');
const inputPassword = document.querySelector('#password');
const loginBtn = document.querySelector('.login-btn');
const noneEmail = document.querySelector('.none-email-value');
const nonePassword = document.querySelector('.none-password-value');
const formatErrorEmail = document.querySelector('.email-format-error');
const formatErrorPassword = document.querySelector('.password-format-error');

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

const emailFormat =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

function emailFormatChecker(email) {
  if (emailFormat.test(email)) {
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

function loginChecker() {
  if (
    inputEmail.value &&
    inputPassword.value &&
    emailFormat.test(inputEmail.value) &&
    inputPassword.value.length >= 8
  ) {
    loginBtn.classList.add('button-abled');
    loginBtn.disabled = false;
    loginBtn.style.cursor = 'pointer';
  } else {
    loginBtn.classList.remove('button-abled');
    loginBtn.disabled = true;
  }
}

function matchLogin() {
  const emailMatch = USER_DATA.find(
    (value) => value.email === inputEmail.value
  );
  const passwordMatch = USER_DATA.find(
    (value) => value.password === inputPassword.value
  );

  if (!(emailMatch && passwordMatch)) {
    return alert('이메일 또는 비밀번호가 일치하지 않습니다.');
  }

  alert('로그인에 성공하였습니다!');
  location.href = '../items';
}

inputEmail.addEventListener('keyup', loginChecker);
inputPassword.addEventListener('keyup', loginChecker);

inputEmail.addEventListener('focusout', noneEmailChecker);
inputPassword.addEventListener('focusout', nonePasswordChecker);

inputEmail.addEventListener('focusout', () =>
  emailFormatChecker(inputEmail.value)
);
inputPassword.addEventListener('focusout', passwordFormatChecker);

loginBtn.addEventListener('click', matchLogin);
