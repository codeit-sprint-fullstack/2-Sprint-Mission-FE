const checkEmail = document.querySelector('#email');
const checkPW = document.querySelector('#password-field');
const errMessage = document.querySelector('.err-message');
const PerrMessage = document.querySelector('.Perr-message');
const loginBtn = document.querySelector('.login-btn');
const modal = document.querySelector('#modal');
const modalText = document.querySelector('#modal-text');
const modalCloseBtn = document.querySelector('#modal-close');

const USER_DATA = [
    {email: 'codeit1@codeit.com', password: 'codeit01!'},
    {email: 'codeit2@codeit.com', password: 'codeit02!'},
    {email: 'codeit3@codeit.com', password: 'codeit03!'},
    {email: 'codeit4@codeit.com', password: 'codeit04!'},
    {email: 'codeit5@codeit.com', password: 'codeit05!'},
    {email: 'codeit6@codeit.com', password: 'codeit06!'},
]; 

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showModal() {
    modal.style.display = 'block';
}

function closeModal() {
    if (modal) modal.style.display = 'none';
}

modalCloseBtn.addEventListener('click', closeModal);

function isEmailValid(email) {
    return emailPattern.test(email);
}

function isPasswordValid(password) {
    return password.length >= 8;
}

function isUser(email, password) {
    return USER_DATA.some((user) => user.email === email && user.password === password);
}

function validForm(email, password) {
    return isEmailValid(email) && isPasswordValid(password);
}

function emailCheck() {
    const email = checkEmail.value;
    checkEmail.addEventListener('focusout', () => {
        if (!isEmailValid(email)) {
            checkEmail.classList.add('error');
            errMessage.style.display = 'block';
            //checkEmail.focus();
        } else {
            checkEmail.classList.remove('error');
            errMessage.style.display = 'none';
            loginBtn.classList.toggle('disabled', !validForm(email, checkPW.value));
        }
    });
}

function passwordCheck() {
    const password = checkPW.value;
    checkPW.addEventListener('focusout', () => {
        if (isEmailValid(email) && !isPasswordValid(password)) {
            checkPW.classList.add('error');
            PerrMessage.style.display = 'block';
            checkPW.focus();
        } else {
            checkPW.classList.remove('error');
            PerrMessage.style.display = 'none';
            loginBtn.classList.toggle('disabled', !validForm(checkEmail.value, password));
        }
    });
}

// function isValid() {
//     const email = checkEmail.value;
//     const password = checkPW.value;

//     checkEmail.addEventListener('focusout', () => {
//         if (!isEmailValid(email)) {
//             checkEmail.classList.add('error');
//             errMessage.style.display = 'block';
//             checkEmail.focus();
//         } else {
//             checkEmail.classList.remove('error');
//             errMessage.style.display = 'none';
//         }
//     });
//     checkPW.addEventListener('focusout', () => {
//         if (isEmailValid(email) && !isPasswordValid(password)) {
//             checkPW.classList.add('error');
//             PerrMessage.style.display = 'block';
//             checkPW.focus();
//         } else {
//             checkPW.classList.remove('error');
//             PerrMessage.style.display = 'none';
//         }
//     });
//     if (validForm(email, password)) {
//         loginBtn.classList.remove('disabled');
//     } else {
//         loginBtn.classList.add('disabled');
//     }
// }

// checkEmail.addEventListener('focusout', isValid);
checkEmail.addEventListener('input', emailCheck);
// checkPW.addEventListener('focusout', isValid);
checkPW.addEventListener('input', passwordCheck);

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = checkEmail.value;
    const password = checkPW.value;
    if (!loginBtn.classList.contains('disabled')) {
        if (isUser(email, password)) {
            window.location.href = 'items.html';
        } else {
            showModal();
        }
    }
});
