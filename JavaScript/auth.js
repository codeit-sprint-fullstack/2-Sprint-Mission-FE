import { 
  showModal, closeModal, isEmailValid, isPasswordValid, isUser, validForm 
} from './moduleAuth.mjs'; 

const queryEmail = document.querySelector('#email');
const enterEmail = document.querySelector('.enterEmail'); // Fixed typo
const notEmail = document.querySelector('.notEmail');
const queryPassword = document.querySelector('#password');
const enterPassword = document.querySelector('.enterPassword');
const enterMoreThan8Password = document.querySelector('.enterMoreThan8Password')
const loginBtn = document.querySelector('#loginBtn');
const modal = document.querySelector('#modal');
const modalText = document.querySelector('#modal-text');
const modalCloseBtn = document.querySelector('#modal-close');



// Function to handle email validation on focus out
function verifyingEmail() {
    const email = queryEmail.value;

    if (!email) {
        // If the email field is empty
        console.log('checking email')
        queryEmail.classList.add('error');
        enterEmail.style.display = 'block';
        notEmail.style.display = 'none';
    } else if (!isEmailValid(email)) {
        // If the email format is invalid
        queryEmail.classList.add('error');
        enterEmail.style.display = 'none';
        notEmail.style.display = 'block';
    } else {
        // If the email is valid
        queryEmail.classList.remove('error');
        enterEmail.style.display = 'none';
        notEmail.style.display = 'none';
    }

    // Toggle the login button based on the form's validity
    toggleLoginButton();
}

// function verifyingPassword() {
//   console.log("Password verification triggered");
//   const password = queryPassword.value;
//   // existing code...
// }


// Function to handle password validation on focus out
function verifyingPassword() {
    const password = queryPassword.value;
    console.log(password)
    if (!password) {
        // If the password field is empty
        console.log('password is working')
        queryPassword.classList.add('error');
        enterPassword.style.display = 'block';
        enterMoreThan8Password.style.display = 'none';
    } else if (!isPasswordValid(password)) {
        // If the password is too short
        queryPassword.classList.add('error');
        enterPassword.style.display = 'none';
        enterMoreThan8Password.style.display = 'block';
    } else {
        // If the password is valid
        queryPassword.classList.remove('error');
        enterPassword.style.display = 'none';
        enterMoreThan8Password.style.display = 'none';
    }

    // Toggle the login button based on the form's validity
    toggleLoginButton();
}

// Function to enable or disable the login button
function toggleLoginButton() {
    const email = queryEmail.value;
    const password = queryPassword.value;

    if (isEmailValid(email) && isPasswordValid(password)) {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
}

// Attach event listeners to handle focus out events
queryEmail.addEventListener('focusout', verifyingEmail);
queryPassword.addEventListener('focusout', verifyingPassword);

// Handle the form submission
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Proceed with form submission or navigate to the next page
    window.location.href = 'items.html';
});



// function emailVerification(email) {
//   if (!isEmailValid(email)) { // Correct usage of parameter
//     queryEmail.classList.add('error');
//     enterEmail.style.display = 'block';
//     queryEmail.focus();
//   } else {
//     queryEmail.classList.remove('error');
//     enterEmail.style.display = 'block';
//   }
//   loginBtn.classList.toggle('disabled', !validForm(email, queryPassword.value));
// }

// function passwordCheck(password) {
//   if (!isPasswordValid(password)) {
//     queryPassword.classList.add('error');
//     enterPassword.style.display = 'block';
//     queryPassword.focus(); // Use queryPassword since password is a value
//   } else {
//     queryPassword.classList.remove('error');
//     enterPassword.style.display = 'none';
//     loginBtn.classList.toggle('disabled', !validForm(queryEmail.value, password));
//   }
// }

// Attach event listeners to the input elements, not the functions
// queryEmail.addEventListener('focusout', () => emailVerification(queryEmail.value));
// queryPassword.addEventListener('focusout', () => passwordCheck(queryPassword.value));

// loginBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const email = queryEmail.value;
//   const password = queryPassword.value;
//   if (!loginBtn.classList.contains('disabled')) {
//     if (!isUser(email, password)) return showModal();
//     window.location.href = 'items.html';
//   }
// });