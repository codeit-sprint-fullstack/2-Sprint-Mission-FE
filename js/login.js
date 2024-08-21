document.addEventListener("DOMContentLoaded", function(){

    //변수 선언
    const inputEmail = document.getElementById("email");
    const inputPassword = document.getElementById("password");
    const inputPasswordCheck = document.getElementById("passwordcheck");

    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorPasswordCheck = document.getElementById("errorPasswordCheck");

    const signupBtn = document.querySelector(".signup-btn");

<<<<<<< HEAD
    const USER_DATA = [
        { email: 'codeit1@codeit.com', password: "codeit101!" },
        { email: 'codeit2@codeit.com', password: "codeit202!" },
        { email: 'codeit3@codeit.com', password: "codeit303!" },
        { email: 'codeit4@codeit.com', password: "codeit404!" },
        { email: 'codeit5@codeit.com', password: "codeit505!" },
        { email: 'codeit6@codeit.com', password: "codeit606!" },
=======
    //8.20 데이터베이스 추가
    const USER_DATA = [
            { email: 'codeit1@codeit.com', password: "codeit101!" },
            { email: 'codeit2@codeit.com', password: "codeit202!" },
            { email: 'codeit3@codeit.com', password: "codeit303!" },
            { email: 'codeit4@codeit.com', password: "codeit404!" },
            { email: 'codeit5@codeit.com', password: "codeit505!" },
            { email: 'codeit6@codeit.com', password: "codeit606!" },
>>>>>>> Basic-양가현-sprint3
    ]

    //email 관련 함수 
    /* 1. 아무 것도 입력하지 않았을 때
       2. 잘못된 이메일 형식일 때
       3. 제대로 입력했을 때*/

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
    /* 1. 아무 것도 입력하지 않았을 때
       2. 8자 이상 입력하지 않았을 때
       3. 제대로 입력했을 때*/

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
        const isValidEmail = validateEmail();
        const isValidPassword = validatePassword();
<<<<<<< HEAD
        const isValidPasswordCheck = validatePasswordCheck();
=======
>>>>>>> Basic-양가현-sprint3
        
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

    inputEmail.addEventListener("focusout", validateEmail);
    inputPassword.addEventListener("focusout", validatePassword);
<<<<<<< HEAD
    inputPasswordCheck.addEventListener("focusout", validatePasswordCheck);

    inputEmail.addEventListener("input", validCheckInput);
    inputPassword.addEventListener("input", validCheckInput);
    inputPasswordCheck.addEventListener("input", validCheckInput);
=======

    inputEmail.addEventListener("input", validCheckInput);
    inputPassword.addEventListener("input", validCheckInput);
>>>>>>> Basic-양가현-sprint3

    // //로그인 페이지로 이동(임시용)
    // signupBtn.addEventListener("click", function(){
    //     if(!signupBtn.disabled){
    //         window.location.href = "login.html";
    //     }
    // });

    //데이터베이스 회원가입 버튼 (데이터베이스 추가X)
    signupBtn.addEventListener("click", function(){
        if(!signupBtn.disabled){ //활성화될 때
            const email = inputEmail.value.trim();
            const password = inputPassword.value.trim();

            if (email in USER_DATA) {
                alert('사용 중인 이메일입니다.');
            }
        
            else {
                window.location.href = "login.html";
            }
        }
<<<<<<< HEAD
    })

});
=======
    });

    //데이터베이스 로그인 버튼
    loginBtn.addEventListener("click", function(){
        if(!loginBtn.disabled){ //활성화될 때
            const email = inputEmail.value.trim();
            const password = inputPassword.value.trim();

            if(email in USER_DATA){
                if(USER_DATA[email] === password){ //비밀번호 일치 시
                    window.location.href = "item.html"
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
>>>>>>> Basic-양가현-sprint3
