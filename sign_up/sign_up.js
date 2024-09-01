import { showModal, closeModal, isEmailValid, isUserForSignin } from "./sign_up.mjs";

const checkEmail = document.querySelector("#email");
const checkPW = document.querySelector("#password");
const checkPC = document.querySelector("#confirmpPassword");
const errMessage = document.querySelector(".errMessage");
const PerrMessage = document.querySelector(".PerrMessage");
const PCerrMessage = document.querySelector(".PCerrMessage");
const loginBtn = document.querySelector(".loginBtn");
const modal = document.querySelector("#modal");

const modalCloseBtn = document.querySelector("#modalClose");



function validForm(email, password, passwordRepeat) {
  return isEmailValid(email) && checkPasswordValid(password, passwordRepeat);
  
}

function emailCheck(email) {
  if (!isEmailValid(email)) {
    checkEmail.classList.add('error');
    errMessage.style.display = 'block';
    checkEmail.focus();
  } else {
    checkEmail.classList.remove('error');
    errMessage.style.display = 'none';
  }
  loginBtn.classList.toggle(
    'disabled',
    !validForm(email, checkPW.value, checkPC.value)
  );
}

function checkPasswordValid(password, passwordRepeat) {
  console.log(password, passwordRepeat);
  if (!passwordRepeat) {
    
    return password.length >= 8;
  } else {
  
    return password === passwordRepeat;
  }
}

function pwCheck(
  password,
  passwordRepeat,
  check,
  errMessage,
  checkPasswordValid
) {
  if (!checkPasswordValid(password, passwordRepeat)) {
    check.classList.add('error');
    errMessage.style.display = 'block';
  
  } else {
    check.classList.remove('error');
    errMessage.style.display = 'none';
  }
  loginBtn.classList.toggle(
    'disabled',
    !validForm(checkEmail.value, checkPW.value, checkPC.value)
  );
}

checkEmail.addEventListener('focusout', () => emailCheck(checkEmail.value));

checkPW.addEventListener('focusout', () =>
  pwCheck(
    checkPW.value,
    checkPC.value,
    checkPW,
    PerrMessage,
    checkPasswordValid
  )
);
checkPC.addEventListener('focusout', () =>
  pwCheck(
    checkPW.value,
    checkPC.value,
    checkPC,
    PCerrMessage,
    checkPasswordValid
  )
);

loginBtn.addEventListener('click', (e) => {
  const email = checkEmail.value;

  e.preventDefault();
  if (!loginBtn.classList.contains('disabled')) {
    if (isUserForSignin(email)) return showModal(modal);
    window.location.href = 'login.html';
  }
});
