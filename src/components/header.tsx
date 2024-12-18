"use client";

import Image from "next/image";
import logo from "@/../public/assets/header_logo.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const router = useRouter();

  const handleClickEvent = () => {
    router.push("/signin");
  };

  return (
    <div className="w-full py-[0.9rem] px-[20rem] gap-[1rem] border-b border-[#DFDFDF]">
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        <button
          className="w-[12.8rem] h-[4.8rem] rounded-[0.8rem] py-[1.2rem] px-[2.3rem] flex items-center justify-center gap-[1rem] bg-[#3692FF] font-semibold text-[1.6rem] leading-[2.6rem] text-[#F3F4F6]"
          onClick={handleClickEvent}
        >
          로그인
        </button>
      </div>
    </div>
  );
}
