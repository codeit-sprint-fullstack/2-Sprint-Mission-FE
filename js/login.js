document.addEventListener("DOMContentLoaded", function() {
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");

    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");

    const loginBtn = document.querySelector(".login-btn");

    //8.20 데이터베이스 추가
    const USER_DATA = [
            { email: 'codeit1@codeit.com', password: "codeit101!" },
            { email: 'codeit2@codeit.com', password: "codeit202!" },
            { email: 'codeit3@codeit.com', password: "codeit303!" },
            { email: 'codeit4@codeit.com', password: "codeit404!" },
            { email: 'codeit5@codeit.com', password: "codeit505!" },
            { email: 'codeit6@codeit.com', password: "codeit606!" },
    ]

    //email 관련 함수

    function validateEmail(){
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

    function validatePassword(){
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
    function validCheckInput(){
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
        
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

    inputEmail.addEventListener("focusout", validateEmail);
    inputPassword.addEventListener("focusout", validatePassword);

    inputEmail.addEventListener("input", validCheckInput);
    inputPassword.addEventListener("input", validCheckInput);

    //item 페이지로 이동
    loginBtn.addEventListener("click", function(){
        if(!loginBtn.disabled) {
            window.location.href = "items.html";
        }
    });

    //데이터베이스 로그인 버튼
    loginBtn.addEventListener("click", function(){
        if(!loginBtn.disabled){ //활성화될 때
            const email = inputEmail.value.trim();
            const password = inputPassword.value.trim();

            if(email in USER_DATA){
                if(USER_DATA[email] === password){ //비밀번호 일치 시
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
    })

});