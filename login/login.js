const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

/* getting element */
const formEl = document.querySelector('form');
const labelEl = document.querySelectorAll('label')
const emailLabelEl = labelEl[0];
const passwordLabelEl = labelEl[1];
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const btnEl = document.querySelector('#loginBtn');

/* setting variable and fixing html  */
const emailNewP = document.createElement('p');
emailNewP.classList.add("errorMsg");
emailLabelEl.append(emailNewP);

const passwordNewP = document.createElement('p');
passwordNewP.classList.add('errorMsg');
passwordNewP.classList.add('passwordBottom')
passwordLabelEl.append(passwordNewP);

btnEl.setAttribute('disabled', true);

/* event handler */
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.(com)$/;
  return emailPattern.test(email);
}

function focusoutEmail() {
  if(emailEl.value === ""){ 
    emailEl.classList.add('borderRed');
    emailNewP.textContent = "이메일을 입력해주세요.";
    emailNewP.style.display = 'block';
    return false;
  } else if(!validateEmail(emailEl.value)) {
    emailEl.classList.add('borderRed');
    emailNewP.textContent = "잘못된 이메일 형식입니다.";
    emailNewP.style.display = 'block';
    return false;
  } else {
    emailEl.classList.remove('borderRed');
    emailNewP.style.display = 'none';
    return true;
  }
}

function focusoutPassword() {
  if(passwordEl.value === "") {
    passwordEl.classList.add('borderRed');
    passwordNewP.textContent = '비밀번호를 입력해주세요.';
    passwordNewP.style.display = 'block';
    return false;
  } else if(passwordEl.value.length < 8) {
    passwordEl.classList.add('borderRed');
    passwordNewP.textContent = '비밀번호를 8자 이상 입력해주세요.';
    passwordNewP.style.display = 'block';
    return false;
  } else {
    passwordEl.classList.remove('borderRed');
    passwordNewP.style.display = 'none';
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
    alert('이메일이 존재하지 않습니다.');
  } else if(emailCheck && !passwordCheck){
    alert('비밀번호가 일치하지 않습니다.');
  } else {
    btnEl.addEventListener('click', clickLink);
  } 
}

/* event handling */ 
emailEl.addEventListener('focusout', focusoutEmail);
passwordEl.addEventListener('focusout', focusoutPassword);
formEl.addEventListener('focusout', btnDisabled);
btnEl.addEventListener('click', conditionalBtn);