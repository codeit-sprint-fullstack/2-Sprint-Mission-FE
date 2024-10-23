import styles from './ArticleCommentAdd.module.css';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ArticleCommentAdd() {
  const [content, setContent] = useState('');

  const router = useRouter();
  const id = router.query['id'];

  const isInputEmpty = () => {
    return content.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isInputEmpty()) {
      return;
    }

    try {
      await axios.post(`/articles/${id}/comments`, { content });
      window.location.reload();
    } catch (err) {
      console.log('댓글 등록에 실패하였습니다.');
    }
  };
  return (
    <div>
      <form className={styles.comment} onSubmit={handleSubmit}>
        <label htmlFor="content">댓글달기</label>
        <textarea
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력해주세요."
        />
        <button type="submit" disabled={!isInputEmpty()}>
          등록
        </button>
      </form>
    </div>
  );
}
