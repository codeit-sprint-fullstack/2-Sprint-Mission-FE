const username = document.querySelector("#username");//이메일 인풋
const password = document.querySelector("#password");//비밀번호 인풋
const verPass = document.querySelector('#ver_pws')//비밀번호 확인 인풋
const button = document.querySelector(".button");//로그인버튼
const errorEmail = document.querySelector("#error_email");
const errorPass = document.querySelector("#error_pass");
const errorVerPass=document.querySelector("#error_verpass");
const input = document.querySelector(".form");//input
const userNick = document.querySelector('#usernick')//유저닉네임
const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;



//이메일 유효성 검사
const activeEmail= username.addEventListener('blur',function() {
  if (username.value.length === 0 ) { 
    username.classList.add('invalid');
    errorEmail.textContent = '이메일을 입력해주세요.'
    return false// 로그인 버튼 활성화를 위한 return값
  }
  else if (username.value.length > 0 && !pattern.test(username.value)){
    username.classList.add('invalid');
    errorEmail.textContent = '잘못된 이메일 형식입니다'
   return false
  }
  else { return true}
});

username.addEventListener('focus', function() {
  if (this.classList.contains('invalid')) {
    // 사용자가 새로운 값을 입력하려고 하므로 에러 메시지를 지움
    this.classList.remove('invalid');
    errorEmail.textContent = "";
    return false
    
  }else { return true}
});
// 비밀번호 유효성 검사
const activePass=password.addEventListener('blur' ,function(){
  if (password.value.length === 0){
    password.classList.add('invalid');
    errorPass.textContent = '비밀번호를 입력해주세요.'
    return false
  }
else if (password.value.length < 8 ){
  this.classList.add('invalid');
  errorPass.textContent = '비밀번호를 8자 이상 입력해주세요.'
  return false
}else { return true}
});

password.addEventListener('focus' ,function(){
  if(this.classList.contains('invalid')){
    this.classList.remove('invalid');
    errorPass.textContent ="";
    return false
  }else { return true}
});
//비밀번호 확인 유효성 검사
verPass.addEventListener('blur', function(){
  if(verPass.value !== password.value){
    verPass.classList.add('invalid');
    errorVerPass.textContent = '비밀번호가 일치하지 않습니다.'
    return false
  }else { return true};
})
verPass.addEventListener('focus', function(){
  if(this.classList.contains('invalid')){
    this.classList.remove('invalid');
    errorVerPass.textContent ="";
    return false
  }else { return true}
});


// 로그인 버튼 활성화

function changebutton(){
if (pattern.test(username.value) && password.value.length >= 8 && verPass.value === password.value && userNick.value.length !== 0){
  button.disabled =false;//활성화
  button.style.background = '#3692ff'
  button.style.cursor = 'pointer'
}else {
  button.disabled=true; //비활성화
  button.style.background = '#9ca3af'
}
}

input.addEventListener('keyup',changebutton);


//로그인 버튼 클릭시 이동
function goUrl() {
  location.href = '../login/login.html';
}

//유저데이터 확인 후 alert 및 페이지 이동

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];



function matchUp (){
  const userValue = username.value;
  const matchEmail = USER_DATA.some(el => el.email === userValue);
  

  if (matchEmail){
    //열기 버튼을 눌렀을 때 모달팝업이 열림
button.addEventListener('mouseup',function(){
  //display 속성을 block로 변경
  modal.style.display = 'block';
});
  }
   else {
    button.addEventListener('mouseup',goUrl);
  }
}
button.addEventListener('mousedown',matchUp);

const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close_btn');


//닫기 버튼을 눌렀을 때 모달팝업이 닫힘
modalClose.addEventListener('click',function(){
   //display 속성을 none으로 변경
    modal.style.display = 'none';
});

// 눈모양 보이기/안보이기
const openEyes = document.querySelector('.open_eyes');
const closedEyes = document.querySelector('.eyes');

closedEyes.addEventListener('click',function(){
  closedEyes.classList.toggle('hide');
  password.type = 'text';
  openEyes.classList.toggle('hide');
})
openEyes.addEventListener('click',function(){
  openEyes.classList.toggle('hide')
  password.type = 'password';
  closedEyes.classList.toggle('hide')
})

const openEyes2 = document.querySelector('.open_eyes2');
const closedEyes2 = document.querySelector('.eyes2');

closedEyes2.addEventListener('click',function(){
  closedEyes2.classList.toggle('hide');
  verPass.type = 'text';
  openEyes2.classList.toggle('hide');
})
openEyes2.addEventListener('click',function(){
  openEyes2.classList.toggle('hide')
  verPass.type = 'password';
  closedEyes2.classList.toggle('hide')
})