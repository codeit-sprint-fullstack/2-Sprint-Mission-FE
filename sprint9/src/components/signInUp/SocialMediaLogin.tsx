import Link from "next/link";
import Image from "next/image";
import style from "@/src/styles/signInUp/SocialMediaLogin.module.css";
import kakao from "@/public/assets/img_kakaotalk.png";
import google from "@/public/assets/img_google.png";

export default function SocialMediaLogin() {
  return (
    <div className={style.container}>
      <p className={style.text}>간편 로그인 하기</p>
      <div className={style.snsContainer}>
        <Link href="https://www.kakaocorp.com/page">
          <Image src={kakao} alt="kakao logo icon" />
        </Link>
        <Link href="https://www.google.com">
          <Image src={google} alt="google logo icon" />
        </Link>
      </div>
    </div>
  );
}
