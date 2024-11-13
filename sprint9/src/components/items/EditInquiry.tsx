"use Client";

import style from "@/src/styles/items/EditInquiry.module.css";
import Button from "@/src/components/Button";
import { useState, useEffect } from "react";

interface EditInquiryProps {
  comment: string;
  onCancelClick: () => void;
  onEditClick: (newComment: string) => void;
}

export default function EditInquiry({
  comment,
  onCancelClick,
  onEditClick
}: EditInquiryProps) {
  const [newComment, setNewComment] = useState(comment);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleSaveClick = () => {
    onEditClick(newComment);
  };

  //NOTE: newComment의 타입을 위에서 String으로 지정해주었기 때문에 optional chaning(null,undefined 판명)의 효력이 없다고함.
  useEffect(() => {
    setIsButtonActive(newComment.trim().length > 0);
  }, [newComment]);

  return (
    <div className={style.container}>
      <div className={style.comment}>
        <textarea
          id="edit comment"
          placeholder="수정할 코멘트를 입력해주세요"
          className={style.textarea}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
      </div>
      <div className={style.buttonContainer}>
        <button className={style.editButton} onClick={onCancelClick}>
          취소
        </button>
        <Button status={isButtonActive} onClick={handleSaveClick}>
          수정 완료
        </Button>
      </div>
    </div>
  );
}
