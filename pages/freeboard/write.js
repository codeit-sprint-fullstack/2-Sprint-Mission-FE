import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
export default function Write() {
  const writePage = `w-full flex justify-center`;
  const writeFrame = `w-[1200px] h-[512px] flex flex-col justify-between mt-[24px] mb-[794px]
    md:w-[696px] md:mt-[16px] md:mb-[879px]
    sm:w-[345px] sm:h-[410px] sm:mt-[16px] sm:mb-[965px]`;
  const header = `w-full h-[42px] flex justify-between items-center`;
  const titleClass = `w-[92px] h-[32px] text-[20px] leading-32px font-bold text-1f2937
    md:leading-23.87px sm:leading-23.87px`;
  const postBtn = `w-[74px] h-full px-[23px] py-[12px] text-[16px] font-semibold leading-19.09px text-f3f4f6 rounded-[8px]`;
  const inputBox = `w-full h-[438px] flex flex-col
    sm:h-[344px]`;
  const labelClass = `h-[26px] text-[18px] leading-26px font-bold text-1f2937
    sm:h-[24px] sm:text-[14px] leading-24px`;
  const inputClass = `w-full h-[56px] mt-[12px] mb-[24px] px-[24px] py-[16px] rounded-[12px] focus:outline-none bg-f3f4f6
    sm:mb-[12px]`;
  const textAreaClass = `w-full h-[282px] mt-[12px] px-[24px] py-[16px] rounded-[12px] focus:outline-none bg-f3f4f6`;
  const on = "bg-3692ff";
  const off = "bg-9ca3af";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPost, setIsPost] = useState(false);
  const router = useRouter();
  const handleChangeTitle = (e) => setTitle((prev) => e.target.value);
  const handleChangeContent = (e) => setContent(e.target.value);
  const validate = () => {
    if (title === "" || content === "") setIsPost(false);
    else setIsPost(true);
  };
  const handleSumit = async (e) => {
    e.preventDefault();
    const submitData = {
      userId: "c2b44a5b-5d1f-4e6e-9b55-3f8e5e7e8b18",
      title,
      content
    };
    try {
      const res = await axios.post("/articles", submitData);
      console.log(res);
      router.push(`/freeboard/${res.data.id}`);
    } catch (e) {
      console.log(`데이터 전송 중 오류: ${e.message}`);
    }
  };
  useEffect(() => {
    validate();
  }, [title, content]);
  return (
    <div className={writePage}>
      <form className={writeFrame}>
        <div className={header}>
          <h1 className={titleClass}>게시글 쓰기</h1>
          <button
            type="button"
            className={isPost ? `${postBtn} ${on}` : `${postBtn} ${off}`}
            onClick={handleSumit}
            disabled={!isPost}
          >
            등록
          </button>
        </div>
        <div className={inputBox}>
          <label className={labelClass} htmlFor="postArticlePageInput">
            *제목
          </label>
          <input
            id="postArticlePageInput"
            className={inputClass}
            value={title}
            onChange={handleChangeTitle}
            spellCheck="false"
            placeholder="제목을 입력해주세요"
          />
          <label className={labelClass} htmlFor="postArticlePageTextArea">
            *내용
          </label>
          <textarea
            id="postArticlePageTextArea"
            className={textAreaClass}
            value={content}
            onChange={handleChangeContent}
            spellCheck="false"
            placeholder="내용을 입력해주세요"
          />
          <input type="text" name="hidden" style={{ display: "none" }} />
          {/*인풋엔터 입력시 제출 방지 */}
        </div>
      </form>
    </div>
  );
}
