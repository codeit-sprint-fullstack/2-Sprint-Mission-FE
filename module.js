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

function emailLimit(){
  emailNewP.textContent = "이메일을 입력해주세요.";
  emailNewP.style.display = 'block';
}

function emailIncorrect(){
  emailNewP.textContent = "잘못된 이메일 형식입니다.";
  emailNewP.style.display = 'block';
}

function emailHidden(){
  emailNewP.style.display = 'none';
}

function focusoutEmail() {
  if(emailEl.value === ""){ 
    emailEl.classList.add('borderRed');
    emailLimit();
    return false;
  } else if(!validateEmail(emailEl.value)) {
    emailEl.classList.add('borderRed');
    emailIncorrect();
    return false;
  } else {
    emailEl.classList.remove('borderRed');
    emailHidden();
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

/* modal */
const mainEl = document.querySelector('main');
const modal = document.createElement('div');
modal.classList.add('modal');
const modalBox = document.createElement('div');
modalBox.classList.add('modalBoxStyle');
const modalH1 = document.createElement('h1');
modalH1.classList.add('modalH1style');
const modalInput = document.createElement('input');
modalInput.classList.add('modalInputStyle');
modalInput.setAttribute('type', 'button');
modalInput.setAttribute('value', '확인')  
mainEl.after(modal);
modal.append(modalBox)
modalBox.append(modalH1);
modalBox.append(modalInput);

function closeModal(){
  modal.style.display = 'none';
}

/* modul */
export {USER_DATA, formEl, labelEl, emailLabelEl, emailEl, passwordEl, emailNewP,
  validateEmail, passwordToggle, focusoutEmail, modal, modalH1,
  modalInput, closeModal
};
