import Image from "next/image";
import home_top from "@/../public/assets/Img_home_top.svg";
import home_bottom from "@/../public/assets/Img_home_bottom.svg";
import LandingCard from "@/components/landingCard";
import home1 from "@/../public/assets/Img_home_01.svg";
import home2 from "@/../public/assets/Img_home_02.svg";
import home3 from "@/../public/assets/Img_home_03.svg";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-[#CFE5FF] flex justify-center items-end h-[54rem]">
        <div className="flex gap-[0.7rem] items-center justify-center">
          <div className="pb-[6rem] flex gap-[3.2rem] flex-col">
            <p className="font-bold text-[4rem] leading-[5.6rem] text-[#374151]">
              일상의 모든 물건을 <br /> 거래해 보세요
            </p>
            <button className="h-[5.6rem] rounded-[4rem] py-[1.6rem] px-[12.4rem] gap-[1rem] bg-[#3692FF] font-semibold text-[2rem] leading-[3.2rem] flex items-center text-[#F9FAFB]">
              구경하러 가기
            </button>
          </div>
          <Image src={home_top} alt="home-top" width={746} height={340} />
        </div>
      </div>
      <div>
        <div className="w-full py-[13.8rem] flex items-center justify-center">
          <LandingCard
            image={home1}
            category="Hot item"
            title1="인기 상품을"
            title2="확인해 보세요"
            description1="가장 HOT한 중고거래 물품을"
            description2="판다 마켓에서 확인해 보세요"
            align="start"
          />
        </div>
      </div>
      <div>
        <div className="w-full py-[13.8rem] flex items-center justify-center">
          <LandingCard
            image={home2}
            category="Search"
            title1="구매를 원하는"
            title2="상품을 검색하세요"
            description1="구매하고 싶은 물품은 검색해서"
            description2="쉽게 찾아보세요"
            align="end"
          />
        </div>
      </div>
      <div>
        <div className="w-full py-[13.8rem] flex items-center justify-center">
          <LandingCard
            image={home3}
            category="Register"
            title1="판매를 원하는"
            title2="상품을 등록하세요"
            description1="어떤 물건이든 판매하고 싶은 상품을"
            description2="쉽게 등록하세요"
            align="start"
          />
        </div>
      </div>
      <div className="w-full bg-[#CFE5FF] flex justify-center items-end h-[54rem]">
        <div className="flex gap-[6.9rem] items-center justify-center">
          <div className="pb-[6rem] flex gap-[3.2rem] flex-col">
            <p className="font-bold text-[4rem] leading-[5.6rem] text-[#374151]">
              믿을 수 있는 <br /> 판다마켓 중고 거래
            </p>
          </div>
          <Image src={home_bottom} alt="home-bottom" width={746} height={397} />
        </div>
      </div>
    </div>
  );
}
