import { USER_DATA, validateEmail, validatePassword, togglePasswordVisibility} from './sign.js';

document.addEventListener("DOMContentLoaded", function() {
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");

    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");

    const loginBtn = document.querySelector(".login-btn");
    const passwordToggle = document.querySelector(".password-active-toggle");

    //모든 요소들 체크
    function validCheckInput(){
        const isValidEmail = validateEmail(inputEmail, errorEmail);
        const isValidPassword = validatePassword(inputPassword, errorPassword);
        
        if(isValidEmail && isValidPassword){ // 버튼 색상
            loginBtn.disabled = false;
            loginBtn.style.backgroundColor = "#3692FF";
        }
        else {
            loginBtn.disabled = true;
            loginBtn.style.backgroundColor = "#9CA3AF";
        }
    }

    //focus out

    inputEmail.addEventListener("focusout", () => validateEmail(inputEmail, errorEmail));
    inputPassword.addEventListener("focusout", () => validatePassword(inputPassword, errorPassword));

    inputEmail.addEventListener("input", validCheckInput);
    inputPassword.addEventListener("input", validCheckInput);

    //데이터베이스 로그인 버튼
    loginBtn.addEventListener("click", function(){
        if(!loginBtn.disabled){ //활성화될 때
            const email = inputEmail.value.trim();
            const password = inputPassword.value.trim();
            
            const user = USER_DATA.find(user => user.email === email);

            if(user){
                if(user.password === password){ //비밀번호 일치 시
                    window.location.href = "items.html"
                }
                else {
                    alert("비밀번호가 일치하지 않습니다.");
                }
            }
            else {
                alert("입력한 이메일이 존재하지 않습니다.");
            }
        }
    });

    passwordToggle.addEventListener("click", () => togglePasswordVisibility(inputPassword));
    
});