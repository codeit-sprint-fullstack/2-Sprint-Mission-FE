import{ 
  showModal, closeModal, isEmailValid, isPasswordValid, isUser, validForm 
} from './auth.mjs'; 

const email = document.querySelector('#email');
const enterEmail = document.querySelector('#enterEamil');
const notEmail = document.querySelector('#notEmail');
const password = document.querySelector('#password');
const enterPassword = document.querySelector('#enterPassword')
const loginBtn = document.querySelector('#loginBtn');
const modal = document.querySelector('#modal');
const modalNotMatchingPassword = document.querySelector('notMatchingPassword')


function emailVerification(email) {
  if (!isEmailValid(email)){
    email.classList.add('error');
    enterEmail.style.display = 'block';
    email.focus();
  }
}




//quary selector  >  css selector  
//sperate con- 

// const form = document.querySelector('.loginForm');
// const emailInput = document.querySelector('#userEmail'); // It's better to use getElementById for unique elements
// const emailError = document.querySelector('.wrongEmail');


// form.addEventListener('submit', function(event) {
//     // Simple email validation regex
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     // Check if the email is valid
//     if (!emailPattern.test(emailInput.value)) {
//         event.preventDefault();  // Prevent form submission
//         emailError.style.display = 'block';  // Show error message
//         // emailInput.style.outline = "none" 없어도 됨 
//         emailInput.style.border = "1px solid #ff0000";
//     }
    
    // else {
    //     emailError.style.display = 'none';  // Hide error message if email is valid
    // } 없어도 됨 
// });



