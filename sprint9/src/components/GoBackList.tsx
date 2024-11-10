"use client";

import Link from "next/link";
import Image from "next/image";
import goback from "@/public/assets/ic_back.png";
import style from "@/src/styles/GobackList.module.css";

export default function GoBackList() {
  return (
    <Link href="/items">
      <button className={style.button}>
        목록으로 돌아가기
        <Image src={goback} alt="return icon" height={24} width={24} />
      </button>
    </Link>
  );
}
