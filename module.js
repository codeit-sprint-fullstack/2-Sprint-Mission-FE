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
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');

/* setting variable and fixing html  */
const emailNewP = document.createElement('p');
emailNewP.classList.add("errorMsg");
emailLabelEl.append(emailNewP);

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

function passwordToggle() {
  if(passwordEl.type === 'password'){
    passwordEl.setAttribute('type', 'text');
  } else{
    passwordEl.setAttribute('type', 'password');
  }
}

export {USER_DATA, formEl, labelEl, emailLabelEl, emailEl, passwordEl, emailNewP,
  validateEmail, passwordToggle, focusoutEmail
};
