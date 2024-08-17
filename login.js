//email input id = 'username'
//password id = 'password'
document.querySelector('#username').addEventListener('focusout', inputCheckEmail)


function inputCheckEmail (){
const inputEmail = document.querySelector('#username');
if(inputEmail.value == ""){
  inputEmail.style.border = 'outline: 0.1rem solid #F74747'
}

}


