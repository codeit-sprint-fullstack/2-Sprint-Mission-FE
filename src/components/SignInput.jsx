/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const style = {
  signInput: css`
    label {
      line-height: 2.148rem;
    }

    p {
      font-size: 1.5rem;
      line-height: 1.79rem;
      font-weight: 600;
      color: var(--error-red);
      margin-top: 0.8rem;
      margin-left: 1.6rem;
    }

    .input-wrap {
      position: relative;

      img {
        position: absolute;
        right: 2.4rem;
        bottom: 1.6rem;
      }
    }

    input {
      margin-top: 1.6rem;
    }
  `,
};

export default function SignInput({ label, type, placeholder }) {
  return (
    <div id="signInput" css={style.signInput}>
      <label htmlFor={`for_${type}`} className="label">
        {label}
      </label>
      <div className="input-wrap">
        <input id={`for_${type}`} type={type} placeholder={placeholder} className="input" />
        {type === 'password' && <img src="/Image/btn_visibility_on_24px.png" alt="비밀번호 표시" />}
      </div>
      <p></p>
    </div>
  );
}

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
