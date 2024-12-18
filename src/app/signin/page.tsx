"use client";

import Image from "next/image";
import logo from "@/../public/assets/header_logo.svg";
import vis_on from "@/../public/assets/btn_visibility_on_24px.svg";
import vis_off from "@/../public/assets/btn_visibility_off_24px.svg";
import google from "@/../public/assets/google.svg";
import kakao from "@/../public/assets/kakao.svg";
import { useState } from "react";
import Link from "next/link";

export default function SignIn() {
  const [pw, setPw] = useState(false);

  const handleClick = () => {
    setPw((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-[4rem] items-center justify-center h-[100vh]">
      <Image src={logo} alt="logo" width={396} height={132} />
      <div className="w-[64rem] gap-[2.4rem] items-center justify-center flex flex-col">
        <div className="w-full gap-[2.4rem] flex flex-col items-center justify-center">
          <div className="w-full gap-[1.6rem] flex flex-col justify-center">
            <p className="font-bold text-[1.8rem] leading-[2.6rem]">이메일</p>
            <input
              className="w-full h-[5.6rem] rounded-[1.2rem] py-[1.6rem] px-[2.4rem] gap-[1rem] bg-[#F3F4F6] font-normal text-[1.6rem] leading-[2.6rem] placeholder-text-[#9CA3AF]"
              placeholder="이메일을 입력해주세요"
            />
          </div>
          <div className="w-full gap-[1.6rem] flex flex-col justify-center">
            <p className="font-bold text-[1.8rem] leading-[2.6rem]">비밀번호</p>
            <div
              className="w-full h-[5.6rem] py-[1.6rem] px-[2.4rem] bg-[#F3F4F6] rounded-[1.2rem] flex justify-between"
              onClick={handleClick}
            >
              <input
                className="w-full bg-[#F3F4F6] gap-[1rem] font-normal text-[1.6rem] leading-[2.6rem] placeholder-text-[#9CA3AF]"
                placeholder="비밀번호를 입력해주세요"
              />
              {!pw ? (
                <Image src={vis_off} alt="eye" width={24} height={24} />
              ) : (
                <Image src={vis_on} alt="eye" width={24} height={24} />
              )}
            </div>
          </div>
        </div>
        <button className="w-full h-[5.6rem] rounded-[4rem] py-[1.6rem] px-[12.4rem] gap-[1rem] bg-[#9CA3AF] font-semibold text-[2rem] leading-[3.2rem] items-center text-[#F3F4F6] flex justify-center">
          로그인
        </button>
        <div className="w-full h-[7.4rem] rounded-[0.8rem] py-[1.6rem] px-[2.3rem] gap-[1rem] bg-[#E6F2FF] flex justify-between items-center">
          <p className="font-medium text-[1.6rem] leading-[2.6rem] text-[#1F2937]">
            간편 로그인하기
          </p>
          <div className="flex gap-[1.6rem]">
            <Image src={google} alt="google" />
            <Image src={kakao} alt="kakao" />
          </div>
        </div>
        <div className="flex gap-[0.4rem]">
          <p className="font-medium text-[1.4rem] leading-[2.4rem] text-[#1F2937]">
            판다마켓이 처음이신가요?
          </p>
          <p className="font-medium text-[1.4rem] leading-[2.4rem] text-[#3692FF] underline">
            <Link href="/signup">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
