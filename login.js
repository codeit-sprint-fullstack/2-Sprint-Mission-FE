const checkEmail = document.querySelector('#email');
const checkPW = document.querySelector('#password-field');
const errMessage = document.querySelector('.err-message');
const PerrMessage = document.querySelector('.Perr-message');
const loginBtn = document.querySelector('.login-btn');

const USER_DATA = [
    {email: 'codeit1@codeit.com', password: 'codeit01!'},
    {email: 'codeit2@codeit.com', password: 'codeit02!'},
    {email: 'codeit3@codeit.com', password: 'codeit03!'},
    {email: 'codeit4@codeit.com', password: 'codeit04!'},
    {email: 'codeit5@codeit.com', password: 'codeit05!'},
    {email: 'codeit6@codeit.com', password: 'codeit06!'},
]; 

function emailType() {
    const email = checkEmail.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) ;
}

function isUser() {
    const user = USER_DATA.some((user) => user.email === checkEmail.value && user.password === checkPW.value);
    if (!user) {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    } else {
        window.location.href = 'items.html';
    }
}

function validate() {
    const isEmailValid = emailType() && checkEmail.value.trim() !== '';
    const isPasswordValid = checkPW.value.trim() !== '' && checkPW.value.length >= 8;

    if (isEmailValid && isPasswordValid) {
        loginBtn.classList.remove('disabled');
        // loginBtn.setAttribute('href', 'items.html');
    } else {
        loginBtn.classList.add('disabled');
        // loginBtn.setAttribute('href', '#');
    }
}

function emailCheck() {
    checkEmail.addEventListener('focusout', () => {
        if (checkEmail.value.trim() === '') {
            checkEmail.classList.add('error');
            errMessage.style.display = 'block';
            checkEmail.focus();
        } else if (!emailType()) {
            checkEmail.classList.add('error');
            errMessage.style.display = 'block';
            checkEmail.focus();
        } else {
            checkEmail.classList.remove('error');
            errMessage.style.display = 'none';
        }
        validate();
    });
    checkEmail.addEventListener('input', validate);
}

function passwordCheck() {
    checkPW.addEventListener('focusout', () => {
        if (checkPW.value.trim() === '' || checkPW.value.length < 8) {
            checkPW.classList.add('error');
            PerrMessage.style.display = 'block';
            checkPW.focus();
        } else {
            checkPW.classList.remove('error');
            PerrMessage.style.display = 'none';
        }
        validate();
    });
    checkPW.addEventListener('input', validate);
}

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!loginBtn.classList.contains('disabled')) {
        isUser();
    }
});

emailCheck();
passwordCheck();
validate();
