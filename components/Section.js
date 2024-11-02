import { content } from "@/tailwind.config";
import Image from "next/image";
import Link from "next/link";
import { SECTIONS } from "@/constants";
export default function Section({ name, className }) {
  const { WATCH, CHECK, SEARCH, REGISTER, SAFETY } = SECTIONS;
  const selectClass = (name) => {
    const edgeSection = `w-full h-[540px] bg-cfe5ff flex justify-center items-end ${className}
        md:h-[771px] sm:h-[540px]`;
    const centerSection = `w-full h-[720px] bg-ffffff flex justify-center items-center ${className}`;
    const edgeContent = `w-[1110px] flex justify-between items-center
        md:w-full md:h-full md:flex-col
        sm:w-full sm:h-full sm:flex-col`;
    const centerContent = `w-[988px] h-[444px] flex justify-between items-center bg-fcfcfc
        md:w-[696px] md:h-[708px] md:flex-col
        sm:w-[344px] sm:h-[417px] sm:flex-col`;
    const edgeImageFrame = `w-[746px] h-full relative md:w-full`;
    const centerImageFrame = `w-[588px] h-[444px] relative
        md:w-full md:h-[524px]
        sm:w-full sm:h-[259px]`;
    const watchImageFrame = `${edgeImageFrame} sm:w-[448px] sm:h-[204px]`;
    const safetyImageFrame = `${edgeImageFrame} md:h-[397px] sm:w-full sm:h-[198px]`;

    const watchContainer = `w-[357px] h-[260px]
        md:w-[512px] md:h-[136px] md:mt-[84px]
        sm:w-[240px] sm:f-[156px] sm:mt-[48px]`;
    const checkContainer = `w-[274px] h-[238px] flex flex-col lg:mr-[31px]
        md:w-[319px] md:h-[160px]
        sm:w-[240px] sm:h-[134px]`;
    const searchContainer = `w-[317px] h-[238px] flex flex-col text-right
        md:w-[410px] md:h-[160px]
        sm:w-[316px] sm:h-[130px]`;
    const registerContainer = `w-[335px] h-[238px] flex flex-col
        md:w-[410px] md:h-[160px]
        sm:w-[315px] sm:h-[118px]`;

    const watchsubtitleClass = `w-[297px] h-[112px]
        md:w-full md:h-[56px] md:whitespace-nowrap
        sm:h-[90px] sm:whitespace-normal`;
    const safetysubtitleClass = `w-[297px] h-[112px]
        md:mt-[201px]
        sm:w-[240px] sm:h-[90px] sm:mt-[121px] sm:leading-44.8px`;
    const commonSubtitleClass = `w-full h-[112px] text-[40px] leading-56px md: whitespace-nowrap
        md:text-[32px] md:leading-42px
        sm:text-[24px] sm:leading-33.6px`;
    const commonSubcriptionClass = `h-[64px] text-[24px] leading-32px
        md:h-[52px] md:text-[18px] md:leading-26px
        sm:h-[50px] sm:text-[16px] sm:leading-19.2px`;
    switch (name) {
      case WATCH:
        return {
          section: edgeSection,
          content: `${edgeContent} h-[340px]`,
          imageFrame: watchImageFrame,
          container: watchContainer,
          subtitleClass: `${watchsubtitleClass} font-bold text-[40px] leading-56px sm:text-[32px]`,
          imagePath: "/images/watch_section.png"
        };
      case CHECK:
        return {
          section: centerSection,
          content: `${centerContent} md:items-start sm:items-start`,
          imageFrame: `${centerImageFrame} lg:ml-[31px]`,
          container: checkContainer,
          imagePath: "/images/check_section.png",
          title: "Hot items",
          titleClass: "h-[26px] block text-3692ff font-bold",
          subtitleClass: commonSubtitleClass,
          subcriptionClass: commonSubcriptionClass
        };
      case SEARCH:
        return {
          section: centerSection,
          content: `${centerContent} flex-row-reverse`,
          imageFrame: `${centerImageFrame} lg:mr-[9.5px]`,
          container: `${searchContainer} lg:ml-[9.5px] md:items-end sm:items-end`,
          imagePath: "/images/search_section.png",
          title: "Search",
          titleClass: "h-[26px] block text-3692ff font-bold",
          subtitleClass: commonSubtitleClass,
          subcriptionClass: commonSubcriptionClass
        };
      case REGISTER:
        return {
          section: centerSection,
          content: `${centerContent} md:items-start sm:items-start`,
          imageFrame: centerImageFrame,
          container: registerContainer,
          imagePath: "/images/register_section.png",
          title: "Register",
          titleClass: "h-[26px] block text-3692ff font-bold",
          subtitleClass: commonSubtitleClass,
          subcriptionClass: commonSubcriptionClass
        };
      default: //safety
        return {
          section: edgeSection,
          content: `${edgeContent} h-[397px]`,
          imageFrame: safetyImageFrame,
          subtitleClass: `${safetysubtitleClass} font-bold text-[40px] leading-56px sm:text-[32px]`,
          imagePath: "/images/safety_section.png"
        };
    }
  };

  const {
    section,
    content,
    imageFrame,
    container,
    subtitleClass,
    imagePath,
    title,
    titleClass,
    subcriptionClass
  } = selectClass(name);
  if (name === WATCH) {
    const watchBtn = `w-full h-[56px] bg-3692ff rounded-[40px] text-ffffff mt-[32px] whitespace-nowrap flex justify-center items-center
    sm:px-[71px] sm:py-[11px]`;
    return (
      <div className={section}>
        <div className={content}>
          <div className={container}>
            <p className={subtitleClass}>
              일상의 모든 물건을
              <br className="md:hidden sm:block" />
              거래해보세요
            </p>
            <Link href="/items" className={watchBtn}>
              구경하러 가기
            </Link>
          </div>
          <div className={imageFrame}>
            <Image
              fill
              src={imagePath}
              style={{ objectFit: "contain" }}
              alt="section image"
            />
          </div>
        </div>
      </div>
    );
  } else if (name === "safety") {
    return (
      <div className={section}>
        <div className={content}>
          <p className={subtitleClass}>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </p>
          <div className={imageFrame}>
            <Image
              fill
              src={imagePath}
              style={{ objectFit: "contain" }}
              alt="section image"
            />
          </div>
        </div>
      </div>
    );
  } else {
    const isCheck = name === CHECK;
    const isSearch = name === SEARCH;
    const isRegister = name === REGISTER;
    const subtitle = isCheck ? (
      <>
        인기 상품을 <br className="md:hidden sd:block" />
        확인해 보세요
      </>
    ) : isSearch ? (
      <>
        구매를 원하는 <br className="md:hidden sd:block" />
        상품을 검색하세요
      </>
    ) : isRegister ? (
      <>
        판매를 원하는 <br className="md:hidden sd:block" />
        상품을 등록하세요
      </>
    ) : (
      ""
    );
    const subcription = isCheck ? (
      <>
        가장 HOT한 중고거래 물품을
        <br />
        판다 마켓에서 확인해보세요
      </>
    ) : isSearch ? (
      <>
        구매하고 싶은 물품은 검색해서
        <br />
        쉽게 찾아보세요
      </>
    ) : isRegister ? (
      <>
        어떤 물건이든 판매하고 싶은 상품을 <br />
        쉽게 등록하세요
      </>
    ) : (
      ""
    );
    return (
      <div className={section}>
        <div className={content}>
          <div className={imageFrame}>
            <Image fill src={imagePath} alt="section image" />
          </div>
          <div className={container}>
            <span className={titleClass}>{title}</span>
            <p className={subtitleClass}>{subtitle}</p>
            <p className={subcriptionClass}>{subcription}</p>
          </div>
        </div>
      </div>
    );
  }
}
