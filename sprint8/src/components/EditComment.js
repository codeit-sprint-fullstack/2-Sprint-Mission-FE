import style from '@/src/styles/EditComment.module.css';
import Button from '@/src/components/Button.js';
import { useState, useEffect } from 'react';

export default function EditComment({ comment, onCancelClick, onEditClick }) {
  const [newComment, setNewComment] = useState(comment);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleSaveClick = () => {
    onEditClick(newComment);
  };

  useEffect(() => {
    setIsButtonActive(newComment.length > 0);
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
