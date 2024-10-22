import style from '@/styles/AddComment.module.css';
import Button from '@/components/Button.js';

export default function AddComment() {
  return (
    <div className={style.container}>
      <a className={style.title}>댓글 달기</a>
      <div className={style.comment}>
        <textarea
          id="comment"
          placeholder="코멘트를 입력해주세요"
          className={style.textarea}
        />
      </div>
      <Button className={style.button}>작성</Button>
    </div>
  );
}
