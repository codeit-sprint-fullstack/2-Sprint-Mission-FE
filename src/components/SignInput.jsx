import style from './css/SignInput.module.css';
import eyeOn from '../Image/btn_visibility_on_24px.png';
import eyeOff from '../Image/btn_visibility_off_24px.png';

function SignInput({ label, type, placeholder }) {
  return (
    <div className={`${style.signInput}`}>
      <label htmlFor={`for_${type}`}>{label}</label>
      <div className={`${style['input-wrap']}`}>
        <input id={`for_${type}`} type={type} placeholder={placeholder} />
        {type === 'password' && <img src={eyeOff} alt="비밀번호 표시" />}
      </div>
      <p></p>
    </div>
  );
}

export default SignInput;

{
  /* <div className="label-wrap">
  <label className="input__id">
    이메일
    <br />
    <input
      type="email"
      placeholder="이메일을 입력해주세요"
      className="js-input__id"
    />
    <p className="error-msg js-error-msg"></p>
  </label>
</div> */
}
