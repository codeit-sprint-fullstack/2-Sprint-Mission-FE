import Image from "next/image";
import heart from "@/../public/assets/ic_heart.svg";
import defaultImg from "@/../public/assets/img_default.svg";
import { SyntheticEvent, useEffect, useState } from "react";

interface BestProductProps {
  image: string;
  title: string;
  price: string;
  heartNum: number;
}

export default function BestProduct({
  image,
  title,
  price,
  heartNum,
}: BestProductProps) {
  return (
    <div>
      <div className="flex gap-[1.6rem] flex-col">
        <img
          src={image}
          alt="image"
          width={282}
          height={282}
          className="object-cover w-[28.2rem] h-[28.2rem]"
        />
        <div className="flex gap-[1rem] flex-col">
          <p className="font-medium text-[1.4rem] leading-[2.4rem] text-[#1F2937]">
            {title}
          </p>
          <p className="font-bold text-[1.6rem] leading-[2.6rem] text-[#1F2937]">
            {price}원
          </p>
          <div className="flex gap-[0.4rem]">
            <Image src={heart} alt="heart" width={16} height={16} />
            <p className="text-medium text-[1.2rem] leading-[1.8rem] text-[#4B5563]">
              {heartNum}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
