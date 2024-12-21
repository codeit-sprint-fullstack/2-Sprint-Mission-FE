import kebab from "@/../public/assets/ic_kebab.svg";
import Image from "next/image";
import defaultProfile from "@/../public/assets/default_profile.svg";
import { useState } from "react";

interface CommentProps {
  content: string;
  image: string;
  name: string;
  updatedAt: string;
}

export default function Comment({
  content,
  image,
  name,
  updatedAt,
}: CommentProps) {
  const [productToggleOpen, setProductToggleOpen] = useState(false);

  const currentDate: Date = new Date();
  const updateDate: Date = new Date(updatedAt);

  const diff: number = currentDate.getTime() - updateDate.getTime();

  const differenceInSeconds: number = Math.floor(diff / 1000);
  const differenceInMinutes: number = Math.floor(differenceInSeconds / 60);
  const differenceInHours: number = Math.floor(differenceInMinutes / 60);

  const handleProductToggle = () => {
    setProductToggleOpen((prev) => !prev);
  };

  return (
    <div className="w-full bg-[#FCFCFC] border-b border-[#E5E7EB] pb-[1.2rem] gap-[2.4rem] flex flex-col">
      <div className="flex w-full justify-between">
        <p className="font-normal text-[1.4rem] leading-[2.4rem] text-[#1F2937]">
          {content}
        </p>
        <Image
          src={kebab}
          alt="kebab"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={handleProductToggle}
        />
      </div>
      {productToggleOpen && (
        <div className="absolute translate-x-[106rem] translate-y-[3rem] bg-[#ffffff] flex items-center flex-col w-[13.9rem] h-[9.2rem] border border-[#D1D5DB] rounded-[0.8rem]">
          <p className="h-[4.6rem] flex items-center justify-center font-normal text-[1.6rem] leading-[2.6rem] text-[#6B7280]">
            수정하기
          </p>
          <p className="h-[4.6rem] flex items-center justify-center font-normal text-[1.6rem] leading-[2.6rem] text-[#6B7280]">
            삭제하기
          </p>
        </div>
      )}
      <div className="flex gap-[0.8rem]">
        <Image
          src={image || defaultProfile}
          alt="image"
          width={32}
          height={32}
        />
        <div className="flex gap-[0.4rem] flex-col">
          <p className="font-normal text-[1.2rem] leading-[1.8rem] text-[#4B5563]">
            {name}
          </p>
          <p className="font-normal text-[1.2rem] leading-[1.8rem] text-[#9CA3AF]">
            {differenceInHours}시간 전
          </p>
        </div>
      </div>
    </div>
  );
}
