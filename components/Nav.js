import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Nav() {
  const navClass =
    "w-full h-[70px] bg-ffffff border-b border-dfdfdf flex items-center justify-between sticky top-0";
  const logoFrame = `flex items-center justify-between
  w-[153px] h-[51px] ml-[200px]
  md:ml-[24px]
  sm:w-[81px] sm:h-[40px] sm:ml-[16px]`;
  const imageFrame = "w-[40px] h-[40.14px] relative sm:hidden";
  const menuBar = "h-full flex-1 flex ml-[32px] md:ml-[20px] sm:ml-[16px]";
  const loginButton = `w-[88px] h-[42px] bg-3692ff text-white mr-[200px] px-[23px] py-[12px] rounded-8px
  md:mr-[24px] sm:mr-[16px] whitespace-nowrap`;
  const logoText = `w-[103px] h-[35px] flex items-center text-[25.63px] font-[700] text-3692ff
  sm:w-[81px] sm:h-[27px] sm:text-[20.2px]`;
  const menu = `w-[109px] h-full flex items-center text-4B5563
  text-[18px] font-[700] sm:text-[16px]`;
  const activeClass = "text-3692ff";
  const router = useRouter();
  const isFreeBoard = router.pathname === "/freeboard" ? activeClass : "";
  const isItems = router.pathname === "/items" ? activeClass : "";
  return (
    <div className={navClass}>
      <Link href="/">
        <div className={logoFrame}>
          <div className={imageFrame}>
            <Image
              fill
              src="/images/logo.png"
              style={{ objectFit: "cover" }}
              alt="로고 이미지"
            />
          </div>
          <p className={logoText}>판다마켓</p>
        </div>
      </Link>
      <div className={menuBar}>
        <Link href="/freeboard">
          <span className={`${menu} ${isFreeBoard}`}>자유게시판</span>
        </Link>
        <Link href="/items">
          <span className={`${menu} ${isItems}`}>중고마켓</span>
        </Link>
      </div>
      <button className={loginButton}>로그인</button>
    </div>
  );
}
