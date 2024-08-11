const pw_toggle = document.getElementById('watch-toggle');
const pw_input = document.getElementById('password');

pw_toggle.addEventListener('click',function(){
    if(pw_input.getAttribute('type')==='password'){
        pw_input.setAttribute('type','text');
        pw_toggle.setAttribute('src','image/btn_visibility_on_24px.svg');

    }else{
        pw_input.setAttribute('type','password');
        pw_toggle.setAttribute('src','image/btn_visibility_off_24px.svg');
    }
    this.classList.toggle('show-password');
    
})