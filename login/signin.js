import { showModal, closeModal, isEmailValid, isUser } from './login.mjs';

const checkEmail = document.querySelector('#email');
const checkPW = document.querySelector('#password-field');
const checkPC = document.querySelector('#password-check');
const errMessage = document.querySelector('.err-message');
const PerrMessage = document.querySelector('.Perr-message');
const PCerrMessage = document.querySelector('.PCerr-message');
const loginBtn = document.querySelector('.login-btn');
const modal = document.querySelector('#modal');
// const modalText = document.querySelector('#modal-text');
const modalCloseBtn = document.querySelector('#modal-close');

// const USER_DATA = [
//     {email: 'codeit1@codeit.com', password: 'codeit01!'},
//     {email: 'codeit2@codeit.com', password: 'codeit02!'},
//     {email: 'codeit3@codeit.com', password: 'codeit03!'},
//     {email: 'codeit4@codeit.com', password: 'codeit04!'},
//     {email: 'codeit5@codeit.com', password: 'codeit05!'},
//     {email: 'codeit6@codeit.com', password: 'codeit06!'},
// ]; 

// function showModal() {
//     if (modal) {
//         modal.style.display = 'block';
//     }
// }

// function closeModal() {
//     if (modal) modal.style.display = 'none';
// }

modalCloseBtn.addEventListener('click', closeModal);

// function isEmailValid(email) {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
// }


// function isPasswordValid(password) {
//     return password.length >= 8;
// }

// function isPasswordRepeated(password, passwordRepeat) {
//     return password === passwordRepeat;
// }

// function isUser(email) {
//     return USER_DATA.some((user) => user.email === email);
// }

function validForm(email, password, passwordRepeat) {
    return isEmailValid(email) && checkPasswordValid(password, passwordRepeat);
    // return isEmailValid(email) && isPasswordValid(password) && isPasswordRepeated(password, passwordRepeat);
}

// function validate() {
//     const isEmailValid = emailPattern.test(checkEmail.value);
//     const isPasswordValid = checkPW.value.length >= 8;
//     const isPasswordRepeated = checkPW.value === checkPC.value;

//     if (isEmailValid && isPasswordValid && isPasswordRepeated) {
//         loginBtn.classList.remove('disabled');
//     } else {
//         loginBtn.classList.add('disabled');
//     }
// }

function emailCheck(email) {
    if (!isEmailValid(email)) {
        checkEmail.classList.add('error');
        errMessage.style.display = 'block';
        checkEmail.focus();
    } else {
        checkEmail.classList.remove('error');
        errMessage.style.display = 'none';
    }
    loginBtn.classList.toggle('disabled', !validForm(email, checkPW.value, checkPC.value));
}

// function passwordCheck(password) {
//     if (!isPasswordValid(password)) {
//         checkPW.classList.add('error');
//         PerrMessage.style.display = 'block';
//         // checkPW.focus();
//     } else {
//         checkPW.classList.remove('error');
//         PerrMessage.style.display = 'none';
//     }
//     loginBtn.classList.toggle('disabled', !validForm(checkEmail.value, password, checkPC.value));
// }

// function PCCheck(password, passwordRepeat) {
//     if (!isPasswordRepeated(password, passwordRepeat)) {
//         checkPC.classList.add('error');
//         PCerrMessage.style.display = 'block';
//         // checkPC.focus();
//     } else {
//         checkPC.classList.remove('error');
//         PCerrMessage.style.display = 'none';
//     }
//     loginBtn.classList.toggle('disabled', !validForm(checkEmail.value, password, passwordRepeat));
// }

// function emailCheck(email) {
//     checkEmail.addEventListener('focusout', () => {
//         if (!emailPattern.test(checkEmail.value)) {
//             checkEmail.classList.add('error');
//             errMessage.style.display = 'block';
//             checkEmail.focus();
//         } else {
//             checkEmail.classList.remove('error');
//             errMessage.style.display = 'none';
//         }
//         validate();
//     });
//     checkEmail.addEventListener('input', validate);
// }
// 
// function passwordCheck(password) {
//     checkPW.addEventListener('focusout', () => {
//         if (checkPW.value.length < 8) {
//             checkPW.classList.add('error');
//             PerrMessage.style.display = 'block';
//             checkPW.focus();
//         } else {
//             checkPW.classList.remove('error');
//             PerrMessage.style.display = 'none';
//         }
//         validate();
//     });
//     checkPW.addEventListener('input', validate);
// }

// function PCCheck(passwordRepeat) {
//     checkPC.addEventListener('focusout', () => {
//         if (checkPC.value !== checkPW.value) {
//             checkPC.classList.add('error');
//             PCerrMessage.style.display = 'block';
//             // checkPC.focus();
//         } else {
//             checkPC.classList.remove('error');
//             PCerrMessage.style.display = 'none';
//         }
//         validate();
//     });
//     checkPC.addEventListener('input', validate);
// }


function checkPasswordValid(password, passwordRepeat) {
    console.log(password, passwordRepeat);
    if (!passwordRepeat) {
        console.log('passwordRepeat is empty', password.length);
        return password.length >= 8;
    }
    else {
        if (password === passwordRepeat) console.log('passwords match');
        return password === passwordRepeat;
    }
}

function pwCheck(password, passwordRepeat, check, errMessage, checkPasswordValid) {
    if (!checkPasswordValid(password, passwordRepeat)) {
        check.classList.add('error');
        errMessage.style.display = 'block';
        // check.focus();
    } else {
        check.classList.remove('error');
        errMessage.style.display = 'none';
    }
    loginBtn.classList.toggle('disabled', !validForm(checkEmail.value, checkPW.value, checkPC.value));
}


checkEmail.addEventListener('focusout', () => emailCheck(checkEmail.value));
// checkPW.addEventListener('focusout', () => passwordCheck(checkPW.value));
// checkPC.addEventListener('focusout', () => PCCheck(checkPW.value, checkPC.value));
checkPW.addEventListener('focusout', () => pwCheck(checkPW.value, checkPC.value, checkPW, PerrMessage, checkPasswordValid));
checkPC.addEventListener('focusout', () => pwCheck(checkPW.value, checkPC.value, checkPC, PCerrMessage, checkPasswordValid));

loginBtn.addEventListener('click', (e) => {
    const email = checkEmail.value;

    e.preventDefault();
    if (!loginBtn.classList.contains('disabled')) {
        if (isUser(email)) return showModal(modal);
        window.location.href = 'login.html';
    }
});

// emailCheck();
// passwordCheck();
// PCCheck();
// validate();
