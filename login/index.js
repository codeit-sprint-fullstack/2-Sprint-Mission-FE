const emailInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const btn = document.querySelector('#login-button');

function showErrorMsg(el, errorID) {
  const showingMsg = document.getElementById(errorID);
  showingMsg.style.display = 'block';
  el.style.border = '1px solid #F74747';
}

function hideErrorMsg(el, errorID) {
  const hidingMsg = document.getElementById(errorID);
  hidingMsg.style.display = 'none';
  el.style.border = 'none';
}

let emailValidation;
let passwordValidation;

function emailValidCheck(e) {
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailCheck.test(e);
}

function emailChecker() {
  emailValidation = false;

  hideErrorMsg(emailInput, 'email-empty-error');
  hideErrorMsg(emailInput, 'email-input-error');

  if (!emailInput.value) {
    showErrorMsg(emailInput, 'email-empty-error');
  } else if (!emailValidCheck(emailInput.value)) {
    showErrorMsg(emailInput, 'email-input-error');
  } else {
    emailValidation = true;
  }

  btnActivate();
}

function passwordChecker() {
  passwordValidation = false;

  hideErrorMsg(passwordInput, 'password-empty-error');
  hideErrorMsg(passwordInput, 'password-input-error');

  if (!passwordInput.value) {
    showErrorMsg(passwordInput, 'password-empty-error');
  } else if (passwordInput.value.length < 8) {
    showErrorMsg(passwordInput, 'password-input-error');
  } else {
    passwordValidation = true;
  }

  btnActivate();
}

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

function goLogin(e) {
  e.preventDefault();

  const eachUserData = USER_DATA.find(el => el.email === emailInput.value);
  if (eachUserData) {
    if (eachUserData.password === passwordInput.value) {
      window.location.href = '/items';
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  } else {
    alert('이메일이 없습니다.');
  }
}

function btnActivate() {
  console.log(emailValidation, passwordValidation);
  
  if (emailValidation && passwordValidation) {
    btn.classList.add('isValid')
    btn.disabled = false;
    btn.addEventListener('click', goLogin);
  } else if (document.querySelector('.isValid')) {
    btn.disabled = true;
    btn.classList.remove('isValid');
  }
}

emailInput.addEventListener('focusout', emailChecker);
passwordInput.addEventListener('focusout', passwordChecker);
