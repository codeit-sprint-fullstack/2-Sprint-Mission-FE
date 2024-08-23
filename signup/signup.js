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
const nicknameLabelEl = labelEl[1];
const passwordLabelEl = labelEl[2];
const passwordCheckLabelEl = labelEl[3];
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const nicknameEl = document.querySelector('#nickname');
const passwordCheckEl = document.querySelector('#passwordCheck');
const btnEl = document.querySelector('#signUpBtn');
const eyeImgFirstEl = document.querySelector('.eyeImg');
const eyeImgSecondEl = document.querySelector('.checkImg');

/* setting variable and fixing html  */
const emailNewP = document.createElement('p');
emailNewP.classList.add("errorMsg");
emailLabelEl.append(emailNewP);
  
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
function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

function focusoutPasswordCheck() {
  if(passwordCheckEl.value !== passwordEl.value) {
    passwordCheckEl.classList.add('borderRed');
    passwordCheckNewP.textContent = '비밀번호가 일치하지 않습니다.';
    passwordCheckNewP.style.display = 'block';
    return false;
  } else {
    passwordCheckEl.classList.remove('borderRed');
    passwordCheckNewP.style.display = 'none';
    return true;
  }
}

function foucusoutNickname(){
  if(nicknameEl.value === ""){
    nicknameEl.classList.add('borderRed');
    nicknameNewP.textContent = '닉네임을 입력해주세요.';
    nicknameNewP.style.display = 'block';
    return false;
  } else {
    nicknameEl.classList.remove('borderRed');
    nicknameNewP.style.display = 'none';
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
    alert('사용 중인 이메일입니다.')
  } else {
    btnEl.addEventListener('click', loginLink);
  }
}

function passwordToggle() {
  if(passwordEl.type === 'password'){
    passwordEl.setAttribute('type', 'text');
  } else{
    passwordEl.setAttribute('type', 'password');
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