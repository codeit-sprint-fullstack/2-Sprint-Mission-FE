import styles from '@/styles/ArticleRegister.module.css';
import axios from '@/lib/axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const isInputEmpty = () => {
    return title.trim() !== '' && content.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isInputEmpty()) {
      return;
    }

    try {
      const res = await axios.post('/articles', { title, content });
      const articleId = res.data.id;
      return router.push(`/articles/${articleId}`);
    } catch (err) {
      console.log('게시글 등록에 실패하였습니다.');
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles[`form-header`]}>
          <h1>게시글 쓰기</h1>
          <button type="submit" disabled={!isInputEmpty()}>
            등록
          </button>
        </div>
        <div className={styles.group}>
          <label htmlFor="title">* 제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div className={styles.group}>
          <label htmlFor="content">* 내용</label>
          <textarea
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용 입력해주세요"
          />
        </div>
      </form>
    </div>
  );
}
