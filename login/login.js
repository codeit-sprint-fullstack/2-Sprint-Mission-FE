let emailValid = false;
let pwValid = false;

const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const login_button = document.getElementById("login_button");

function checkEmail() {
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
  activeLoginButton();
}

function checkPw() {
  const pwError = document.getElementById("pw_check");
  const pwValue = password_input.value;

  if (!pwValue) {
    pwError.innerText = "비밀번호를 입력해주세요.";
    pwError.classList.add("pw_error");
    password_input.classList.add("pw_error");
    pwValid = false;
  } else if (pwValue.length < 8) {
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
  activeLoginButton();
}

function activeLoginButton() {
  if (emailValid && pwValid) {
    login_button.disabled = false;
    login_button.style.backgroundColor = "#3182F6";
  } else {
    login_button.disabled = true;
    login_button.style.backgroundColor = "#9ca3af";
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

login_button.addEventListener("click", function (event) {
  event.preventDefault();

  const emailValue = email_input.value;
  const pwValue = password_input.value;

  const user = USER_DATA.find((user) => user.email === emailValue);

  if (!user) {
    alert("이메일이 존재하지 않습니다.");
  } else if (user.password !== pwValue) {
    alert("비밀번호가 일치하지 않습니다.");
  } else {
    window.location.href = "items.html";
  }
});

email_input.addEventListener("focusout", checkEmail);
password_input.addEventListener("focusout", checkPw);
