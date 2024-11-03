import Link from "next/link";
import ValidatedInputBox from "@/components/ValidatedInputBox";
import Image from "next/image";
export default function Login() {
  return (
    <div className="flex justify-center w-full h-full">
      <div
        className="w-[640px] h-[618px] mt-[231px] mb-[284px]
      md:mt-[190px] md:mb-[325px]
      sm:w-[343px] sm:h-[501px] sm:mt-[81px] sm:mb-[231px]
      flex flex-col items-center"
      >
        <Link
          href="/"
          className="flex items-center justify-between w-[396px] h-[132px] sm:w-[198px] sm:h-[66px]"
        >
          <div className="relative w-[103.53px] h-[103.88px] sm:w-[51.76px] sm:h-[51.94px]">
            <Image
              src="/images/big_logo.png"
              alt="로고이미지"
              className="object-contain"
              layout="fill" // 부모 요소의 크기에 맞게 채우기
              objectFit="cover" // 부모 요소를 완전히 채우도록 조정
              sizes="100vw"
            />
          </div>
          <span
            className="w-[266px] h-[90px] sm:w-[133px] sm:h-[45px]
          font-bold text-[66.34px] leading-89.56px text-3692ff
          sm:text-[33.17px] sm:leading-44.78px"
          >
            판다마켓
          </span>
        </Link>
        <div className="w-full flex flex-col items-center gap-[24px] mt-[40px] sm:mt-[24px]">
          <ValidatedInputBox type="name" />
          <ValidatedInputBox type="name" />
          <button className="w-full h-[56px] rounded-[40px] text-[16px] text-f3f4f6 bg-9ca3af">
            로그인
          </button>
          <div className="w-full h-[74px] flex justify-between items-center bg-e6f2ff">
            <span className="ml-[23px]">간편 로그인하기</span>
            <div className="w-[100px] h-[42px] mr-[23px] flex justify-between">
              <Link href="https://www.google.com" target="_blank">
                <Image width={42} height={42} src="/images/ic_google.png" />
              </Link>
              <Link href="https://www.kakao.com" target="_blank">
                <Image width={42} height={42} src="/images/ic_kakao.png" />
              </Link>
            </div>
          </div>
          <div className="flex h-[24px] gap-[4px]">
            <span className="h-full text-[14px]">판다마켓이 처음이신가요?</span>
            <Link
              href="/signup"
              className="h-full text-[14px] text-3692ff underline"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
