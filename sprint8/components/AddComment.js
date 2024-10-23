import style from '@/styles/AddComment.module.css';
import Button from '@/components/Button.js';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios.js';

export default function AddComment({ id, onNewComment }) {
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [comment, setComment] = useState('');

  async function postComment(data) {
    try {
      if (comment) {
        const res = await axios.post(`/articles/${id}/comments`, data);
        onNewComment(res.data);
        setComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  }

  const sendComment = (e) => {
    e.preventDefault();
    postComment({ content: comment });
  };

  useEffect(() => {
    setIsButtonActive(comment.trim().length > 0);
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
