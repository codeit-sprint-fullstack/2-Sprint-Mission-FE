import { useState } from "react";

const validateEmail = () => {};

const validatePassword = () => {};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <>
      <form>
        <label htmlFor="email">이메일</label>
        <input id="email" type="email" value={email} />
        <label htmlFor="nickname">닉네임</label>
        <input id="nickname" type="text" value={nickname} />
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" value={password} />
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input id="passwordCheck" type="password" value={passwordCheck} />
      </form>
    </>
  );
}
