import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './WritePage.module.css';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 서버로 데이터를 보내는 로직을 추가하세요.
    console.log({ title, content });
    
    // 게시글이 등록되면 목록 페이지로 이동
    router.push('/articles');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>게시글 쓰기</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="title">*제목</label>
        <input
          id="title"
          type="text"
          className={styles.input}
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className={styles.label} htmlFor="content">*내용</label>
        <textarea
          id="content"
          className={styles.textarea}
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" className={styles.submitBtn}>등록</button>
      </form>
    </div>
  );
}
