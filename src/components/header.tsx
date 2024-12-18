import Image from "next/image";
import logo from "@/../public/assets/header_logo.svg";

export default function Header() {
  return (
    <div className="w-full py-[0.9rem] px-[20rem] gap-[1rem] border border-b-[#DFDFDF]">
      <div className="w-full flex justify-between items-center">
        <Image src={logo} alt="logo" />
        <button className="w-[12.8rem] h-[4.8rem] rounded-[0.8rem] py-[1.2rem] px-[2.3rem] flex items-center justify-center gap-[1rem] bg-[#3692FF] font-semibold text-[1.6rem] leading-[2.6rem] text-[#F3F4F6]">
          로그인
        </button>
      </div>
    </div>
  );
}
