/*
 로그인 및 회원가입 페이지의 이메일, 비밀번호, 비밀번호 확인 input에 필요한 유효성 검증 함수를 만들고 적용해 주세요.
 이메일 input에서 focus out 할 때, 값이 없을 경우 input에 빨강색 테두리와 아래에 “이메일을 입력해주세요.” 빨강색 에러 메세지를 보입니다.
 이메일 input에서 focus out 할 때, 이메일 형식에 맞지 않는 경우 input에 빨강색 테두리와 아래에 “잘못된 이메일 형식입니다” 빨강색 에러 메세지를 보입니다.
 비밀번호 input에서 focus out 할 때, 값이 없을 경우 아래에 “비밀번호를 입력해주세요.” 에러 메세지를 보입니다
 비밀번호 input에서 focus out 할 때, 값이 8자 미만일 경우 아래에 “비밀번호를 8자 이상 입력해주세요.” 에러 메세지를 보입니다.
 input 에 빈 값이 있거나 에러 메세지가 있으면 ‘로그인’ 버튼은 비활성화 됩니다.
 Input 에 유효한 값을 입력하면 ‘로그인' 버튼이 활성화 됩니다.
 활성화된 ‘로그인’ 버튼을 누르면 “/items” 로 이동합니다
  */
// 요소들을 가져오기
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login');
const emailError = document.getElementById('emailError');

// 이벤트 리스너 설정
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('input', validateForm);

// 초기화 시 로그인 버튼 비활성화
loginButton.disabled = true;

function emailCheck(email_address){     
	email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	if(!email_regex.test(email_address)){ 
		return false; 
	}else{
		return true;
	}
}
function validateEmail(email) {
	let emailErrorDiv = document.getElementById('emailError');

	if (!emailCheck(email)) {
		emailErrorDiv.innerHTML = '잘못된 이메일 형식입니다.';
	}
  else if (email === '') {
    emailErrorDiv.innerHTML = '이메일을 입력해주세요.';
  }
}

function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let passwordErrorDiv = document.getElementById('passwordError');
    validateEmail(email);

    // 비밀번호 유효성 검증
    if (password.length < 8) {
        passwordErrorDiv.innerHTML = '비밀번호를 8자 이상 입력해주세요.';
        return false; // 폼 제출 중지
    }else if (password === '') {
      passwordErrorDiv.innerHTML = '비밀번호를 입력해주세요.';
      return false; // �� 제출 중지
    }

    // 폼 검증 성공 시 제출 허용
    return true;
}


/* password validation !!
function strongPassword (str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}
*/
