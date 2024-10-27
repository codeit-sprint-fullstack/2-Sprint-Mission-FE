import style from '@/src/styles/AddComment.module.css';
import Button from '@/src/components/Button.js';
import { useState, useEffect } from 'react';
import { postComment } from '../api/commentServices';

export default function AddComment({ id, onNewComment }) {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [comment, setComment] = useState('');

  async function createComment(id, data) {
    if (!comment) return;
    const res = await postComment(id, data);
    onNewComment(res);
    setComment('');
  }

  //TODO: 없애기
  const sendComment = (e) => {
    e.preventDefault();
    createComment(id, { content: comment });
  };

  useEffect(() => {
    setIsButtonActive(!!comment);
  }, [comment]);

  return (
    <div className={style.container}>
      <a className={style.title}>댓글 달기</a>
      <div className={style.comment}>
        <textarea
          id="comment"
          placeholder="코멘트를 입력해주세요"
          className={style.textarea}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className={style.buttonContainer}>
        <Button status={isButtonActive} onClick={sendComment}>
          작성
        </Button>
      </div>
    </div>
  );
}
