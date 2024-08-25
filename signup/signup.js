let emailValid = false;
let pwValid = false;

const email_input = document.getElementById("email_input");
const nickname_input = document.getElementById("nickname_input");
const password_input = document.getElementById("password_input");
const password_verify_input = document.getElementById("password_verify_input");
const signup_button = document.getElementById("signup_button");

function checkEmailValue() {
  const emailError = document.getElementById("email_check");
  const emailValue = email_input.value;

  if (!emailValue) {
    emailError.innerText = "이메일을 입력해주세요.";
    emailError.classList.add("email_error");
    email_input.classList.add("email_error");
    emailValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    emailError.innerText = "잘못된 이메일 형식입니다.";
    emailError.classList.add("email_error");
    email_input.classList.add("email_error");
    emailValid = false;
  } else {
    emailError.innerText = "";
    emailError.classList.remove("email_error");
    email_input.classList.remove("email_error");
    emailValid = true;
  }
  activeSignupButton();
}

function checkPwValue() {
  const pwError = document.getElementById("pw_check");
  const passwordValue = password_input.value;

  if (!passwordValue) {
    pwError.innerText = "비밀번호를 입력해주세요.";
    pwError.classList.add("pw_error");
    password_input.classList.add("pw_error");
    pwValid = false;
  } else if (passwordValue.length < 8) {
    pwError.innerText = "비밀번호를 8자 이상 입력해주세요.";
    pwError.classList.add("pw_error");
    password_input.classList.add("pw_error");
    pwValid = false;
  } else {
    pwError.innerText = "";
    pwError.classList.remove("pw_error");
    password_input.classList.remove("pw_error");
    pwValid = true;
  }
  activeSignupButton();
}

function checkPwMatch() {
  const passwordValue = password_input.value;
  const passwordDoubleValue = password_verify_input.value;

  if (passwordValue !== passwordDoubleValue) {
    pw_double_check.innerText = "비밀번호가 일치하지 않습니다.";
    pw_double_check.classList.add("pw_error");
    password_verify_input.classList.add("pw_error");
    pwValid = false;
  } else {
    pw_double_check.innerText = "";
    pw_double_check.classList.remove("pw_error");
    password_verify_input.classList.remove("pw_error");
    pwValid = true;
  }
  activeSignupButton();
}

email_input.addEventListener("focusout", checkEmailValue);
password_input.addEventListener("focusout", checkPwValue);
password_verify_input.addEventListener("focusout", checkPwMatch);

function activeSignupButton() {
  if (emailValid && pwValid) {
    signup_button.disabled = false;
    signup_button.style.backgroundColor = "#3182F6";
  } else {
    signup_button.disabled = true;
    signup_button.style.backgroundColor = "#9ca3af";
  }
}

const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit101!" },
  { email: "codeit2@codeit.com", password: "codeit202!" },
  { email: "codeit3@codeit.com", password: "codeit303!" },
  { email: "codeit4@codeit.com", password: "codeit404!" },
  { email: "codeit5@codeit.com", password: "codeit505!" },
  { email: "codeit6@codeit.com", password: "codeit606!" },
];

signup_button.addEventListener("click", function (event) {
  event.preventDefault();

  const emailValue = email_input.value;
  const nicknameValue = nickname_input.value;
  const passwordValue = password_input.value;
  const passwordDoubleValue = password_verify_input.value;

  const userExists = USER_DATA.some((user) => user.email === emailValue);

  if (userExists) {
    alert("사용 중인 이메일입니다.");
  } else {
    USER_DATA.push({
      email: emailValue,
      nickname: nicknameValue,
      password: passwordValue,
    });

    alert("회원가입이 성공적으로 완료되었습니다.");
    window.location.href = "/login";
  }
});
