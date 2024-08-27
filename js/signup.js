import { USER_DATA, validateEmail, validatePassword, togglePasswordVisibility} from './sign.js';

document.addEventListener("DOMContentLoaded", function(){

    //변수 선언
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");
    const inputPasswordCheck = document.getElementById("passwordcheck");
    const passwordToggle = document.querySelectorAll(".password-active-toggle");

    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorPasswordCheck = document.getElementById("errorPasswordCheck");

    const signupBtn = document.querySelector(".signup-btn");

    //passwordcheck 관련 함수
    /* 1. 비밀번호가 같지 않았을 때
       2. 제대로 입력했을 때 */

    function validatePasswordCheck(){
        const passwordValue = inputPassword.value.trim();
        const passwordcheckValue = inputPasswordCheck.value.trim();

        if(passwordValue !== passwordcheckValue) {
            errorPasswordCheck.textContent = "비밀번호가 일치하지 않습니다.";
            inputPasswordCheck.classList.add("input-error-box");
            errorPasswordCheck.style.display = "block";
            
            return false;
        }

        else{
            errorPasswordCheck.style.display = "none";
            inputPasswordCheck.classList.remove("input-error-box");

            return true;
        }

    }

    //모든 요소들 체크
    function validCheckInput(){
        const isValidEmail = validateEmail(inputEmail, errorEmail);
        const isValidPassword = validatePassword(inputPassword, errorPassword);
        const isValidPasswordCheck = validatePasswordCheck();
        
        if(isValidEmail && isValidPassword && isValidPasswordCheck){ // 버튼 색상
            signupBtn.disabled = false;
            signupBtn.style.backgroundColor = "#3692FF";
        }
        else {
            signupBtn.disabled = true;
            signupBtn.style.backgroundColor = "#9CA3AF";
        };
    }

    //focus out

    inputEmail.addEventListener("focusout", () => validateEmail(inputEmail, errorEmail));
    inputPassword.addEventListener("focusout", () => validatePassword(inputPassword, errorPassword));
    inputPasswordCheck.addEventListener("focusout", validatePasswordCheck);

    inputEmail.addEventListener("input", validCheckInput);
    inputPassword.addEventListener("input", validCheckInput);
    inputPasswordCheck.addEventListener("input", validCheckInput);

    //데이터베이스 회원가입 버튼 (데이터베이스 추가X)
    signupBtn.addEventListener("click", function(){
        if(!signupBtn.disabled){ //활성화될 때
            const email = inputEmail.value.trim();
            const existingUser = USER_DATA.find(user => user.email === email);

            if (existingUser) {
                alert('사용 중인 이메일입니다.');
            }
        
            else {
                window.location.href = "login.html";
            }
        }
    })

    passwordToggle.forEach((icon, index) => {
        icon.addEventListener("click", () => {
            if (index === 0) {
                togglePasswordVisibility(inputPassword);
            } else if (index === 1) {
                togglePasswordVisibility(inputPasswordCheck);
            }
        });
    })
    
});
