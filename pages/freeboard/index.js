import { useEffect, useState } from "react";
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
  const freeBoardPage = `flex justify-center whitespace-nowrap`;
  const freeBoardContents = `w-[1200px] h-[1013px] mt-[24px] mb-[293px] flex flex-col justify-between
    md:w-[696px] md:h-[1364px] md:mb-[19px]
    sm:w-[343px] sm:h-[836px] sm:mt-[16px] sm:mb-[91px]`;
  const bestSection = `w-full h-[217px] flex flex-col justify-between
    md:h-[246px]
    sm:h-[240px]`;
  const standardSection = `w-full h-[756px]
    md:h-[1094px]
    sm:h-[572px]`;

  const bestSectionTitle = `h-[24px] text-footerbg text-[20px] leading-23.87px font-bold
    sm:h-[26px] sm:text-[18px] leading-26px`;
  const bestArticleListClass = `w-full h-[169px] flex gap-[24px]
    md:h-[198px]
    sm:h-[198px]`;
  const bestAricleFrameClass = `w-[384px] h-[169px] flex flex-col px-[24px] bg-f9fafb
    md:w-[340px] md:h-[198px]
    sm:w-full sm:h-[198px]`;
  const bestContents = `w-full h-[72px] flex justify-between mt-[16px]`;
  const bestTitle = `w-[256px] h-[64px] font-semibold text-[20px] leading-[32px] whitespace-normal text-1f2937
    md:w-[180px] md:h-[48px] md:text-[18px] md:leading-[26px]
    sm:w-[180px] sm:h-[48px] sm:text-[18px] sm:leading-[26px]`;
  const bestArticleImage = `border-[1px] border-f3f4f6 rounded-[8px]`;
  const bestContainer = `w-full h-[24px] flex mt-[16px] text-[14px] leading-[24px] text-3ca3af`;
  const bestArticleListNickClass = `w-[61px]`;
  const bestArticleListFavorite = `w-[64px] h-full ml-[8px] flex items-center`;
  const bestFavoritCount = `w-[64px] h-full ml-[4px]`;
  const bestArticleListTime = `w-[79px] ml-[80px]`;
  const standardHeader = `w-full h-[42px] flex justify-between`;
  const standardFillterBox = `w-full h-[42px] flex  mt-[24px] gap-[16px]
   md:mt-[48px] md:gap-[6px]
   sm:mt-[16px] sm:gap-[13px]`;
  const standardArticleListClass = `w-full h-[624px] flex flex-col gap-[24px] mt-[24px] md:mt-[40px] sm:mt-[16px]`;
  const standardTitle = `h-[32px] text-[20px] text-1f2937 font-bold leading-32px
    sm:text-[18px] sm:leading-26px`;
  const linkPostArticleBtn = `w-[88px] h-full flex justify-center items-center
     text-[16px] font-bold leading-19.09px rounded-[8px] text-ffffff bg-3692ff`;
  const searchBox = `w-[1054px] h-full relative
    md:w-[560px]
    sm:w-[288px]`;
  const searchInput = `w-full h-full rounded-[12px] px-[44px] py-[20px] focus:outline-none bg-f3f4f6`;
  const searchImage = `absolute left-[16px] top-[50%] transform -translate-y-[50%]`;
  const standardArticleClass = `w-full h-[138px] sm:h-[136px] bg-fcfcfc`;
  const standardArticleTitleAndImage = `w-full h-[72px] flex justify-between`;
  const standardArticleTitle = `w-[1120px] text-[20px] leading-32px font-semibold text-1f2937 whitespace-normal
    md:w-[616px]
    sm:w-[263px] sm:text-[18px] leading-26px`;
  const standardArticleImage = `border-[1px] border-f3f4f6 rounded-[8px]`;
  const standardConatinerBox = `w-full h-[26px] flex justify-between mt-[16px] sm:h-[24px]
    text-[14px] text-4b5563 leading-24px`;
  const standardProfileAndNickAndFavorite = `h-full flex`;
  const standardNickName = `ml-[8px]`;
  const standardArticleDate = `ml-[8px]`;
  const standardArticleFavorite = `h-full flex gap-[8px]`;
  const standardArticleHeart = ``;
  const standardFavoriteCount = `w-[50px] text-[16px] text-6b7280 leading-26px`;

  const [order, setOrder] = useState(RECENT);
  const [keyword, setKeyword] = useState("");
  const bestSize = useResponsiveItemCount({ sm: 1, md: 2, lg: 3 });
  const standardSize = useResponsiveItemCount({ sm: 3, md: 6, lg: 4 });
  const { articleList: bestList } = useGetData({
    type: ARTICLE_LIST,
    order: FAVORITEST,
    count: bestSize
  });
  const { articleList: standardList } = useGetData({
    type: ARTICLE_LIST,
    order,
    keyword,
    count: standardSize
  });
  const handleChangeOrder = (chosenOrder) => setOrder(chosenOrder);
  const handleChnageKeyword = (e) => setKeyword(e.target.value);
  return (
    <div className={freeBoardPage}>
      <div className={freeBoardContents}>
        <div className={bestSection}>
          <h1 className={bestSectionTitle}>베스트 게시글</h1>
          <div className={bestArticleListClass}>
            {bestList?.map((article) => (
              <Link href={`/freeboard/${article.id}`} key={article.id}>
                <div className={bestAricleFrameClass}>
                  <Image
                    width={102}
                    height={30}
                    src="/images/img_badge.png"
                    alt="뱃지 이미지"
                  />
                  <div className={bestContents}>
                    <p className={bestTitle}>{article.title}</p>
                    <Image
                      width={72}
                      height={72}
                      src="/images/default.png"
                      className={bestArticleImage}
                      alt="베스트 게시글 이미지"
                    />
                  </div>
                  <div className={bestContainer}>
                    <span className={bestArticleListNickClass}>총명한판다</span>

                    <div className={bestArticleListFavorite}>
                      <Image
                        width={16}
                        height={16}
                        src="/images/ic_heart.png"
                        alt="하트 이미지"
                      />
                      <span className={bestFavoritCount}>
                        {article.favoriteCount}
                      </span>
                    </div>
                    <span className={bestArticleListTime}>
                      {convertDate(article.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={standardSection}>
          <div className={standardHeader}>
            <h1 className={standardTitle}>게시글</h1>
            <Link href="/freeboard/write" className={linkPostArticleBtn}>
              글쓰기
            </Link>
          </div>
          <div className={standardFillterBox}>
            <div className={searchBox}>
              <input
                className={searchInput}
                onChange={handleChnageKeyword}
                placeholder="검색할 상품을 입력해주세요"
              ></input>
              <Image
                width={24}
                height={24}
                src="/images/ic_search.png"
                className={searchImage}
                alt="검색 이미지"
              />
            </div>
            <SortSelector onChangeOrder={handleChangeOrder} />
          </div>
          <ul className={standardArticleListClass}>
            {standardList?.map((article) => (
              <Link href={`/freeboard/${article.id}`} key={article.id}>
                <li className={standardArticleClass}>
                  <div className={standardArticleTitleAndImage}>
                    <h1 className={standardArticleTitle}>{article.title}</h1>
                    <Image
                      src="/images/default.png"
                      width={72}
                      height={72}
                      className={standardArticleImage}
                      alt="게시글 미리보기 이미지"
                    />
                  </div>
                  <div className={standardConatinerBox}>
                    <div className={standardProfileAndNickAndFavorite}>
                      <Image
                        width={24}
                        height={24}
                        src="/images/ic_profile.png"
                        alt="프로필 이미지"
                      />
                      <span className={standardNickName}>총명한 판다</span>
                      <span className={standardArticleDate}>
                        {convertDate(article.createdAt)}
                      </span>
                    </div>
                    <div className={standardArticleFavorite}>
                      <Image
                        width={24}
                        height={24}
                        src="/images/ic_heart.png"
                        className={standardArticleHeart}
                        alt="하트이미지"
                      />
                      <span className={standardFavoriteCount}>
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
