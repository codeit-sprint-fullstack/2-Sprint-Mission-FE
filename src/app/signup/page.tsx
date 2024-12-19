"use client";

import Image from "next/image";
import logo from "@/../public/assets/header_logo.svg";
import vis_on from "@/../public/assets/btn_visibility_on_24px.svg";
import vis_off from "@/../public/assets/btn_visibility_off_24px.svg";
import google from "@/../public/assets/google.svg";
import kakao from "@/../public/assets/kakao.svg";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [showPw, setShowPw] = useState(false);
  const [showPwChk, setShowPwChk] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nick, setNick] = useState("");
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwChk, setPwChk] = useState("");
  const [pwChkError, setPwChkError] = useState("");

  const handlePwClick = () => {
    setShowPw((prev) => !prev);
  };

  const handlePwChkClick = () => {
    setShowPwChk((prev) => !prev);
  };

  const validateEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("");
    } else if (!pattern.test(email)) {
      setEmailError("잘못된 이메일입니다.");
    } else {
      setEmailError("");
    }
  };

  useEffect(() => {
    validateEmail(email);
  }, [email]);

  const validatePw = (pw: string) => {
    if (!pw) {
      setPwError("");
    } else if (pw.length < 8) {
      setPwError("비밀번호를 8자 이상 입력해주세요");
    } else {
      setPwError("");
    }
  };

  useEffect(() => {
    validatePw(pw);
  }, [pw]);

  const validatePwChk = (pwChk: string) => {
    if (!pwChk) {
      setPwChkError("");
    } else if (pw !== pwChk) {
      setPwChkError("비밀번호가 일치하지 않습니다");
    } else {
      setPwChkError("");
    }
  };

  useEffect(() => {
    validatePwChk(pwChk);
  }, [pwChk]);

  return (
    <div className="w-full flex flex-col gap-[4rem] items-center justify-center h-[100vh]">
      <Image src={logo} alt="logo" width={396} height={132} />
      <div className="w-[64rem] gap-[2.4rem] items-center justify-center flex flex-col">
        <div className="w-full gap-[2.4rem] flex flex-col items-center justify-center">
          <div className="w-full gap-[1.6rem] flex flex-col justify-center">
            <p className="font-bold text-[1.8rem] leading-[2.6rem]">이메일</p>
            <input
              className={`w-full h-[5.6rem] rounded-[1.2rem] py-[1.6rem] px-[2.4rem] gap-[1rem] bg-[#F3F4F6] font-normal text-[1.6rem] leading-[2.6rem] placeholder-text-[#9CA3AF] ${
                emailError
                  ? "focus:outline-[#F74747]"
                  : "focus:outline-[#3692FF]"
              }`}
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-[1.4rem] mt-1">{emailError}</p>
            )}
          </div>
          <div className="w-full gap-[1.6rem] flex flex-col justify-center">
            <p className="font-bold text-[1.8rem] leading-[2.6rem]">닉네임</p>
            <input
              className={`w-full h-[5.6rem] rounded-[1.2rem] py-[1.6rem] px-[2.4rem] gap-[1rem] bg-[#F3F4F6] font-normal text-[1.6rem] leading-[2.6rem] placeholder-text-[#9CA3AF]`}
              placeholder="닉네임을 입력해주세요"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
            />
          </div>
          <div className="w-full gap-[1.6rem] flex flex-col justify-center">
            <p className="font-bold text-[1.8rem] leading-[2.6rem]">비밀번호</p>
            <div
              className={`w-full h-[5.6rem] py-[1.6rem] px-[2.4rem] bg-[#F3F4F6] rounded-[1.2rem] flex justify-between focus-within:outline focus-within:outline-2 ${
                pwError
                  ? "focus-within:outline-[#F74747]"
                  : "focus-within:outline-[#3692FF]"
              }`}
            >
              <input
                className="w-full bg-[#F3F4F6] gap-[1rem] font-normal text-[1.6rem] leading-[2.6rem] placeholder-text-[#9CA3AF] focus:outline-none"
                placeholder="비밀번호를 입력해주세요"
                type={!showPw ? "password" : "text"}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
              <Image
                src={!showPw ? vis_off : vis_on}
                alt="eye"
                width={24}
                height={24}
                onClick={handlePwClick}
              />
            </div>
            {pwError && (
              <p className="text-red-500 text-[1.4rem] mt-1">{pwError}</p>
            )}
          </div>
          <div className="w-full gap-[1.6rem] flex flex-col justify-center">
            <p className="font-bold text-[1.8rem] leading-[2.6rem]">
              비밀번호 확인
            </p>
            <div
              className={`w-full h-[5.6rem] py-[1.6rem] px-[2.4rem] bg-[#F3F4F6] rounded-[1.2rem] flex justify-between focus-within:outline focus-within:outline-2 ${
                pwChkError
                  ? "focus-within:outline-[#F74747]"
                  : "focus-within:outline-[#3692FF]"
              }`}
            >
              <input
                className="w-full bg-[#F3F4F6] gap-[1rem] font-normal text-[1.6rem] leading-[2.6rem] placeholder-text-[#9CA3AF] focus:outline-none"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                type={!showPwChk ? "password" : "text"}
                value={pwChk}
                onChange={(e) => setPwChk(e.target.value)}
              />
              <Image
                src={!showPwChk ? vis_off : vis_on}
                alt="eye"
                width={24}
                height={24}
                onClick={handlePwChkClick}
              />
            </div>
            {pwChkError && (
              <p className="text-red-500 text-[1.4rem] mt-1">{pwChkError}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full h-[5.6rem] rounded-[4rem] py-[1.6rem] px-[12.4rem] gap-[1rem] font-semibold text-[2rem] leading-[3.2rem] items-center text-[#F3F4F6] flex justify-center ${
            pw && email && !emailError && !pwError && pwChk && !pwChkError
              ? "bg-[#3692FF]"
              : "bg-[#9CA3AF]"
          }`}
        >
          회원가입
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
            이미 회원이신가요?
          </p>
          <p className="font-medium text-[1.4rem] leading-[2.4rem] text-[#3692FF] underline">
            <Link href="/signin">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
