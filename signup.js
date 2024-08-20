const signupBtn = document.querySelector('.signup-button');
const emailBox = document.querySelector('#email-box');
const emailInput = document.querySelector('#email');
const passwordBox = document.querySelector('#password-box');
const passwordInput = document.querySelector('#password')
const passwordDblBox = document.querySelector('#password-dblcheck-box');
const passwordDblInput = document.querySelector('#password-doublecheck');
const nicknameBox = document.querySelector('#nickname-area');
const nicknameInput = document.querySelector('#nickname');
const toggleIconPw = document.querySelector('#toggle-icon-pw');
const toggleIconPwDbl = document.querySelector('#toggle-icon-dbl');
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
    const userPasswordDbl = passwordDblInput.value;
    const userNickname = nicknameInput.value;
    
    // 입력값 유효성 검사
    const isEmailValid = emailRegex.test(userEmail);
    const isPasswordValid = userPassword.length >= 8;
    const isPasswordDblValid = userPasswordDbl === userPassword;
    const isNicknameValid =  userNickname !== '';

    // 유효성에 따라 로그인 버튼 활성화
    signupBtn.disabled = !(isEmailValid && isPasswordValid && isPasswordDblValid && isNicknameValid);
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

function passwordDblFocusOut() {
    const userPasswordDbl = passwordDblInput.value;
    const userPassword = passwordInput.value;

    //기존 error 삭제
    removeErrorMessage('repassword-error-noinput');
    removeErrorMessage('repassword-error-wrongformat');

    // 값이 없을 경우
    if (userPasswordDbl === "") {
        passwordDblBox.classList.add('gray-box-outer');
        const msg = createErrorMsg('repassword-error-noinput', '비밀번호를 입력해주세요');
        document.querySelector('#repassword-area').appendChild(msg);
    }
    // 비밀번호가 8자 일치하지 않는 경우
    else if (userPasswordDbl !== userPassword) {
        passwordDblBox.classList.add('gray-box-outer');
        const msg = createErrorMsg('repassword-error-wrongformat', '비밀번호가 일치하지 않습니다.');
        document.querySelector('#repassword-area').appendChild(msg);
    }
    // 에러 없음: 스타일 제거
    else {
        passwordDblBox.classList.remove('gray-box-outer');
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

// 회원가입 버튼 성공, 실패 여부
function signupResult () {
    const userEmail = emailInput.value;
    const userPassword = passwordInput.value;

    if (!signupBtn.disabled) {
        const emailExists = USER_DATA.some(user => user.email === userEmail); //some 메서드: 베열의 요소 중 조건을 만족하는 값이 있는지 찾는 메서드
        if (emailExists) {
            modalOn('사용 중인 이메일입니다.');
            modalOk.addEventListener('click', modalSignupFail);
        } else {
            modalOn('회원가입 성공');
            USER_DATA.push({ email: userEmail, password: userPassword });
            modalOk.addEventListener('click', modalSignupSuccess);
        }
    }
}

//alert 모달
function modalOn (msg) {
    alertModal.classList.remove("hidden");
    alertModal.classList.add("visible");
    document.querySelector(".modal-text").innerText = msg;
}

function modalSignupSuccess () {
    location.href = '/login';
}

function modalSignupFail () {
    alertModal.classList.remove("visible");
    alertModal.classList.add("hidden");
}

//눈 아이콘 토글
function togglePasswordVisibility(inputElement, iconElement) {
    if (inputElement.type === 'password') {
        inputElement.type = 'text';
        iconElement.src = 'login_create_account_asset/btn_visibility_on_24px.svg';
    } else {
        inputElement.type = 'password';
        iconElement.src = 'login_create_account_asset/btn_visibility_off_24px.svg';
    }
}

emailBox.addEventListener('keyup', validateInputs);
passwordBox.addEventListener('keyup', validateInputs);
passwordDblBox.addEventListener('keyup', validateInputs);
nicknameBox.addEventListener('keyup', validateInputs);
emailBox.addEventListener('focusout', loginFocusOut);
passwordBox.addEventListener('focusout', passwordFocusOut);
passwordDblBox.addEventListener('focusout', passwordDblFocusOut);
signupBtn.addEventListener('click', signupResult);

toggleIconPw.addEventListener('click', () => {
    togglePasswordVisibility(passwordInput, toggleIconPw);
});
toggleIconPwDbl.addEventListener('click', () => {
    togglePasswordVisibility(passwordDblInput, toggleIconPwDbl);
});
