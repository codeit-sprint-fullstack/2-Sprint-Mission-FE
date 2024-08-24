//signin(login)과 signup 공통 모듈 
export const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

//email 관련 함수 
/* 1. 아무 것도 입력하지 않았을 때
   2. 잘못된 이메일 형식일 때
   3. 제대로 입력했을 때 */

export function validateEmail(inputEmail, errorEmail) {
    const emailValue = inputEmail.value.trim();
    if (!emailValue) {
        errorEmail.textContent = "이메일을 입력해주세요.";
        inputEmail.classList.add("input-error-box");
        errorEmail.style.display = "block";

        return false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        errorEmail.textContent = "잘못된 이메일 형식입니다.";
        inputEmail.classList.add("input-error-box");
        errorEmail.style.display = "block";

        return false;

    } else {
        errorEmail.style.display = "none";
        inputEmail.classList.remove("input-error-box");

        return true;
    }
};

//password 관련 함수
/* 1. 아무 것도 입력하지 않았을 때
   2. 8자 이상 입력하지 않았을 때
   3. 제대로 입력했을 때*/

export function validatePassword(inputPassword, errorPassword) {
    const passwordValue = inputPassword.value.trim();

    if (!passwordValue) {
        errorPassword.textContent = "비밀번호를 입력하세요.";
        inputPassword.classList.add("input-error-box");
        errorPassword.style.display = "block";

        return false;

    } 

    else if (passwordValue.length < 8) {
        errorPassword.textContent = "비밀번호를 8자 이상 입력해주세요.";
        inputPassword.classList.add("input-error-box");
        errorPassword.style.display = "block";

        return false;
    } 
    
    else {
        errorPassword.style.display = "none";
        inputPassword.classList.remove("input-error-box");

        return true;
    }
};

export function togglePasswordVisibility(input) {
    input.type = input.type === "password" ? "text" : "password";   //? true : false
};
