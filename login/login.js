const username = document.querySelector("#username");//이메일 인풋
const password = document.querySelector("#password");//비밀번호 인풋
const button = document.querySelector("button");//로그인버튼
const errorEmail = document.querySelector("#error_email");//failure
const errorPass = document.querySelector("#error_pass");//required
const input = document.querySelector(".form");//input
const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;



//이메일 유효성 검사
username.onblur = function() {
  if (username.value.length === 0 ) { 
    username.classList.add('invalid');
    errorEmail.innerHTML = '이메일을 입력해주세요.'
    return false// 로그인 버튼 활성화를 위한 return값
  }
  else if (username.value.length > 0 && !pattern.test(username.value)){
    username.classList.add('invalid');
    errorEmail.innerHTML = '잘못된 이메일 형식입니다'
   return false
  }
  else { return true}
};

username.onfocus = function() {
  if (this.classList.contains('invalid')) {
    // 사용자가 새로운 값을 입력하려고 하므로 에러 메시지를 지움
    this.classList.remove('invalid');
    errorEmail.innerHTML = "";
    return false
    
  }else { return true}
};
// 비밀번호 유효성 검사
password.onblur = function(){
  if (password.value.length === 0){
    password.classList.add('invalid');
    errorPass.innerHTML = '비밀번호를 입력해주세요.'
    return false
  }
else if (password.value.length < 8 ){
  this.classList.add('invalid');
  errorPass.innerHTML = '비밀번호를 8자 이상 입력해주세요.'
  return false
}else { return true}
};

password.onfocus = function(){
  if(this.classList.contains('invalid')){
    this.classList.remove('invalid');
    errorPass.innerHTML ="";
    return false
  }else { return true}
};

// 로그인 버튼 활성화
const activeEmail=password.onblur;
const activePass=password.onblur;

function changebutton(){
if (username.value.includes("@") && password.value.length >= 8  ){
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
  location.href = '../items.html';
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
  const passValue = password.value;
  const matchEmail = USER_DATA.some(el => el.email === userValue);
  const matchPass = USER_DATA.some(el => el.password === passValue);

  if (!matchEmail){
    alert('비밀번호가 일치하지 않습니다.');
  }
  else if (matchEmail && !matchPass){
    alert('비밀번호가 일치하지 않습니다.');
  }
  else {
    button.addEventListener('mouseup',goUrl);
  }
}
button.addEventListener('mousedown',matchUp);


  // USER_DATA.forEach((team) => matchUp(team));

  // function matchUp(team) {
  
  // if(team.email !== userValue){
  //   alert ('아이디가 일치하지 않습니다.');
  // } 
  // else if (team.email === userValue && team.password !== passValue){
  //   alert ('비밀번호가 일치하지 않습니다.');
  // }
  // else {
  //   button.addEventListener('click',goUrl());
  // }
  // }


