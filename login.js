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
    loginBtn.disabled = !isEmailValid || !isPasswordValid;
};

function loginFocusOut() {
    const userEmail = emailInput.value;

    // 기존 에러 삭제
    removeErrorMessage('email-error-noinput');
    removeErrorMessage('email-error-wrongformat');

    // 값이 없을 경우
    if (!userEmail) {
        return handleError(emailBox, 'email-error-noinput', '이메일을 입력해주세요.', '#email-area');
    }
    // 이메일 형식에 맞지 않을 경우
    if (!emailRegex.test(userEmail)) {
        return handleError(emailBox, 'email-error-wrongformat', '잘못된 이메일 형식입니다.', '#email-area');
    }

    // 에러 없음: 스타일 제거
    emailBox.classList.remove('gray-box-outer');
}

function passwordFocusOut() {
    const userPassword = passwordInput.value;

    // 기존 에러 삭제
    removeErrorMessage('password-error-noinput');
    removeErrorMessage('password-error-wrongformat');

    // 값이 없을 경우
    if (!userPassword) {
        return handleError(passwordBox, 'password-error-noinput', '비밀번호를 입력해주세요.', '#password-area');
    }
    // 비밀번호가 8자 미만인 경우
    if (userPassword.length < 8) {
        return handleError(passwordBox, 'password-error-wrongformat', '비밀번호를 8자 이상 입력해주세요.', '#password-area');
    }

    // 에러 없음: 스타일 제거
    passwordBox.classList.remove('gray-box-outer');
}

// 에러 처리 함수
function handleError(boxElement, id, message, area) {
    boxElement.classList.add('gray-box-outer');
    const msg = createErrorMsg(id, message);
    document.querySelector(area).appendChild(msg);
}

// 에러 메시지 제거 함수
function removeErrorMessage(id) {
    const errorMessage = document.querySelector(`#${id}`);
    if (errorMessage) return errorMessage.remove();
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

    if (loginBtn.disabled) return;

    // 로그인 성공 여부 확인
    const user = USER_DATA.find(user => user.email === userEmail && user.password === userPassword);

    if (user) {
        // 로그인 성공
        modalOn('로그인 성공');
        modalOk.addEventListener('click', modalLoginSuccess);
        return;
    }

    // 로그인 실패
    modalOn('비밀번호가 일치하지 않습니다.');
    modalOk.addEventListener('click', modalLoginFail);
}

//alert 모달
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
    const isHidden = (passwordInput.type === 'password');
    passwordInput.type = isHidden ? 'text' : 'password';
    toggleIcon.src = `login_create_account_asset/btn_visibility_${isHidden ? 'on' : 'off'}_24px.svg`;
}

emailBox.addEventListener('keyup', validateInputs);
passwordBox.addEventListener('keyup', validateInputs);
emailBox.addEventListener('focusout', loginFocusOut);
passwordBox.addEventListener('focusout', passwordFocusOut);
loginBtn.addEventListener('click', loginResult);
pwInvisible.addEventListener('click', passwordIconVis);
