import axios from '@/lib/axios';
import { useState } from 'react';
import styles from '@/styles/newArticle.module.css';
import createButton from '@/components/Button';
import { useRouter } from 'next/router';

const SubmitButton = createButton({
  style: 'btn_small_40',
});

export async function getServerSideProps(content) {
  const articleId = content.params['id'];

  const res = await axios.get(`/articles/${articleId}`);
  const article = res.data;

  return {
    props: {
      article,
    },
  };
}

export default function EditArticle({ article }) {
	const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title,
      content,
    };
    const res = await axios.patch(`/articles/${article.id}`, data);
    const newArticle = res.data;

    if (newArticle) {
      router.push(`/board/${article.id}`);
    } else {
      console.log('게시글을 생성하지 못했습니다!');
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.header}>
          <p className={styles.title}>게시글 쓰기</p>
          <SubmitButton
            type="submit"
            onClick={handleSubmit}
            disabled={!title || !content}
          >
            등록
          </SubmitButton>
        </div>

        <div className={styles.inputs}>
          <div className={styles.input}>
            <p className={styles.inputName}>*제목</p>
            <input
              className={styles.titleInput}
              name="title"
              type="text"
							value={title}
              placeholder="제목을 입력해주세요"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.input}>
            <p className={styles.inputName}>*내용</p>
            <input
              className={styles.contentInput}
              name="content"
              type="text"
							value={content}
              placeholder="내용을 입력해주세요"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
