import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import {
  deleteArticle,
  postArticleComment,
  deleteArticleComment,
  patchArticleComment,
  getArticle,
  getArticleComments
} from "@/api/api";
import useGetData from "@/lib/hooks/useGetData";
import CommentItem from "@/components/CommentItem";
import EditDeleteDropDown from "@/components/EditDeleteDropDown";
import { useError } from "@/contexts/ErrorProvider";
import { tenaryWithEmpty } from "@/utils/ternaryUtils";
import convertDate from "@/utils/convertDate";
import { ORDER_STATE, MODEL_TYPE, BUTTON_TYPE } from "@/constants";
import Product from "../items/[id]";
import { useAuth } from "@/contexts/AuthProvider";
const { RECENT } = ORDER_STATE;
const { ARTICLE_WITH_COMMENTS } = MODEL_TYPE;
export default function Article() {
  const articlePage = `w-full flex justify-center`;
  const articePageContents = `w-[1200px] flex flex-col items-center
    mt-[34px] mb-[193px]
    md:w-[696px] md:mt-[26px] md:mb-[291px]
    sm:w-[343px] sm:mt-[24px] sm:mb-[319px]`;
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
  const articleCreateAt = `w-[80px] h-[24px] text-[14px] leading-24px text-9ca3af whtiespace-nowrap`;
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
    text-9ca3af rounded-[12px] resize-none`;
  const commentListClass = `w-full mt-[40px] flex flex-col gap-[24px]
   md:mt-[32px]
     sm:mt-[24px] sm:gap-[16px]`;
  const returnPageBtn = `w-[240px] h-[48px] flex px-[39.5px] items-center mt-[64px] rounded-40px bg-3692ff
    md:mt-[56px]
    sm:mt-[40px]`;
  const returnBtnText = `w-[129px] h-[26px] text-[18px] mr-[8px] font-semibold
    text-center text-f3f4f6 leading-26px whitespace-nowrap`;
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const [order, setOrder] = useState(RECENT);
  const { data, isPending, isError } = useQuery({
    queryKey: ["articleInfo", id],
    queryFn: () => getArticle(id),
    enabled: !!id
  });
  const {
    data: commentsData,
    isPending: commentsIsPending,
    isError: commentsIsError
  } = useQuery({
    queryKey: ["articleComments", id],
    queryFn: () =>
      getArticleComments({
        id,
        params: {
          limit: 3
        }
      }),
    enabled: !!id
  });
  const article = data?.data || {};
  const articleComments = commentsData?.data?.list || {};
  const [comment, setComment] = useState("");
  const [isPost, setIsPost] = useState(false);
  const { user } = useAuth(true);
  const { handleError } = useError();
  const handleDropDownChange = async (chosenItem) => {
    if (chosenItem === BUTTON_TYPE.edit.value) {
      router.push(`/freeboard/write/${article?.id}`);
    } else if (chosenItem === BUTTON_TYPE.delete.value) {
      try {
        const resposne = await deleteArticle(id);
        router.push("/freeboard");
      } catch (e) {
        const error = new Error("삭제 실패");
        handleError(error);
      }
    }
  };
  useEffect(() => {
    if (comment === "") setIsPost(false);
    else setIsPost(true);
  }, [comment]);
  const handleChangeComment = (e) => setComment(e.target.value);
  const handleSumbitComment = async (e) => {
    e.preventDefault();
    const sumbitData = {
      userId: "c2b44a5b-5d1f-4e6e-9b55-3f8e5e7e8b18",
      articleId: id,
      content: comment
    };
    try {
      const response = await postArticleComment(sumbitData);
      setComment("");
    } catch (e) {
      handleError(new Error("데이터 전송 실패"));
    }
  };
  const handlePatchComment = async ({ id, formData }) => {
    const response = await patchArticleComment({ id, formData });
  };
  const handleDeleteComment = async (deleteId) => {
    try {
      await deleteArticleComment(deleteId);
    } catch (e) {
      handleError(new Error("삭제 실패"));
    }
  };
  const isComments = articleComments?.length === 0;
  return (
    <div className={articlePage}>
      <div className={articePageContents}>
        <div className={articleClass}>
          <div className={haeder}>
            <h1 className={articleTitleClass}>{article?.title}</h1>
            <EditDeleteDropDown onDropDownChange={handleDropDownChange} />
          </div>

          <div className={profileAndCreateAtAndFavorite}>
            <Image
              width={40}
              height={40}
              src="/images/ic_profile.png"
              alt="프로필 이미지"
            />
            <span className={aritlceNickName}>{article?.writer?.nickname}</span>
            <span className={articleCreateAt}>
              {convertDate(article?.createdAt)}
            </span>
            <div className="h-[34px] mx-[32px] sm:mx-[16px] border-l border-e5e7eb"></div>
            {/*구분선*/}
            <button className={favoriteBtn}>
              <Image
                width={32}
                height={32}
                src="/images/ic_bigheart.png"
                alt="하트이미지"
              />
              <span className={favoriteCount}>{article?.likeCount}</span>
            </button>
          </div>

          <div className={articleContent}>{article?.content}</div>
        </div>
        <form className={postCommentFrame}>
          <label htmlFor="postComment" className={commentLabel}>
            댓글달기
          </label>
          <textarea
            id="postComment"
            className={commentTextArea}
            onChange={handleChangeComment}
            value={comment}
            placeholder="댓글을 입력해주세요"
            spellCheck="false"
          />
          <button
            type="button"
            onClick={handleSumbitComment}
            className={`w-[74px] h-[42px] flex items-center text-f3f4f6 font-semibold text-[16px]
    rounded-[8px] px-[23px] py-[12px] mt-[16px] whitespace-nowrap ${
      isPost ? "bg-3692ff" : "bg-9ca3af"
    }`}
            disabled={!isPost}
          >
            등록
          </button>
        </form>
        <div className={commentListClass}>
          {articleComments?.map((comment) => (
            <CommentItem
              data={comment}
              key={comment.id}
              onPatch={handlePatchComment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
        {tenaryWithEmpty(
          isComments,
          <>
            <div
              className="w-[196px] h-[196px] relative mt-[40px] lg:mt-[24px]
            md:w-[140px] md:h-[140px]
            sm:w-[140px] sm:h=[140px]"
            >
              <Image src="/images/Img_inquiry_empty.png" layout="fill" />
            </div>
            <span className="mt-[8px] text-9ca3af mb-[48px]">
              아직 문의가 없어요
            </span>
          </>
        )}
        <Link
          className={`w-[240px] h-[48px] flex px-[39.5px] items-center rounded-40px bg-3692ff
            ${isComments ? "" : "mt-[64px] md:mt-[56px] sm:mt-[40px]"}`}
          href="/freeboard"
        >
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
