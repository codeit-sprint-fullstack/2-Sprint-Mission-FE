import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import useResponsiveItemCount from "@/hooks/useResponsiveItemCount";
import useGetData from "@/hooks/useGetData";
import { getArticle, getArticles } from "@/api/api";
import Image from "next/image";
import convertDate from "@/utils/convertDate";
import SortSelector from "@/components/SortSelector";
import article from "./[id]";
import { ORDER_STATE, MODEL_TYPE } from "@/constants";
const { RECENT, FAVORITEST } = ORDER_STATE;
const { ARTICLE_LIST } = MODEL_TYPE;
export default function FreeBoard() {
  const [order, setOrder] = useState(RECENT);
  const [keyword, setKeyword] = useState("");
  const bestSize = useResponsiveItemCount({ sm: 1, md: 2, lg: 3 });
  const standardSize = useResponsiveItemCount({ sm: 3, md: 6, lg: 4 });
  const queryClient = useQueryClient();
  const {
    data: standardData,
    isError,
    isPending
  } = useQuery({
    queryKey: ["standardArticleList", order, standardSize], //값이 안받아와짐 체크하기
    queryFn: () =>
      getArticles({
        page: 1,
        pageSize: standardSize,
        orderBy: order,
        keyword
      }),
    enabled: !!standardSize
  });
  const { data: bestData } = useQuery({
    queryKey: ["bestList", bestSize], //값이 안받아와짐 체크하기
    queryFn: () =>
      getArticles({
        page: 1,
        pageSize: bestSize,
        order: FAVORITEST
      }),
    enabled: !!bestSize
  });
  const { list: standardList, totalCount } = standardData?.data || {};
  const { list: bestList } = bestData?.data || {};
  const handleChangeOrder = (chosenOrder) => setOrder(chosenOrder);
  const handleChnageKeyword = (e) => setKeyword(e.target.value);
  return (
    <div className="flex justify-center whitespace-nowrap">
      <div
        className="w-[1200px] h-[1013px] mt-[24px] mb-[293px] flex flex-col justify-between
        md:w-[696px] md:h-[1364px] md:mb-[19px]
        sm:w-[343px] sm:h-[836px] sm:mt-[16px] sm:mb-[91px]"
      >
        <div className="w-full h-[217px] flex flex-col justify-between md:h-[246px] sm:h-[240px]">
          <h1
            className="h-[24px] text-footerbg text-[20px] leading-23.87px font-bold
            sm:h-[26px] sm:text-[18px] sm:leading-26px"
          >
            베스트 게시글
          </h1>
          <div className="w-full h-[169px] flex gap-[24px] md:h-[198px] sm:h-[198px]">
            {bestList?.map((article) => (
              <Link href={`/freeboard/${article.id}`} key={article.id}>
                <div
                  className="w-[384px] h-[169px] flex flex-col px-[24px] bg-f9fafb
                  md:w-[340px] md:h-[198px]
                  sm:w-full sm:h-[198px]"
                >
                  <Image
                    width={102}
                    height={30}
                    src="/images/img_badge.png"
                    alt="뱃지 이미지"
                  />
                  <div className="w-full h-[72px] flex justify-between mt-[16px]">
                    <p
                      className="w-[256px] h-[64px] font-semibold text-[20px] leading-[32px] whitespace-normal text-1f2937
                      md:w-[180px] md:h-[48px] md:text-[18px] md:leading-[26px]
                      sm:w-[180px] sm:h-[48px] sm:text-[18px] sm:leading-[26px]"
                    >
                      {article.title}
                    </p>
                    <img
                      className="w-[72px] h-[72px]"
                      src={article.image}
                      alt="베스트 게시글 이미지"
                    />
                  </div>
                  <div className="w-full h-[24px] flex mt-[16px] text-[14px] leading-[24px] text-3ca3af">
                    <span className="w-[61px]">총명한판다</span>

                    <div className="w-[64px] h-full ml-[8px] flex items-center">
                      <Image
                        width={16}
                        height={16}
                        src="/images/ic_heart.png"
                        alt="하트 이미지"
                      />
                      <span className="w-[64px] h-full ml-[4px]">
                        {article.favoriteCount}
                      </span>
                    </div>
                    <span className="w-[79px] ml-[80px]">
                      {convertDate(article.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full h-[756px] md:h-[1094px] sm:h-[572px]">
          <div className="w-full h-[42px] flex justify-between">
            <h1
              className="h-[32px] text-[20px] text-1f2937 font-bold leading-32px
              sm:text-[18px] sm:leading-26px"
            >
              게시글
            </h1>
            <Link
              href="/freeboard/write"
              className="w-[88px] h-full flex justify-center items-center
              text-[16px] font-bold leading-19.09px rounded-[8px] text-ffffff bg-3692ff"
            >
              글쓰기
            </Link>
          </div>
          <div
            className="w-full h-[42px] flex  mt-[24px] gap-[16px]
            md:mt-[48px] md:gap-[6px]
            sm:mt-[16px] sm:gap-[13px]"
          >
            <div
              className="w-[1054px] h-full relative
              md:w-[560px]
              sm:w-[288px]"
            >
              <input
                className="w-full h-full rounded-[12px] px-[44px] py-[20px] focus:outline-none bg-f3f4f6"
                onChange={handleChnageKeyword}
                placeholder="검색할 상품을 입력해주세요"
              ></input>
              <Image
                width={24}
                height={24}
                src="/images/ic_search.png"
                className="absolute left-[16px] top-[50%] transform -translate-y-[50%]"
                alt="검색 이미지"
              />
            </div>
            <SortSelector onChangeOrder={handleChangeOrder} />
          </div>
          <ul className="w-full h-[624px] flex flex-col gap-[24px] mt-[24px] md:mt-[40px] sm:mt-[16px]">
            {standardList?.map((article) => (
              <Link href={`/freeboard/${article.id}`} key={article.id}>
                <li className="w-full h-[138px] sm:h-[136px] bg-fcfcfc">
                  <div className="w-full h-[72px] flex justify-between">
                    <h1
                      className="w-[1120px] text-[20px] leading-32px font-semibold text-1f2937 whitespace-normal
                      md:w-[616px]
                      sm:w-[263px] sm:text-[18px] sm:leading-26px"
                    >
                      {article.title}
                    </h1>
                    <img
                      className="w-[72px] h-[72px] border-[1px] border-f3f4f6 rounded-[8px]"
                      src={article.image}
                      alt="게시글 미리보기 이미지"
                    />
                  </div>
                  <div
                    className="w-full h-[26px] flex justify-between mt-[16px] sm:h-[24px]
                    text-[14px] text-4b5563 leading-24px"
                  >
                    <div className="h-full flex">
                      <Image
                        width={24}
                        height={24}
                        src="/images/ic_profile.png"
                        alt="프로필 이미지"
                      />
                      <span className="ml-[8px]">총명한 판다</span>
                      <span className="ml-[8px]">
                        {convertDate(article.createdAt)}
                      </span>
                    </div>
                    <div className="h-full flex gap-[8px]">
                      <Image
                        width={24}
                        height={24}
                        src="/images/ic_heart.png"
                        alt="하트이미지"
                      />
                      <span className="w-[50px] text-[16px] text-6b7280 leading-26px">
                        {article.favoriteCount}
                      </span>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
