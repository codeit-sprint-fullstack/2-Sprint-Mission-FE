const email_input = document.querySelector('.input-email');
const email_error = document.querySelector('#email-error');
const email_pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

const pw_input = document.querySelector('.input-pw');
const pw_error = document.querySelector('#pw-error');

const loginBtn = document.querySelector('.log-in');

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0]

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
]

function validateEmail() {
  let error;
  
  try {
    if (email_input.value === '') {
      email_input.classList.add('fail');
      error = new TypeError('이메일을 입력해주세요.');
      throw error;
    }
    else if (!email_pattern.test(email_input.value)) {
      email_input.classList.add('fail');
      error = new TypeError('잘못된 이메일 형식입니다.');
      throw error;
    }
    else {
      email_error.value = '';
      email_input.classList.remove('fail');
      email_input.classList.add('pass');
    }
  }
  
  catch {
    email_input.classList.remove('pass');
    email_error.value = error.message;
    email_input.classList.add('fail');
  }

  finally {
    logButton();
  }
}

function validatePw() {
  let error;

  try {
    if (pw_input.value === '') {
      pw_input.classList.add('fail');
      error = new TypeError('비밀번호를 입력해주세요.');
      throw error;
    }
    else if (pw_input.value.length < 8) {
      pw_input.classList.add('fail');
      error = new TypeError('비밀번호를 8자 이상 입력해주세요.');
      throw error;
    }
    else {
      pw_error.value = '';
      pw_input.classList.remove('fail');
      pw_input.classList.add('pass');
    }
  }

  catch {
    pw_input.classList.remove('pass');
    pw_error.value = error.message;
    pw_input.classList.add('fail');
  }

  finally {
    logButton();
  }
}

function logButton() {
  if (email_input.classList.contains('pass') && pw_input.classList.contains('pass')) {
    loginBtn.classList.remove('inactive');
    loginBtn.style.backgroundColor = "#3692FF";
  }
  else {
    loginBtn.classList.add('inactive');
    loginBtn.style.backgroundColor = "#9CA3AF";
  }
}

function logClickBtn() {
  const new_data = {
    email: email_input.value,
    password: pw_input.value
  }

  const match_data = USER_DATA.find(user => user.email === new_data.email);

  if (match_data) {
    if (match_data.password === new_data.password) {
      modal.style.display = "block";
      window.location.href = "/items";
    }
    else {
      modal.style.display = "none";
    }
  }
  else {
    alert('등록된 정보가 없습니다.');
  }
}

span.onclick = function() {
  modal.style,display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

email_input.addEventListener('focusout', validateEmail);
pw_input.addEventListener('focusout', validatePw);
loginBtn.addEventListener('click', logClickBtn);