document.querySelector('.input-email').addEventListener('focusout', valemail);
document.querySelector('.input-pw').addEventListener('focusout', valpw);
document.querySelector('.input-pw').addEventListener('focusout', actbtn);
document.querySelector('.log-in').addEventListener('click', checkData);

function valemail(){
  const input = document.querySelector('.input-email');
  const blank = document.querySelector('.blank-email-error');
  const error = document.querySelector('.email-error');
  const pattern = /username@codeit.com/;

  if (input.value.length === 0) {
    blank.style.display = 'block';
    input.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    error.style.display = 'none';
    return false;
  }

  else if (input.value.length > 0 && !pattern.test(input.value)) {
    blank.style.display = 'none';
    input.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    error.style.display = 'block';
    return false;
  }

  else {
    blank.style.display = 'none';
    input.style.cssText = 'none';
    error.style.display = 'none';
    return true;
  }
}

function valpw(){
  const input = document.querySelector('.input-pw');
  const blank = document.querySelector('.blank-password-error');
  const error = document.querySelector('.password-error');

  if (input.value.length === 0) {
    blank.style.display = 'block';
    input.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    error.style.display = 'none';
    return false;
  }
  
  else if (input.value.length < 8) {
    blank.style.display = 'none';
    input.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    error.style.display = 'block'
    return false;
  }

  else {
    blank.style.display = 'none';
    input.style.cssText = 'none';
    error.style.display = 'none';
    return true;
  }
}

function actbtn() {
  const emailValid = valemail();
  const pwValid = valpw();
  const loginBtn = document.querySelector('.log-in');

  if (emailValid && pwValid) {
    loginBtn.disabled = false;
  }
  
  else {
    loginBtn.disabled = true;
  }
}

function item() {
  location.href = '/items';
}

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

function checkData(){
  const email = document.querySelector('.input-email').value;
  const pw = document.querySelector('.input-pw').value;
  const checkEmail = USER_DATA.some(user => user.email === email);
  const checkPw = USER_DATA.some(user => user.pw === pw);

  if (!email) {
    alert('이메일 또는 비밀번호가 잘못되었습니다.');
  }

  else if (email && !pw) {
    alert('비밀번호가 일치하지 않습니다.');
  }

  else {
    document.querySelector('.log-in').addEventListener('click', item);
  }
}