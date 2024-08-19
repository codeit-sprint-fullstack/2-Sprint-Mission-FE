//querySelector를 활용하여, HTML 엘리먼트 정보를 가져온다.
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const passwordRetype = document.querySelector("#password-retype");
const button = document.querySelector("button");
const successMessage = document.querySelector(".success-message");
const failureMessage = document.querySelector(".failure-message");
const mismatchMessage = document.querySelector(".mismatch-message");
const requiredMessage = document.querySelector(".required-message");

//~할 때라는 것은 event, event에 따라 실행되는 함수는 eventhandler
//아이디 입력창(username)에 글자를 키보드로 입력할 때(onkeyup),
//글자수가 4개이상이면(isMoreThan4Length 함수 사용)
//"사용할 수 있는 아이디입니다"가 메시지로 출력된다.
//글자수가 4개이하라면
//"아이디는 네 글자 이상이어야 합니다"가 메시지로 출력된다.

//[비밀번호 확인] 입력창에서 값을 입력(keyup)하면
//[비밀번호] 값과 [비밀번호 확인] 값이 일치하는지 확인하고,(isMatch 함수 사용)
//일치하지 않은 경우, 불일치 메시지를 화면에 표시한다.
//"비밀번호가 일치하지 않습니다" 메시지 출력
//일치하다면 출력하지 않기

//회원가입 완료 버튼을 눌렀을 때
//아직 입력하지 않은 곳이 있다면 "모든 입력창을 입력하셔야 합니다"라는 메시지 출력

username.onkeyup = function(){ //이 함수는 eventhandler
    if(isMoreThan4Length(username.value)){
    	//css창에서 .hide{display:none;}이 기본값
        successMessage.classList.remove("hide");
        failureMessage.classList.add("hide");
    }
    else{
        failureMessage.classList.remove("hide");
        successMessage.classList.add("hide");
    }
}

function isMoreThan4Length(value){ //value값이 4글자이상이면 true반환
    return value.length >=4
}

passwordRetype.onkeyup = function(){
    if(isMatch(password.value,passwordRetype.value)){
    //패스워드 2개가 같다면 true반환으로 아래 코드가 실행됨
        mismatchMessage.classList.add("hide");
    }
    else{//패스워드 2개가 다르다면 false반환으로 아래 코드가 실행됨
        mismatchMessage.classList.remove("hide");
    }
}
//isMatch함수사용하기
function isMatch(password1, password2){//패스워드 2개가 같다면 true반환
    if(password1===password2){
        return true;
    }
    return false;
}

button.onclick = function(){ //버튼을 클릭했을 때 모든 입력창이 빈곳이 없다면
    if(username.value !== "" && password.value !== "" && passwordRetype.value !== "" ){//메시지 숨기기
        requiredMessage.classList.add("hide");
    }
    else{//빈곳이 한곳이라도 있다면 메시지 보여주기
        requiredMessage.classList.remove("hide");}
}