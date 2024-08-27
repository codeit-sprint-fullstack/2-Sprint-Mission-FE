let emailValid = false;
let pwdValid = false;

const emailBox = document.getElementById("email_box");
const passwordBox = document.getElementById("password_box");
const loginButton = document.getElementById("loginButton");

function checkEmailValue() {
    const emailError = document.getElementById("email_check");
    const emailValue = emailBox.value;

    if (!emailValue) {
        emailError.innerText = "이메일을 입력해주세요.";
        emailError.classList.add("email_error");
        emailBox.classList.add("email_error");
        emailValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        emailError.innerText = "잘못된 이메일 형식입니다."
        emailError.classList.add("email_error");
        emailBox.classList.add("email_error");
        emailValid = false;
    } else {
        emailError.innerText = "";
        emailError.classList.remove("email_error");
        emailBox.classList.remove("email_error");
        emailValid = true;
    }
    activeLoginButton()
}

function checkPwdValue() {
    const pwdError = document.getElementById("pwd_check")
    const passwordValue = passwordBox.value;

    if (!passwordValue) {
        pwdError.innerText = "비밀번호를 입력해주세요.";
        pwdError.classList.add("pwd_error");
        passwordBox.classList.add("pwd_error");
        pwdValid = false;
    } else if (passwordValue.length < 8) {
        pwdError.innerText = "비밀번호를 8자 이상 입력해주세요.";
        pwdError.classList.add("pwd_error");
        passwordBox.classList.add("pwd_error");
        pwdValid = false;
    } else {
        pwdError.innerText = "";
        pwdError.classList.remove("pwd_error");
        passwordBox.classList.remove("pwd_error");
        pwdValid = true;
    }
    activeLoginButton()
}

function activeLoginButton() {
    if (emailValid && pwdValid) {
        loginButton.disabled = false;
         loginButton.style.backgroundColor = "#3182F6";
    } else {
        loginButton.disabled = true;
        loginButton.style.backgroundColor = "#9ca3af";
    }
}

const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    
    const emailValue = emailBox.value;
    const passwordValue = passwordBox.value;

    const user = USER_DATA.find(user => user.email === emailValue);

    if (!user) {
        alert('이메일이 존재하지 않습니다.');
    } else if (user.password !== passwordValue) {
        alert('비밀번호가 일치하지 않습니다.');
    } else {
        window.location.href = "items.html";
    }
});


emailBox.addEventListener("focusout", checkEmailValue);
passwordBox.addEventListener("focusout", checkPwdValue);