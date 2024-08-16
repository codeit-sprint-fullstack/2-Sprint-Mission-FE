const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];


const emailBox = document.querySelector('#email-input');
emailBox.addEventListener('focusout', (e) => {
    const userEmail = document.querySelector('#email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 기존의 에러 메시지를 모두 제거
    const emailErrorNoInput = document.querySelector('#email-error-noinput');
    const emailErrorWrongFormat = document.querySelector('#email-error-wrongformat');

    if (emailErrorNoInput) emailErrorNoInput.remove();
    if (emailErrorWrongFormat) emailErrorWrongFormat.remove();

    // 값이 없을 경우
    if (userEmail === "") {
        emailBox.classList.add('gray-box-outer');
        if (!document.querySelector('#email-error-noinput')) {
            const msg = document.createElement("div");
            msg.id = 'email-error-noinput';
            msg.textContent = "이메일을 입력해주세요.";
            msg.className = 'errorRed';
            document.querySelector('#email-area').appendChild(msg);
        }
    }
    // 이메일 형식에 맞지 않을 경우
    else if (!emailRegex.test(userEmail)) {
        emailBox.classList.add('gray-box-outer');
        if (!document.querySelector('#email-error-wrongformat')) {
            const msg = document.createElement("div");
            msg.id = 'email-error-wrongformat';
            msg.textContent = "잘못된 이메일 형식입니다.";
            msg.className = 'errorRed';
            document.querySelector('#email-area').appendChild(msg);
        }
    }
    // 에러 없음: 스타일 제거 및 에러 메시지 제거
    else {
        emailBox.classList.remove('gray-box-outer');
    }
});


const passwordBox = document.querySelector('#password-input');
passwordBox.addEventListener('focusout', (e) => {
    const userPassword = document.querySelector('#password').value;

    //기존 에러 메세지 제거
    const passwordInput = document.querySelector('#password-error-noinput');
    const passwordErrorDigit = document.querySelector("#password-error-digit");

    if (passwordInput) passwordInput.remove();
    if (passwordErrorDigit) passwordErrorDigit.remove();

    //비밀번호가 빈 값일 경우
    if (userPassword === ""){
        passwordBox.classList.add('gray-box-outer');
        if (!document.querySelector('#password-error-noinput')) {
            const msg = document.createElement("div");
            msg.id = 'password-error-noinput';
            msg.textContent = "비밀번호를 입력해주세요.";
            msg.className = 'errorRed';
            document.querySelector('#password-area').appendChild(msg);
        }
    }
    //비밀번호가 8자 미만일 경우
    else if (userPassword.length < 8){
        passwordBox.classList.add('gray-box-outer');
        if (!document.querySelector('#password-error-digit')) {
            const msg = document.createElement("div");
            msg.id = 'password-error-digit';
            msg.textContent = '비밀번호를 8자 이상 입력해주세요.';
            msg.className = 'errorRed';
            document.querySelector('#password-area').appendChild(msg);
        }
    }
    else{
        passwordBox.classList.remove('gray-box-outer');
    }
});

const loginBtn = document.querySelector('.login-button');

// 버튼 활성화
emailBox.addEventListener('keyup', validateInputs);
passwordBox.addEventListener('keyup', validateInputs);

// 입력값의 유효성을 검사 & 버튼 활성화
function validateInputs() {
    const userEmail = document.querySelector('#email').value;
    const userPassword = document.querySelector('#password').value;
    
    // 입력값 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(userEmail);
    const isPasswordValid = userPassword.length >= 8;

    // 유효성에 따라 로그인 버튼 활성화
    if (isEmailValid && isPasswordValid) {
        loginBtn.disabled = false; //
    } else {
        loginBtn.disabled = true; //
    }
};

// 로그인 버튼 성공, 실패 여부
loginBtn.addEventListener('click', (e) => {
    const userEmail = document.querySelector('#email').value;
    const userPassword = document.querySelector('#password').value;
    if (!loginBtn.disabled) {
        const emailList = USER_DATA.map(id => id.email);
        const passwordList = USER_DATA.map(pw => pw.password);
        if (emailList.includes(userEmail)) {
            if (passwordList.includes(userPassword)){
                location.href = '/items';
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    }
});

//눈 아이콘 토글
const userPassword = document.querySelector('#password')
const pwInvisible = document.querySelector('.vis-password');
const toggleIcon = document.querySelector('#toggle-icon');
pwInvisible.addEventListener('click', (e) => {
    if (userPassword.type === 'password') {
        userPassword.type = 'text';
        toggleIcon.src ='login_create_account_asset/btn_visibility_on_24px.svg';
    }
    else{
        userPassword.type = 'password'
        toggleIcon.src ='login_create_account_asset/btn_visibility_off_24px.svg';
    }
})