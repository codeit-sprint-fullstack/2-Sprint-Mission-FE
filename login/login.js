import {
    showModal,
    closeModal,
    isEmailValid,
    isPasswordValid,
    isUser,
    validForm,
  } from './login.mjs';
  
  const checkEmail = document.querySelector('#email');
  const checkPW = document.querySelector('#password');
  const errMessage = document.querySelector('.errMessage');
  const PerrMessage = document.querySelector('.PerrMessage');
  const loginBtn = document.querySelector('.loginBtn');
  const modal = document.querySelector('#modal');
  
  const modalCloseBtn = document.querySelector('#modalClose');
  

  
  modalCloseBtn.addEventListener('click', () => closeModal(modal));

  function emailCheck(email) {
    if (!isEmailValid(email)) {
      checkEmail.classList.add('error');
      errMessage.style.display = 'block';
      checkEmail.focus();
    } else {
      checkEmail.classList.remove('error');
      errMessage.style.display = 'none';
    }
    loginBtn.classList.toggle('disabled', !validForm(email, checkPW.value));
  }
  
  function passwordCheck(password) {
    if (!isPasswordValid(password)) {
      checkPW.classList.add('error');
      PerrMessage.style.display = 'block';
      checkPW.focus();
    } else {
      checkPW.classList.remove('error');
      PerrMessage.style.display = 'none';
      loginBtn.classList.toggle(
        'disabled',
        !validForm(checkEmail.value, password)
      );
    }
  }
  
  checkEmail.addEventListener('focusout', () => emailCheck(checkEmail.value));
 
  checkPW.addEventListener('focusout', () => passwordCheck(checkPW.value));
  
  
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = checkEmail.value;
    const password = checkPW.value;
    if (!loginBtn.classList.contains('disabled')) {
      if (!isUser(email, password)) return showModal(modal);
      window.location.href = 'items.html';
    }
  });

