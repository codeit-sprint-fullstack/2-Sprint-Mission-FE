import createButton from '@/components/Button';
import styles from '@/styles/newArticle.module.css';
import axios from '@/lib/axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SubmitButton = createButton({
  style: 'btn_small_40',
});

export default function NewArticle() {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	async function handleSubmit(e) {
    e.preventDefault();
    const data = {
			title,
			content,
    };
    const res = await axios.post('/articles/', data);
    const newArticle = res.data;
		
		if (newArticle) {
			router.push(`/board/${newArticle.id}`)
		} else {
			alert('게시글을 생성하지 못했습니다!')
		}
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.header}>
          <p className={styles.title}>게시글 쓰기</p>
          <SubmitButton type='submit' onClick={handleSubmit} disabled={!title || !content}>등록</SubmitButton>
        </div>

        <div className={styles.inputs}>
          <div className={styles.input}>
            <p className={styles.inputName}>*제목</p>
            <input
              className={styles.titleInput}
							name='title'
              type="text"
              placeholder="제목을 입력해주세요"
							onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.input}>
            <p className={styles.inputName}>*내용</p>
            <input
              className={styles.contentInput}
							name='content'
              type="text"
              placeholder="내용을 입력해주세요"
							onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
