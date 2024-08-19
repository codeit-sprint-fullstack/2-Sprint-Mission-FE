const inputEmail = document.querySelector('#useremail');
const inputPassword = document.querySelector('#password');
const loginBtn = document.querySelector('.login-btn');
const modal = document.querySelector('.error-modal');
const okBtn = document.querySelector('.ok');
const overlay = document.querySelector('.overlay');
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

const emailFormat =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

function isEmailVailed(email) {
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

function isPasswordVailed(password) {
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
    return modal.classList.remove('hide');
  }

  alert('로그인에 성공하였습니다!');
  location.href = '../items';
}

function closeModal() {
  modal.classList.add('hide');
}

inputEmail.addEventListener('keyup', loginChecker);
inputPassword.addEventListener('keyup', loginChecker);

inputEmail.addEventListener('focusout', () => isEmailVailed(inputEmail.value));
inputPassword.addEventListener('focusout', () =>
  isPasswordVailed(inputPassword.value)
);

loginBtn.addEventListener('click', matchLogin);
overlay.addEventListener('click', closeModal);
okBtn.addEventListener('click', closeModal);
