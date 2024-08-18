const pw_toggle = document.getElementById('watch-toggle');
const pw_input = document.getElementById('password');
const check_toggle = document.getElementById('watch-toggle-check');
const check_input = document.getElementById('password-check');
pw_toggle.addEventListener('click', function(){
    if(pw_input.getAttribute('type')==='password'){
        pw_input.setAttribute('type','text');
        pw_toggle.setAttribute('src','image/btn_visibility_on_24px.svg');
    }else{
        pw_input.setAttribute('type','password')
        pw_toggle.setAttribute('src','image/btn_visibility_off_24px.svg');
    }
    
});
check_toggle.addEventListener('click',function(){
    if(check_input.getAttribute('type')==='password'){
        check_input.setAttribute('type','text');
        check_toggle.setAttribute('src', 'image/btn_visibility_on_24px.svg');
    }else{
        check_input.setAttribute('type', 'password');
        check_toggle.setAttribute('src', 'image/btn_visibility_off_24px.svg');
    }
});