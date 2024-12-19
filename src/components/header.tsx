"use client";

import Image from "next/image";
import logo from "@/../public/assets/header_logo.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import defProfile from "@/../public/assets/default_profile.svg";

export default function Header() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState(defProfile);

  const handleClickEvent = () => {
    router.push("/signin");
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    const storedImage = localStorage.getItem("image") || "";
    setName(storedName);
    setImage(
      storedImage.startsWith("/") || storedImage.startsWith("http")
        ? storedImage
        : defProfile
    );
  }, []);

  return (
    <div className="w-full py-[0.9rem] px-[20rem] gap-[1rem] border-b border-[#DFDFDF]">
      <div className="w-full flex justify-between items-center">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        {!name ? (
          <button
            className="w-[12.8rem] h-[4.8rem] rounded-[0.8rem] py-[1.2rem] px-[2.3rem] flex items-center justify-center gap-[1rem] bg-[#3692FF] font-semibold text-[1.6rem] leading-[2.6rem] text-[#F3F4F6]"
            onClick={handleClickEvent}
          >
            로그인
          </button>
        ) : (
          <div className="flex gap-[0.6rem] items-center">
            <Image
              src={image || defProfile}
              alt="profile"
              width={40}
              height={40}
            />
            <p className="font-normal text-[1.8rem] leading-[2.178rem] text-[#4B5563]">
              {name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
