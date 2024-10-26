import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "@/lib/axios";
import useDataFetch from "@/hooks/useDataFetch";
export default function article() {
  const articlePage = `w-full flex justify-center`;
  const articePageContents = `w-[1200px] h-[883px] flex flex-col items-center
    mt-[34px] mb-[193px]
    md:w-[696px] md:h-[858px] md:mt-[26px] md:mb-[291px]
    sm:w-[343px] sm:h-[865px] sm:mt-[24px] sm:mb-[319px]`;
  const articleClass = `w-full h-[154px] flex flex-col gap-[16px]
    md:h-[146px]
    sm:h-[204px]`;
  const haeder = `w-full h-[32px] flex justify-between
    sm:h-[64px]`;
  const articleTitleClass = `h-full mr-[8px] text-[20px] leading-[32px] font-bold text-1f2937`;
  const patchOrDeleteBtn = `w-[24px] h-[24px] flex justify-center itmes-center`;
  const profileAndCreateAtAndFavorite = `w-[354px] h-[40px] flex items-center
    sm:w-[308px]`;
  const aritlceNickName = `w-[69px] h-[24px] ml-[16px] text-[14px] leading-24px text-4b5563`;
  const articleCreateAt = `h-[24px] text-[14px] leading-24px text-9ca3af`;
  const favoriteBtn = `w-[87px] h-[40px] flex items-center gap-[4px] px-[12px] py-[4px] rounded-[35px] border-[1px]
    sm:w-[79px] sm:h-[34px]`;
  const favoriteCount = `text-[16px] leading-26px text-6b7280`;
  const articleContent = `w-full h-[50px] border-t-[1px] border-e5e7eb pt-[24px]
    md:h-[42px] md:pt-[16px]
    sm:h-[68px] sm:pt-[16px]`;
  const postCommentFrame = `w-full h-[197px] mt-[32px] flex flex-col items-end
    md:mt-[40px]`;
  const commentLabel = `w-full h-[26px] text-[16px] font-semibold leading-26px text-111827`;
  const commentTextArea = `w-full h-[104px] mt-[9px] px-[24px] py-[16px] focus:outline-none bg-f3f4f6
    text-9ca3af rounded-[12px]`;
  const commentBtn = `w-[74px] h-[42px] flex items-center text-f3f4f6 font-semibold text-[16px] bg-9ca3af
    rounded-[8px] px-[23px] py-[12px] mt-[16px] whitespace-nowrap`;
  const commentListClass = `w-full h-[348px] mt-[40px] flex flex-col gap-[24px]
    md:h-[339px] md:mt-[32px]
    sm:h-[320px] sm:mt-[24px] sm:gap-[16px]`;
  const commentClass = `w-full h-[100px] bg-fcfcfc
    sm:h-[96px]`;
  const commentHeader = `w-full h-[24px] flex justify-between items-center`;
  const commentContentClass = `text-[14px] leading-24px text-1f2937`;
  const commentProfileAndCreatedAt = `w-[92px] h-[40px] mt-[24px] flex justify-between`;
  const commentNicknameAndCreatedAt = `w-[52px] h-full flex flex-col gap-[4px] text-[12px] leading-18px`;
  const commentNickname = `w-full h-[18px] text-4b5563 whitespace-nowarp`;
  const commentCreatedAt = `w-full h-[18px]`;

  const returnPageBtn = `w-[240px] h-[48px] flex px-[39.5px] items-center mt-[64px] rounded-40px bg-3692ff
    md:mt-[56px]
    sm:mt-[40px]`;
  const returnBtnText = `w-[129px] h-[26px] text-[18px] mr-[8px] font-semibold
    text-center text-f3f4f6 leading-26px whitespace-nowrap`;
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState("recent");
  const { articleComments = [], ...article } = useDataFetch({
    type: "articleWithComments",
    order,
    id
  });
  console.log(articleComments);
  return (
    <div className={articlePage}>
      <div className={articePageContents}>
        <div className={articleClass}>
          <div className={haeder}>
            <h1 className={articleTitleClass}>{article.title}</h1>
            <button className={patchOrDeleteBtn}>
              <Image
                width={24}
                height={24}
                src="/images/ic_kebab.png"
                alt="버튼 이미지"
              />
            </button>
          </div>
          <div className={profileAndCreateAtAndFavorite}>
            <Image
              width={40}
              height={40}
              src="/images/ic_profile.png"
              alt="프로필 이미지"
            />
            <span className={aritlceNickName}>총명한 판다</span>
            <span className={articleCreateAt}>2024.01.02</span>
            <div className="h-[34px] mx-[32px] sm:mx-[16px] border-l border-e5e7eb"></div>{" "}
            {/*구분선*/}
            <button className={favoriteBtn}>
              <Image
                width={32}
                height={32}
                src="/images/ic_bigheart.png"
                alt="하트이미지"
              />
              <span className={favoriteCount}>123</span>
            </button>
          </div>
          <div className={articleContent}>{article.content}</div>
        </div>
        <form className={postCommentFrame}>
          <label htmlFor="postComment" className={commentLabel}>
            댓글달기
          </label>
          <textarea
            id="postComment"
            className={commentTextArea}
            placeholder="댓글을 입력해주세요"
            spellCheck="false"
          />
          <button className={commentBtn}>등록</button>
        </form>

        <div className={commentListClass}>
          {articleComments.map((comment) => (
            <div className={commentClass}>
              <div className={commentHeader}>
                <h1 className={commentContentClass}>{comment.content}</h1>
                <button className={patchOrDeleteBtn}>
                  <Image
                    width={24}
                    height={24}
                    src="/images/ic_kebab.png"
                    alt="버튼 이미지"
                  />
                </button>
              </div>
              <div className={commentProfileAndCreatedAt}>
                <Image
                  width={32}
                  height={32}
                  className="w-[32px] h-[32px]"
                  src="/images/ic_profile.png"
                  alt="프로필이미지"
                />
                <div className={commentNicknameAndCreatedAt}>
                  <span className={commentNickname}>똑똑한판다</span>
                  <span className={commentCreatedAt}>1시간 전</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link className={returnPageBtn} href="/freeboard">
          <span className={returnBtnText}>목록으로 돌아가기</span>
          <Image
            width={24}
            height={24}
            src="/images/ic_back.png"
            alt="버튼 이미지"
          />
        </Link>
      </div>
    </div>
  );
}
