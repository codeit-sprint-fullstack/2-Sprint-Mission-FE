"use client";
import Image from "next/image";
import Link from "next/link";
import SocialMediaLogin from "@/src/components/signInUp/SocialMediaLogin";
import logo from "@/public/assets/img_pandamarket_logo_login.png";
import style from "@/src/styles/login.module.css";
import SignUpForm from "@/src/components/signInUp/SignUpForm";

export default function SignupPage() {
  const handleClick = () => {
    // TODO: 회원가입 로직 추가
  };

  return (
    <div className={style.container}>
      <Image src={logo} width={396} height={132} alt="panda market logo" />
      <div className={style.contentContainer}>
        <SignUpForm />
        <SocialMediaLogin />
        <div className={style.signupContainer}>
          <p className={style.signupText}> 이미 회원이신가요?</p>
          <Link className={style.signupLink} href="/login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
