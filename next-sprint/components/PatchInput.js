import { useState, useEffect } from 'react';
import styles from './RegisterInput.module.css';
import { useRouter } from 'next/router';
import { instance } from '@/lib/api';

export default function PatchInput() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const router = useRouter();
  const id = router.query['id'];

  useEffect(() => {
    async function getArticle(articleId) {
      try {
        const res = await instance.get(`/articles/${articleId}`);
        const article = await res.data;
        setTitleValue(article.title);
        setContentValue(article.content);
      } catch (error) {
        if (error.response) {
          console.error(error.response.status, error.response.data);
        } else {
          console.error(error.message);
        }
      }
    }

    getArticle(id);
  }, [id]);

  async function patchArticle(articleId) {
    if (!articleId) return;
    try {
      const res = await instance.patch(`/articles/${articleId}`, {
        title: titleValue,
        content: contentValue
      });

      if (res.status === 201 || res.status === 200) {
        const article = await res.data;
        router.push(`/articles/${article.id}`);
      } else {
        console.log('게시글 수정 실패', res.status);
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(error.message);
      }
    }
  }

  function handleTitleChange(e) {
    const newValue = e.target.value;
    setTitleValue(newValue);
  }

  function handleContentChange(e) {
    const newValue = e.target.value;
    setContentValue(newValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!titleValue || !contentValue) {
      return;
    }

    patchArticle(id);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header className={styles.header}>
        <h2>게시글 수정</h2>
        <button
          type="submit"
          disabled={!(titleValue && contentValue)}
          className={
            titleValue && contentValue ? styles.btnAction : styles.btnDisabled
          }
        >
          수정
        </button>
      </header>
      <section className={styles.section}>
        <h2>제목</h2>
        <input
          name="title"
          value={titleValue}
          placeholder="제목을 입력해주세요"
          onChange={handleTitleChange}
        />
      </section>
      <footer className={styles.footer}>
        <h2>내용</h2>
        <textarea
          name="content"
          value={contentValue}
          placeholder="내용을 입력해주세요"
          onChange={handleContentChange}
        ></textarea>
      </footer>
    </form>
  );
}
