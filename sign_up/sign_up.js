document.addEventListener('DOMContentLoaded', () => {
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" },
]

document.getElementById('signupButton').addEventListener('click', (event) => {
  event.preventDefault(); // 기본 동작 방지


document.getElementById('signupButton').addEventListener('click', () => {
  const email = document.querySelector('.signupEmail').value;
  const nickname = document.querySelector('.signupNickname').value;
  const password = document.querySelector('.signupPassword').value;
  const confirmPassword = document.querySelector('.confirmPasswords').value;

  // 이메일이 이미 존재하는지 확인
  if (USER_DATA.hasOwnProperty(email)) {
      alert('사용 중인 이메일입니다');
  } else if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다');
  } else {
      // 회원가입 성공 처리
      USER_DATA[email] = password; // 새로운 사용자 추가 (시뮬레이션)
      alert('회원가입이 성공적으로 처리되었습니다');
      window.location.href = "../login/"; // 로그인 페이지로 이동
  }
})

});

});