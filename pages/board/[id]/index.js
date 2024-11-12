import formatDate from '@/lib/formatDate';
import Image from 'next/image';
import styles from '@/styles/article.module.css';
import axios from '@/lib/axios';
import CommentList from '@/components/CommentList';
import createButton from '@/components/Button';
import { useState } from 'react';
import Link from 'next/link';
import KebabMenu from '@/components/KebabMenu';
import { useRouter } from 'next/router';

const RegisterButton = createButton({
  style: 'btn_small_40',
});
const BackButton = createButton({
  style: 'btn_medium',
});

export async function getServerSideProps(context) {
  const articleId = context.params['id'];

  const resArticle = await axios.get(`/articles/${articleId}`);
  const article = resArticle.data;

  const resComments = await axios.get(`/articles/${articleId}/comments`);
  const comments = resComments.data;

  return {
    props: {
      article,
      comments,
    },
  };
}

export default function Article({ article, comments: initialComments }) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = { content: content };
    try {
      const res = await axios.post(`/articles/${article.id}/comments`, data);
      const newContent = res.data;
      setComments((prev) => [...prev, newContent]);
			setContent('');
    } catch {
      alert('댓글 등록에 실패했습니다.');
    }
  }

  async function handleDelete(e) {
    try {
      const res = await axios.delete(`/articles/${article.id}`);
      const prevArticle = res.data;
      router.push('/board');
    } catch {
      alert('삭제에 실패했습니다.');
    }
  }

  return (
    <div className={styles.article}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <div className={styles.head_title}>
            <p className={styles.title}>{article.title}</p>
            <KebabMenu
              onEditClick={() => router.push(`${router.asPath}/edit`)}
              onDeleteClick={handleDelete}
            />
          </div>
          <div className={styles.head_info}>
            <div className={styles.head_profile}>
              <Image
                width={40}
                height={40}
                src="/ic_profile.png"
                alt="profile"
              />
              <p>똑똑한판다</p>
              <p>{formatDate(new Date(article.createdAt))}</p>
            </div>
            <div className={styles.head_favorites}>
              <Image width={32} height={32} src="/ic_heart.png" alt="heart" />
              <p>{article.favorites}</p>
            </div>
          </div>
          <p className={styles.articleContent}>{article.content}</p>
        </div>
        <form className={styles.commentForm} onSubmit={handleSubmit}>
          <p className={styles.commentTitle}>댓글달기</p>
          <input
            className={styles.commentInput}
            type="text"
            name="content"
            placeholder="댓글을 입력해주세요."
            onChange={(e) => setContent(e.target.value)}
          />
          <div className={styles.registerButton}>
            <RegisterButton type="submit" disabled={!content}>
              등록
            </RegisterButton>
          </div>
        </form>
        <CommentList comments={comments} />
      </div>
      <Link href={'/board'}>
        <BackButton>
          <div className={styles.buttonContent}>
            <p>목록으로 돌아가기</p>
            <Image width={24} height={24} src="/ic_back.png" alt="back" />
          </div>
        </BackButton>
      </Link>
    </div>
  );
}
