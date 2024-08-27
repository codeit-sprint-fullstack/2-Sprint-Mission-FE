// 이메일 유효성 검사
const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

// 비밀번호 유효성 검사
const validatePassword = (password) => password.length >= 8;

// 사용자 데이터
const userData = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 비밀번호 표시/숨김 토글 기능
const togglePasswordVisibility = (passwordInput, toggleButton) => {
  toggleButton.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleButton.querySelector('img').src = type === 'password'
      ? 'img/btn_visibility_off_24px.svg'
      : 'img/btn_visibility_on_24px.svg';
  });
};

const handleInputBlur = inputElement => {
  inputElement.style.color = inputElement.value ? 'var(--secondary-800)' : '';
};

export {
  validateEmail,
  validatePassword,
  userData,
  togglePasswordVisibility,
  handleInputBlur
}