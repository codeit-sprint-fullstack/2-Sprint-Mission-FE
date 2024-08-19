document.addEventListener("DOMContentLoaded", function(){

    //변수 선언
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");
    const inputPasswordCheck = document.getElementById("passwordcheck");

    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorPasswordCheck = document.getElementById("errorPasswordCheck");

    const signupBtn = document.querySelector(".signup-btn");

    //email 관련 함수 
    /* 1. 아무 것도 입력하지 않았을 때
       2. 잘못된 이메일 형식일 때
       3. 제대로 입력했을 때*/

    function validationEmail(){
        const emailValue = inputEmail.value.trim();
        if(!emailValue){
            errorEmail.textContent = "이메일을 입력해주세요.";
            inputEmail.classList.add("input-error-box");
            errorEmail.style.display = "block";

            return false;
        }

        else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)){ //정규표현식이 아니라면
            errorEmail.textContent = "잘못된 이메일 형식입니다.";
            inputEmail.classList.add("input-error-box");
            errorEmail.style.display = "block";

            return false;
        }

        else {
            errorEmail.style.display = "none";
            inputEmail.classList.remove("input-error-box");

            return true;
        }
    }

    //password 관련 함수
    /* 1. 아무 것도 입력하지 않았을 때
       2. 8자 이상 입력하지 않았을 때
       3. 제대로 입력했을 때*/

    function validationPassword(){
        const passwordValue = inputPassword.value.trim();

        if(!passwordValue){
            errorPassword.textContent = "비밀번호를 입력하세요.";
            inputPassword.classList.add("input-error-box");
            errorPassword.style.display = "block";

            return false;
        }
        else if(passwordValue.length < 8){
            errorPassword.textContent = "비밀번호를 8자 이상 입력해주세요."
            inputPassword.classList.add("input-error-box");
            errorPassword.style.display = "block";

            return false;
        }

        else{
            errorPassword.style.display = "none";
            inputPassword.classList.remove("input-error-box");


            return true;
        }
    }

    //passwordcheck 관련 함수
    /* 1. 비밀번호가 같지 않았을 때
       2. 제대로 입력했을 때 */

    function validationPasswordCheck(){
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
    function ValidCheckInput(){
        const isValidEmail = validationEmail();
        const isValidPassword = validationPassword();
        const isValidPasswordCheck = validationPasswordCheck();
        
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

    inputEmail.addEventListener("focusout", validationEmail);
    inputPassword.addEventListener("focusout", validationPassword);
    inputPasswordCheck.addEventListener("focusout", validationPasswordCheck);

    inputEmail.addEventListener("input", ValidCheckInput);
    inputPassword.addEventListener("input", ValidCheckInput);
    inputPasswordCheck.addEventListener("input", ValidCheckInput);

    //로그인 페이지로 이동(임시용)
    signupBtn.addEventListener("click", function(){
        if(!signupBtn.disabled){
            window.location.href = "login.html";
        }
    });

});
