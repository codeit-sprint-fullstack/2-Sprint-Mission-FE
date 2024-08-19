document.addEventListener("DOMContentLoaded", function() {
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");

    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");

    const loginBtn = document.querySelector(".login-btn");


    //email 관련 함수

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

    //모든 요소들 체크
    function ValidCheckInput(){
        const isValidEmail = validationEmail();
        const isValidPassword = validationPassword();
        
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

    inputEmail.addEventListener("focusout", validationEmail);
    inputPassword.addEventListener("focusout", validationPassword);

    inputEmail.addEventListener("input", ValidCheckInput);
    inputPassword.addEventListener("input", ValidCheckInput);

    //item 페이지로 이동
    loginBtn.addEventListener("click", function(){
        if(!loginBtn.disabled) {
            window.location.href = "items.html";
        }
    });
});