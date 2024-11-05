import styles from '@/styles/ArticleEdit.module.css';
import { getArticle, patchArticle } from '@/lib/api/ArticleService';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Edit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();
  const id = router.query['id'];

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await getArticle(id);
        setTitle(res.title);
        setContent(res.content);
      } catch (err) {
        console.error('게시글을 불러오는데 실패했습니다.');
      }
    };

    fetchArticle();
  }, [id]);

  const isInputEmpty = () => {
    return title.trim() !== '' && content.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isInputEmpty()) {
      return;
    }

    try {
      await patchArticle(id, { title, content });
      return router.push(`/articles/${id}`);
    } catch (err) {
      console.error('게시글 수정에 실패하였습니다.');
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
