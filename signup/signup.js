const labelEl = document.querySelectorAll('label')
const emailLabelEl = labelEl[0];
const passwordLabelEl = labelEl[2];
const passwordCheckLabelEl = labelEl[3];
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const passwordCheckEl = document.querySelector('#passwordCheck');

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


function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.(com)$/;
  return emailPattern.test(email);
}

function focusoutEmail() {
  if(emailEl.value === ""){ 
    emailEl.classList.add('borderRed');
    emailNewP.textContent = "이메일을 입력해주세요.";
    emailNewP.style.display = 'block';
  } else if(!validateEmail(emailEl.value)) {
    emailEl.classList.add('borderRed');
    emailNewP.textContent = "잘못된 이메일 형식입니다.";
    emailNewP.style.display = 'block';
  } else {
    emailEl.classList.remove('borderRed');
    emailNewP.style.display = 'none';
  }
}

function focusoutPassword() {
  if(passwordEl.value === "") {
    passwordEl.classList.add('borderRed');
    passwordNewP.textContent = '비밀번호를 입력해주세요.';
    passwordNewP.style.display = 'block';
  } else if(passwordEl.value.length < 8) {
    passwordEl.classList.add('borderRed');
    passwordNewP.textContent = '비밀번호를 8자 이상 입력해주세요.';
    passwordNewP.style.display = 'block';
  } else {
    passwordEl.classList.remove('borderRed');
    passwordNewP.style.display = 'none';
  }
}

function focusoutPasswordCheck() {
  if(passwordCheckEl.value !== passwordEl.value) {
    passwordCheckEl.classList.add('borderRed');
    passwordCheckNewP.textContent = '비밀번호가 일치하지 않습니다.';
    passwordCheckNewP.style.display = 'block';
  } else {
    passwordCheckEl.classList.remove('borderRed');
    passwordCheckNewP.style.display = 'none';
  }
}


emailEl.addEventListener('focusout', focusoutEmail);
passwordEl.addEventListener('focusout', focusoutPassword);
passwordCheckEl.addEventListener('focusout', focusoutPasswordCheck);