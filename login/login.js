import {USER_DATA, formEl, labelEl, emailEl, passwordEl, passwordToggle,
  focusoutEmail, modal, modalH1, modalInput, closeModal
} from '../module.js';

/* getting element */
const passwordLabelEl = labelEl[1];
const btnEl = document.querySelector('#loginBtn');
const eyeImgEl = document.querySelector('#eyeImg');

/* setting variable and fixing html  */
const passwordNewP = document.createElement('p');
passwordNewP.classList.add('errorMsg');
passwordNewP.classList.add('passwordBottom')
passwordLabelEl.append(passwordNewP);

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

function btnDisabled() {
  const emailFunc = focusoutEmail();
  const passwordFunc = focusoutPassword();
  if(emailFunc && passwordFunc) {
    btnEl.disabled = false;
    btnEl.classList.add('btnColor');
  } else{
    btnEl.disabled = true;
  }
}

function clickLink(){
  location.href = '../items/index.html';
} 

function conditionalBtn() {
  const emailCheck = USER_DATA.some(e => emailEl.value === e.email);
  const passwordCheck = USER_DATA.some(e => passwordEl.value === e.password);
  
  if(!emailCheck){
    //alert('이메일이 존재하지 않습니다.');
    modal.style.display = 'block';
    modalH1.textContent = '이메일이 존재하지 않습니다.';
    modalInput.addEventListener('click', closeModal);
  } else if(emailCheck && !passwordCheck){
    //alert('비밀번호가 일치하지 않습니다.');
    modal.style.display = 'block';
    modalH1.textContent = '비밀번호가 일치하지 않습니다.';
    modalInput.addEventListener('click', closeModal);
  } else {
    btnEl.addEventListener('click', clickLink);
  } 
}

/* event handling */ 
emailEl.addEventListener('focusout', focusoutEmail);
passwordEl.addEventListener('focusout', focusoutPassword);
formEl.addEventListener('focusout', btnDisabled);
btnEl.addEventListener('click', conditionalBtn);
eyeImgEl.addEventListener('click', passwordToggle);