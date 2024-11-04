"use client";
//NOTE: onClick 사용하면 클라이언트 컴포넌트

import SignButton from "@/components/signInUp/SignButton";
import SignInput from "@/components/signInUp/SignInput";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/pndamarket_logo.png";

export default function LoginPage() {
  const handleClick = () => {};

  return (
    <div>
      <Image src={logo} alt="panda market logo" />
      <SignInput value="email" />
      <SignInput value="password" />
      <SignButton status={false} onClick={handleClick}>
        로그인
      </SignButton>
      <p> 판다마켓이 처음이신가요?</p>
      <Link href="/sign-up">회원가입</Link>
    </div>
  );
}
