const loginBtn = document.querySelector('.login-button');
const emailBox = document.querySelector('#email-box');
const emailInput = document.querySelector('#email');
const passwordBox = document.querySelector('#password-box');
const passwordInput = document.querySelector('#password')
const toggleIcon = document.querySelector('#toggle-icon');
const pwInvisible = document.querySelector('.vis-password');
const alertModal = document.querySelector('.modal-bg');
const modalOk = document.querySelector('.button-close');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 입력값의 유효성을 검사 & 로그인 버튼 활성화
function validateInputs() {
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;
    
    // 입력값 유효성 검사
    const isEmailValid = emailRegex.test(userEmail);
    const isPasswordValid = userPassword.length >= 8;

    // 유효성에 따라 로그인 버튼 활성화
    loginBtn.disabled = !(isEmailValid && isPasswordValid);
};

function loginFocusOut() {
    const userEmail = emailInput.value;

    //기존 error 삭제
    removeErrorMessage('email-error-noinput');
    removeErrorMessage('email-error-wrongformat');

    // 값이 없을 경우
    if (userEmail === "") {
        emailBox.classList.add('gray-box-outer');
        const msg = createErrorMsg('email-error-noinput', '이메일을 입력해주세요.');
        document.querySelector('#email-area').appendChild(msg);
    }
    // 이메일 형식에 맞지 않을 경우
    else if (!emailRegex.test(userEmail)) {
        emailBox.classList.add('gray-box-outer');
        const msg = createErrorMsg('email-error-wrongformat', '잘못된 이메일 형식입니다.');
        document.querySelector('#email-area').appendChild(msg);
    }
    // 에러 없음: 스타일 제거
    else {
        emailBox.classList.remove('gray-box-outer');
    }
}

function passwordFocusOut() {
    const userPassword = passwordInput.value;

    //기존 error 삭제
    removeErrorMessage('password-error-noinput');
    removeErrorMessage('password-error-wrongformat');

    // 값이 없을 경우
    if (userPassword === "") {
        passwordBox.classList.add('gray-box-outer');
        const msg = createErrorMsg('password-error-noinput', '비밀번호를 입력해주세요');
        document.querySelector('#password-area').appendChild(msg);
    }
    // 비밀번호가 8자 이상인 경우
    else if (userPassword.length < 8) {
        passwordBox.classList.add('gray-box-outer');
        const msg = createErrorMsg('password-error-wrongformat', '비밀번호를 8자 이상 입력해주세요.');
        document.querySelector('#password-area').appendChild(msg);
    }
    // 에러 없음: 스타일 제거
    else {
        passwordBox.classList.remove('gray-box-outer');
    }
}

// 에러 메시지 제거 함수
function removeErrorMessage(id) {
    const errorMessage = document.querySelector(`#${id}`);
    if (errorMessage) {
        errorMessage.remove();
    }
}

// 에러 메시지 생성 함수
function createErrorMsg(id, text) {
    const msg = document.createElement("div");
    msg.id = id;
    msg.textContent = text;
    msg.className = 'error-red';
    return msg;
}

// 로그인 버튼 성공, 실패 여부
function loginResult () {
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;

    if (!loginBtn.disabled) {
        let loginSuccess = false;
        //로그인 성공
        for (const user of USER_DATA) {
            if (userEmail === user.email && userPassword === user.password) {
                modalOn('로그인 성공');
                modalOk.addEventListener('click', modalLoginSuccess);
                loginSuccess = true;
                break;
            }
        }
        //로그인 실패
        if (!loginSuccess) {
            modalOn('비밀번호가 일치하지 않습니다.');
            modalOk.addEventListener('click', modalLoginFail);
        }
    }
}

function modalOn (msg) {
    alertModal.classList.remove("hidden");
    alertModal.classList.add("visible");
    document.querySelector(".modal-text").innerText = msg;
}

function modalLoginSuccess () {
    location.href = '/items';
}

function modalLoginFail () {
    alertModal.classList.remove("visible");
    alertModal.classList.add("hidden");
}

//눈 아이콘 토글
function passwordIconVis () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = 'login_create_account_asset/btn_visibility_on_24px.svg';
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = 'login_create_account_asset/btn_visibility_off_24px.svg';
    }
}

emailBox.addEventListener('keyup', validateInputs);
passwordBox.addEventListener('keyup', validateInputs);
emailBox.addEventListener('focusout', loginFocusOut);
passwordBox.addEventListener('focusout', passwordFocusOut);
loginBtn.addEventListener('click', loginResult);
pwInvisible.addEventListener('click', passwordIconVis);
