import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  const footer = `w-full h-[160px] bg-footerbg flex justify-center`;
  const menuBar = `w-full h-[20px] mt-[32px] mx-[200px]  
  flex items-center justify-between text-[16px] font-[400]
  sm:mx-[24px] sm:h-[63px] sm:grid sm:grid-rows-2 sm:grid-cols-1`;

  const textMenu =
    "w-[112px] h-[19px] flex items-center sm:col-span-2 sm:row-span-1 sm:order-3 text-9ca3af";
  const textLinkMenu = `w-[159px] h-[19px] flex justify-between text-e5e7eb`;
  const privacy = "w-[100px] h-[19px] whitespace-nowrap";
  const faq = "w-[29px] h-[19px]";
  const snsLink = "w-[116px] h-[20px] flex justify-between";
  return (
    <div className={footer}>
      <div className={menuBar}>
        <p className={textMenu}>@codeit - 2024</p>
        <div className={textLinkMenu}>
          <Link href="/privacy-policy">
            <p className={privacy}>Privacy Policy</p>
          </Link>
          <Link href="/faq">
            <span className={faq}>FAQ</span>
          </Link>
        </div>
        <div className={snsLink}>
          <Link href="https://facebook.com">
            <Image
              src="/images/ic_facebook.png"
              width={20}
              height={20}
              alt="페이스북로고"
            />
          </Link>
          <Link href="https://x.com">
            <Image
              src="/images/ic_twitter.png"
              width={20}
              height={20}
              alt="트위터로고"
            />
          </Link>
          <Link href="https://youtube.com">
            <Image
              src="/images/ic_youtube.png"
              width={20}
              height={20}
              alt="유튜브로고"
            />
          </Link>
          <Link href="https://instagram.com">
            <Image
              src="/images/ic_instagram.png"
              width={20}
              height={20}
              alt="인스타로고"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
