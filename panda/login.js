const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
];

const idInput = document.querySelector('#login-id');
const passwordInput = document.querySelector('#login-password');
const loginButton = document.querySelector('#login-btn');
const idError = document.querySelector('#login-id-error');
const idFormatError = document.querySelector('#login-id-format-error');
const passwordError = document.querySelector('#login-password-error');
const passwordLengthError = document.querySelector('#login-password-length-error');


function validateId() {
    const idValue = idInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (idValue === '') {
        idInput.classList.add('invalid-after-focus');
        idError.style.display = 'block';
        idFormatError.style.display = 'none';
    } else if (!emailPattern.test(idValue)) {
        idInput.classList.add('invalid-after-focus');
        idError.style.display = 'none';
        idFormatError.style.display = 'block';
    } else {
        idInput.classList.remove('invalid-after-focus');
        idError.style.display = 'none';
        idFormatError.style.display = 'none';
    }
}

function validatePassword() {
    const passwordValue = passwordInput.value;
    if (passwordValue === '') {
        passwordInput.classList.add('invalid-after-focus');
        passwordError.style.display = 'block';
        passwordLengthError.style.display = 'none';
    } else if (passwordValue.length < 8) {
        passwordInput.classList.add('invalid-after-focus');
        passwordError.style.display = 'none';
        passwordLengthError.style.display = 'block';
    } else {
        passwordInput.classList.remove('invalid-after-focus');
        passwordError.style.display = 'none';
        passwordLengthError.style.display = 'none';
    }
}

function checkInputs() {
    const isIdValid = idInput.value !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(idInput.value);
    const isPasswordValid = passwordInput.value !== '' && passwordInput.value.length >= 8;

    if (isIdValid && isPasswordValid) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

idInput.addEventListener('blur', () => {
    validateId();
    checkInputs();
});

passwordInput.addEventListener('blur', () => {
    validatePassword();
    checkInputs();
});

loginButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    const enteredEmail = idInput.value;
    const enteredPassword = passwordInput.value;

    const user = USER_DATA.find(user => user.email === enteredEmail);

    if (!user) {
        alert('이메일이 존재하지 않습니다.');
    } else if (user.password !== enteredPassword) {
        alert('비밀번호가 일치하지 않습니다.');
    } else {
        window.location.href = 'items.html';
    }
});
