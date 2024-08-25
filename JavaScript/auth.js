import { 
  showModal, closeModal, isEmailValid, isPasswordValid, isUser, validForm 
} from './moduleAuth.mjs'; 

const queryEmail = document.querySelector('#email');
const enterEmail = document.querySelector('.enterEmail'); // Fixed typo
const notEmail = document.querySelector('.notEmail');
const queryPassword = document.querySelector('#password');
const enterPassword = document.querySelector('.enterPassword');
const loginBtn = document.querySelector('#loginBtn');
const modal = document.querySelector('#modal');
const modalNotMatchingPassword = document.querySelector('#notMatchingPassword'); // Fixed selector

function emailVerification(email) {
  if (!isEmailValid(email)) { // Correct usage of parameter
    queryEmail.classList.add('error');
    enterEmail.style.display = 'block';
    queryEmail.focus();
  } else {
    queryEmail.classList.remove('error');
    enterEmail.style.display = 'none';
  }
  loginBtn.classList.toggle('disabled', !validForm(email, queryPassword.value));
}

function passwordCheck(password) {
  if (!isPasswordValid(password)) {
    queryPassword.classList.add('error');
    enterPassword.style.display = 'block';
    queryPassword.focus(); // Use queryPassword since password is a value
  } else {
    queryPassword.classList.remove('error');
    enterPassword.style.display = 'none';
    loginBtn.classList.toggle('disabled', !validForm(queryEmail.value, password));
  }
}

// Attach event listeners to the input elements, not the functions
queryEmail.addEventListener('focusout', () => emailVerification(queryEmail.value));
queryPassword.addEventListener('focusout', () => passwordCheck(queryPassword.value));

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = queryEmail.value;
  const password = queryPassword.value;
  if (!loginBtn.classList.contains('disabled')) {
    if (!isUser(email, password)) return showModal();
    window.location.href = 'items.html';
  }
});