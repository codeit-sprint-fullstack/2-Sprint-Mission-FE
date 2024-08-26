

document.getElementById('email').addEventListener('focusout', validateEmailInput);
document.getElementById('password').addEventListener('focusout', validatePasswordInput);
document.getElementById('loginForm').addEventListener('input', checkFormValidity);
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 기본 동작 방지
    window.location.href = '../items/'; // 로그인 성공 후 이동
});

function validateEmailInput() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const email = emailInput.value;

    emailError.textContent = ''; // 에러 메시지 초기화
    emailInput.classList.remove('input-error'); // 에러 스타일 초기화

    if (!email) {
        emailError.textContent = '이메일을 입력해주세요.';
        emailInput.classList.add('input-error');
    } else if (!validateEmail(email)) {
        emailError.textContent = '잘못된 이메일 형식입니다.';
        emailInput.classList.add('input-error');
    }
    checkFormValidity();
}

function validatePasswordInput() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    const password = passwordInput.value;

    passwordError.textContent = ''; // 에러 메시지 초기화

    if (!password) {
        passwordError.textContent = '비밀번호를 입력해주세요.';
    } else if (password.length < 8) {
        passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.';
    }
    checkFormValidity();
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function checkFormValidity() {
    const emailError = document.getElementById('emailError').textContent;
    const passwordError = document.getElementById('passwordError').textContent;
    const loginButton = document.getElementById('loginButton');

    // 에러 메시지가 없고 입력란이 비어있지 않으면 로그인 버튼 활성화
    if (!emailError && !passwordError && 
        document.getElementById('email').value.trim() !== '' && 
        document.getElementById('password').value.trim() !== '') {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}


const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
        { email: 'codeit2@codeit.com', password: "codeit202!" },
        { email: 'codeit3@codeit.com', password: "codeit303!" },
        { email: 'codeit4@codeit.com', password: "codeit404!" },
        { email: 'codeit5@codeit.com', password: "codeit505!" },
        { email: 'codeit6@codeit.com', password: "codeit606!" },
]

document.getElementById('loginButton').addEventListener('click', () => {
    const email = document.querySelector('.loginEmail').value;
    const password = document.querySelector('.loginPassword').value;

    // 이메일이 데이터베이스에 존재하는지 확인
    if (!USER_DATA.hasOwnProperty(email)) {
        alert('비밀번호가 일치하지 않습니다.');
    } else if (USER_DATA[email] !== password) {
        alert('비밀번호가 일치하지 않습니다.');
    } else {
        // 로그인 성공
        window.location.href = "../items/"; // 로그인 성공 시 페이지 이동
    }
});


