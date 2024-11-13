import { useEffect, useRef, useState } from 'react';
import styles from './ArticleForm.module.css';

export default function ArticleForm({ initialTitle = '', initialContent = '', onSubmit, isEdit = false }) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleInputRef = useRef(null);

  // 컴포넌트가 렌더링된 후 제목 input에 포커스
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({ title, content });
    } catch (error) {
      console.error(error);
      alert(`${isEdit ? '수정' : '등록'}에 실패했습니다.`);
    } finally {
      setIsSubmitting(false); // 제출 중 상태 해제
    }
  };

  // 제목과 내용이 모두 입력된 경우에만 '등록' 버튼 활성화
  const isFormValid = title.trim() !== '' && content.trim() !== '';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{isEdit ? '게시글 수정' : '게시글 쓰기'}</h2>
        <button
          type="submit"
          className={`${styles.submitBtn} ${isFormValid ? styles.active : ''}`}
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          tabIndex={3} // 탭 순서 변경
        >
          {isSubmitting ? (isEdit ? '수정' : '등록') : (isEdit ? '수정' : '등록')}
        </button>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="title">*제목</label>
        <input
          id="title"
          type="text"
          className={styles.input}
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleInputRef}
          tabIndex={1}
        />

        <label className={styles.label} htmlFor="content">*내용</label>
        <textarea
          id="content"
          className={styles.textarea}
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          tabIndex={2}
        />
      </form>
    </div>
  );
}
