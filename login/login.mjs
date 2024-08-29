const USER_DATA = [
  { email: "codeit1@codeit.com", password: "codeit01!" },
  { email: "codeit2@codeit.com", password: "codeit02!" },
  { email: "codeit3@codeit.com", password: "codeit03!" },
  { email: "codeit4@codeit.com", password: "codeit04!" },
  { email: "codeit5@codeit.com", password: "codeit05!" },
  { email: "codeit6@codeit.com", password: "codeit06!" },
];

function showModal(modal) {
  modal.style.display = "block";
}

function closeModal(modal) {
  if (modal) modal.style.display = "none";
}

function isEmailValid(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function isPasswordValid(password) {
  return password.length >= 8;
}

function isUser(email, password) {
  return USER_DATA.some(
    (user) => user.email === email && user.password === password
  );
}

function isUserForSignin(email) {
    return USER_DATA.some((user) => user.email === email);
}

function validForm(email, password) {
  return isEmailValid(email) && isPasswordValid(password);
}

// function emailCheck(email) {
//         if (!isEmailValid(email)) {
//             checkEmail.classList.add('error');
//             errMessage.style.display = 'block';
//             checkEmail.focus();
//         } else {
//             checkEmail.classList.remove('error');
//             errMessage.style.display = 'none';
//         }
//         loginBtn.classList.toggle('disabled', !validForm(email, checkPW.value));

// }

// function passwordCheck(password) {
//         if (!isPasswordValid(password)) {
//             checkPW.classList.add('error');
//             PerrMessage.style.display = 'block';
//             checkPW.focus();
//         } else {
//             checkPW.classList.remove('error');
//             PerrMessage.style.display = 'none';
//             loginBtn.classList.toggle('disabled', !validForm(checkEmail.value, password));
//         }
// }

export {
  showModal,
  closeModal,
  isEmailValid,
  isPasswordValid,
  isUser,
  validForm,
  isUserForSignin,
};
