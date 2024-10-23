import { useState } from 'react';
import styles from './RegisterInput.module.css';
import { useRouter } from 'next/router';

export default function RegisterInput() {
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  const router = useRouter();

  async function createArticle() {
    try {
      const res = await fetch('http://localhost:5000/articles', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          title: titleValue,
          content: contentValue
        })
      });

      if (res.ok) {
        const article = await res.json();
        router.push(`/articles/${article.id}`);
      } else {
        console.log('게시글 생성 실패', res.status);
      }
    } catch (e) {
      console.log('게시글 생성 중 오류 발생', e);
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

    createArticle();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <header className={styles.header}>
        <h2>게시글 쓰기</h2>
        <button
          type="submit"
          disabled={!(titleValue && contentValue)}
          className={
            titleValue && contentValue ? styles.btnAction : styles.btnDisabled
          }
        >
          등록
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
