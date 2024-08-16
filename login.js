const checkEmail = document.querySelector('#email');
const checkPW = document.querySelector('#password-field');
const errMessage = document.querySelector('.err-message');
const PerrMessage = document.querySelector('.Perr-message');

function emailType() {
    const email = checkEmail.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // for (let k of email) {
    //     if (k === '@') return 1;
    // }
    // return 0;
    return emailPattern.test(email) ;
}

function emailCheck() {
    checkEmail.addEventListener('focusout', () => {
        if (checkEmail.value.trim() === '') {
            checkEmail.classList.add('error');
            errMessage.style.display = 'block';
        } else if (!emailType()) {
            checkEmail.classList.add('error');
            errMessage.style.display = 'block';
        } else {
            checkEmail.classList.remove('error');
            errMessage.style.display = 'none';
        }
    });
}

function passwordCheck() {
    checkPW.addEventListener('focusout', () => {
        if (checkPW.value.trim() === '' || checkPW.value.length < 8) {
            checkPW.classList.add('error');
            PerrMessage.style.display = 'block';
        } else {
            checkPW.classList.remove('error');
            PerrMessage.style.display = 'none';
        }
    })
}

emailCheck();
passwordCheck();

