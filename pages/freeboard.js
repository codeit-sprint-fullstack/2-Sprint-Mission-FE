import { useState } from "react";
import useResponsiveItemCount from "@/hooks/useResponsiveItemCount";
export default function FreeBoard() {
  const freeBoardPage = `flex justify-center whitespace-nowrap`;
  const freeBoardContents = `w-[1200px] h-[1013px] mt-[24px] mb-[293px] flex flex-col justify-between
    md:w-[696px] md:h-[1364px] md:mb-[19px]
    sm:w-[343px] sm:h-[836px] sm:mt-[16px] sm:mb-[91px]`;
  const bestSection = `w-full h-[217px] flex flex-col justify-between bg-green-500
    md:h-[246px]
    sm:h-[240px]`;
  const standardSection = `w-full h-[756px] bg-green-500
    md:h-[1094px]
    sm:h-[572px]`;
  const bestSectionTitle = `h-[24px] text-footerbg text-[20px] leading-23.87px font-bold bg-blue-500
    sm:h-[26px] sm:text-[18px] leading-26px`;
  const bestArticleList = `w-full h-[169px] bg-blue-500
    md:h-[198px]
    sm:h-[198px]`;
  const { count: bestListCount } = useResponsiveItemCount({
    sm: 4,
    md: 6,
    lg: 10
  });
  const [standardListCount, setStandardListCount] = useState();
  return (
    <div className={freeBoardPage}>
      <div className={freeBoardContents}>
        <div className={bestSection}>
          <h1 className={bestSectionTitle}>베스트 게시글</h1>
          <div className={bestArticleList}>
            <div>{bestListCount}</div>
          </div>
        </div>
        <div className={standardSection}></div>
      </div>
    </div>
  );
}
