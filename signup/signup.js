import {USER_DATA, formEl, labelEl, emailEl, passwordEl,
  passwordToggle, focusoutEmail, modal, modalH1, modalInput,
  closeModal
} from '../module.js';

/* getting element */;
const nicknameLabelEl = labelEl[1];
const passwordLabelEl = labelEl[2];
const passwordCheckLabelEl = labelEl[3];
const nicknameEl = document.querySelector('#nickname');
const passwordCheckEl = document.querySelector('#passwordCheck');
const btnEl = document.querySelector('#signUpBtn');
const eyeImgFirstEl = document.querySelector('.eyeImg');
const eyeImgSecondEl = document.querySelector('.checkImg');

/* setting variable and fixing html  */
const passwordNewP = document.createElement('p');
passwordNewP.classList.add('errorMsg');
passwordNewP.classList.add('passwordBottom')
passwordLabelEl.append(passwordNewP);

const passwordCheckNewP = document.createElement('p');
passwordCheckNewP.classList.add('errorMsg');
passwordCheckNewP.classList.add('passwordBottom');
passwordCheckLabelEl.append(passwordCheckNewP);

const nicknameNewP = document.createElement('p');
nicknameNewP.classList.add('errorMsg');
nicknameLabelEl.append(nicknameNewP);

btnEl.setAttribute('disabled', true);

/* event handler */
function passwordLimit(){
  passwordNewP.textContent = '비밀번호를 입력해주세요.';
  passwordNewP.style.display = 'block';
}

function passwordLimitNum(){
  passwordNewP.textContent = '비밀번호를 8자 이상 입력해주세요.';
  passwordNewP.style.display = 'block';
}

function passwordHidden(){
  passwordNewP.style.display = 'none';
}

function focusoutPassword() {
  if(passwordEl.value === "") {
    passwordEl.classList.add('borderRed');
    passwordLimit();
    return false;
  } else if(passwordEl.value.length < 8) {
    passwordEl.classList.add('borderRed');
    passwordLimitNum();
    return false;
  } else {
    passwordEl.classList.remove('borderRed');
    passwordHidden();
    return true;
  }
}

function passwordCheckIncorrect(){
  passwordCheckNewP.textContent = '비밀번호가 일치하지 않습니다.';
  passwordCheckNewP.style.display = 'block';
}

function passwordCheckHidden(){
  passwordCheckNewP.style.display = 'none';
}

function focusoutPasswordCheck() {
  if(passwordCheckEl.value !== passwordEl.value) {
    passwordCheckEl.classList.add('borderRed');
    passwordCheckIncorrect();
    return false;
  } else {
    passwordCheckEl.classList.remove('borderRed');
    passwordCheckHidden();
    return true;
  }
}

function nicknameLimit(){
  nicknameNewP.textContent = '닉네임을 입력해주세요.';
  nicknameNewP.style.display = 'block';
}

function nicknameHidden(){
  nicknameNewP.style.display = 'none';
}

function foucusoutNickname(){
  if(nicknameEl.value === ""){
    nicknameEl.classList.add('borderRed');
    nicknameLimit();
    return false;
  } else {
    nicknameEl.classList.remove('borderRed');
    nicknameHidden();
    return true;
  }
}

function btnDisabled() {
  const emailFunc = focusoutEmail();
  const passwordFunc = focusoutPassword();
  const passwordCheckFunc = focusoutPasswordCheck();
  const nicknameFunc = foucusoutNickname();
  if(emailFunc && passwordFunc && passwordCheckFunc && nicknameFunc) {
    btnEl.disabled = false;
    btnEl.classList.add('btnColor');
  } else{
    btnEl.disabled = true;
  }
}

function loginLink(){
  location.href = '../login/login.html'
}

function conditionalBtn(){
  const emailCheck = USER_DATA.some(e => emailEl.value === e.email);

  if(emailCheck) {
    modal.style.display = 'block';
    modalH1.textContent = '사용 중인 이메일입니다.';
    modalInput.addEventListener('click', closeModal); 
    //alert('사용 중인 이메일입니다.')
  } else {
    btnEl.addEventListener('click', loginLink);
  }
}

function passwordCheckToggle() {
  if(passwordCheckEl.type === 'password'){
    passwordCheckEl.setAttribute('type', 'text');
  } else{
    passwordCheckEl.setAttribute('type', 'password');
  }
}

/* event handling */ 
emailEl.addEventListener('focusout', focusoutEmail);
passwordEl.addEventListener('focusout', focusoutPassword);
nicknameEl.addEventListener('focusout', foucusoutNickname);
passwordCheckEl.addEventListener('focusout', focusoutPasswordCheck);
formEl.addEventListener('focusout', btnDisabled);
btnEl.addEventListener('click', conditionalBtn);
eyeImgFirstEl.addEventListener('click', passwordToggle);
eyeImgSecondEl.addEventListener('click', passwordCheckToggle);