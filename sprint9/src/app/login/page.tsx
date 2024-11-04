"use client";
//NOTE: onClick > 클라이언트 컴포넌트

import Image from "next/image";
import Link from "next/link";
import SignButton from "@/src/components/signInUp/SignButton";
import SignInput from "@/src/components/signInUp/SignInput";
import SocialMediaLogin from "@/src/components/signInUp/SocialMediaLogin";
import logo from "@/public/assets/img_pandamarket_logo_login.png";
import style from "@/src/styles/login.module.css";

export default function LoginPage() {
  const handleClick = () => {};

  return (
    <div className={style.container}>
      <Image src={logo} width={396} height={132} alt="panda market logo" />
      <div className={style.contentContainer}>
        <SignInput value="email" />
        <SignInput value="password" />
        <SignButton status={false} onClick={handleClick}>
          로그인
        </SignButton>
        <SocialMediaLogin />
        <div className={style.signupContainer}>
          <p className={style.signupText}> 판다마켓이 처음이신가요?</p>
          <Link className={style.signupLink} href="/sign-up">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
