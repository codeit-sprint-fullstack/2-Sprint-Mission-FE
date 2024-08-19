const email_input = document.querySelector('.input-email');
const email_error = document.querySelector('#email-error');

const nick_input = document.querySelector('.input-nick');
const nick_error = document.querySelector('#nick-error');

const pw_input = document.querySelector('.input-pw');
const pw_error = document.querySelector('#pw-error');

const checkpw_input = document.querySelector('.input-checkpw');
const checkpw_error = document.querySelector('#checkpw-error');

const loginBtn = document.querySelector('.sign-up');

export const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
]

function validity_email() {
  let error;

  try {
    if (email_input.value === '') {
      email_input.classList.add('fail');
      error = new TypeError('이메일을 입력해주세요.');
      throw error;
    }
    else if (!email_input.checkValidity()) {
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
    email_input.classList.add('fail')
  }

  finally {
    button();
  }
}

function validity_nick() {
  let error;

  try {
    if (nick_input.value === '') {
      nick_input.classList.add('fail');
      error = new TypeError('닉네임을 입력해주세요.');
      throw error;
    }
    else if (!nick_input.checkValidity()) {
      nick_input.classList.add('fail');
      error = new TypeError('잘못된 닉네임 형식입니다.');
      throw error;
    }
    else {
      nick_error.value = '';
      nick_input.classList.remove('fail');
      nick_input.classList.add('pass');
    }
  }

  catch {
    nick_input.classList.remove('pass');
    nick_error.value = error.message;
    nick_input.classList.add('fail');
  }

  finally {
    button();
  }
}

function validity_pw() {
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
    button();
  }
}

function match_pw() {
  let error;

  try {
    if (checkpw_input.value === '') {
      checkpw_input.classList.add('fail');
      error = new TypeError('비밀번호를 입력해주세요.');
      throw error;
    }
    else if (checkpw_input.value !== pw_input.value) {
      checkpw_input.classList.add('fail');
      error = new TypeError('비밀번호가 일치하지 않습니다.');
      throw error;
    }
    else {
      checkpw_error.value = '';
      checkpw_input.classList.remove('fail');
      checkpw_input.classList.add('pass');
    }
  }

  catch {
    checkpw_input.classList.remove('pass');
    checkpw_error.value = error.message;
    checkpw_input.classList.add('fail');
  }

  finally {
    button();
  }
}

function button() {
  if (email_input.classList.contains('pass') && nick_input.classList.contains('pass') && pw_input.classList.contains('pass') && checkpw_input.classList.contains('pass')){
    loginBtn.classList.remove('inactive');
  }
  else {
    loginBtn.classList.add('inactive');
  }
}

function clickBtn() {
  const new_data = {
    email: email_input.value,
    password: pw_input.value
  }

  const match_data = USER_DATA.find(user => user.email === new_data.email)

  if (match_data) {
    alert('사용 중인 이메일입니다.');
  }

  else {
    alert('회원가입 성공');
    USER_DATA.push(new_data);
    window.location.href = "/login";
  }
}

email_input.addEventListener('focusout', validity_email);
nick_input.addEventListener('focusout', validity_nick);
pw_input.addEventListener('focusout', validity_pw);
checkpw_input.addEventListener('focusout', match_pw);
loginBtn.addEventListener('click', clickBtn);