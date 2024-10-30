import { useState } from "react";
import Image from "next/image";
import EditDeleteDropDown from "./EditDeleteDropDown";
import axios from "@/lib/axios";

export default function Comment({ data, onDelete }) {
  const commentClassWithoutHeight = `w-full bg-fcfcfc flex flex-col justify-between relative`;
  const commentHeader = `w-full flex justify-between items-start`;
  const commentContentEditClass = `w-full h-full text-[14px] leading-24px text-1f2937 bg-f3f4f6
  bg-fcfcfc border-none resize-none outline-none`;
  const commentContentClass = `w-full h-full text-[14px] leading-24px text-1f2937
     border-none resize-none outline-none`;
  const commentProfileAndCreatedAt = `w-[92px] h-[40px] flex justify-between mb-[12px]`;
  const commentNicknameAndCreatedAt = `w-[52px] h-full flex flex-col gap-[4px] text-[12px] leading-18px`;
  const commentNickname = `w-full h-[18px] text-4b5563 whitespace-nowarp`;
  const commentCreatedAt = `w-full h-[18px]`;
  const buttonList = `w-[178px] h-[47px] absolute bottom-[12px] right-0 flex justify-between
    text-[16px] font-semibold`;
  const cancelBtn = `w-[68px] h-[47px] flex items-center justify-center`;
  const patchCompleteBtn = `w-[106px] h-[42px] px-[23px] py-[12px] flex items-center text-f3f4f6 rounded-[8px] border-none bg-3692ff`;
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(data.content);
  const isEdit = editMode;
  const handleChange = (e) => setContent(e.target.value);
  const handleDropDownChange = (chosenOption) => {
    console.log(chosenOption);
    if (chosenOption === "수정하기") setEditMode(true);
    else if (chosenOption === "삭제하기") onDelete(data.id);
  };
  const commentClass = `${commentClassWithoutHeight} ${
    isEdit ? "h-[180px] sm:h-[176px]" : "h-[100px] sm:h-[96px]"
  }`;
  const commentHeader1 = `${commentHeader} ${isEdit ? "h-[80px]" : "h-[48px]"}`;
  const commentContentClass1 = `${commentContentClass} ${
    isEdit ? `bg-f3f4f6 px-[24px] py-[16px] rounded-[12px]` : "bg-fcfcfc"
  }`;
  const handleClickCancel = (e) => setEditMode(false);
  const handleClickPatchComplete = (e) => {
    const submitData = { content };
    try {
      axios.patch(`/article-comments/${data.id}`, submitData);
      setEditMode(false);
    } catch (e) {
      console.log(`데이터 전송중 오류: ${e.message}`);
    }
  };
  return (
    <div className={commentClass}>
      <div className={commentHeader1}>
        <textarea
          className={commentContentClass1}
          onChange={handleChange}
          value={content}
          disabled={!isEdit}
        ></textarea>
        <EditDeleteDropDown
          className={isEdit ? "hidden" : ""}
          onDropDownChange={handleDropDownChange}
        />
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
      <div className={`${buttonList} ${isEdit ? "" : "hidden"}`}>
        <button className={cancelBtn} onClick={handleClickCancel}>
          취소
        </button>
        <button className={patchCompleteBtn} onClick={handleClickPatchComplete}>
          수정 완료
        </button>
      </div>
    </div>
  );
}
