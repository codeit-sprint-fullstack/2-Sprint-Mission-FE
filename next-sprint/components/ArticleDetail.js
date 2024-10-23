import { useEffect, useState } from 'react';
import styles from './ArticleDetail.module.css';
import Image from 'next/image';
import ArticleReview from './ArticleReivew';
import Link from 'next/link';
import ArticelDropdown from './ArticleDropdown';

export default function ArticleDetail({ article, id }) {
  const [articleReview, setArticleReivew] = useState(null);

  async function getArticleReview(articleId) {
    const res = await fetch(
      `http://localhost:5000/articleComments/${articleId}`
    );
    const review = await res.json();
    setArticleReivew(review);
  }

  useEffect(() => {
    getArticleReview(id);
  }, [id]);

  const formattedDate = new Date(article.createdAt)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .replace(/\s/g, '')
    .replace(/\./g, '.')
    .slice(0, -1);

  return (
    <ul className={styles.ul}>
      <li key={article.id} className={styles.li}>
        <header className={styles.header}>
          <div className={styles.title}>
            <h3>{article.title}</h3>
            <ArticelDropdown />
          </div>
          <div className={styles.user}>
            <div className={styles.userLeft}>
              <div className={styles.profile}>
                <Image fill src="/images/ic_profile.svg" alt="프로필 이미지" />
              </div>
              <h3>총명한 판다</h3>
              <h3>{formattedDate}</h3>
            </div>
            <div className={styles.bar}></div>
            <div className={styles.userRight}>
              <Image
                width={32}
                height={32}
                src="/images/ic_heart.svg"
                alt="좋아요 이미지"
              />
              <h3>9999+</h3>
            </div>
          </div>
        </header>
        <main className={styles.main}>
          <h4 className={styles.content}>{article.content}</h4>
          <form className={styles.form}>
            <h4>댓글 달기</h4>
            <textarea placeholder="댓글을 입력해주세요."></textarea>
            <button type="submit">등록</button>
          </form>
        </main>
        <footer className={styles.footer}>
          <ArticleReview reviews={articleReview} />
          <Link href="/" className={styles.link}>
            <button>
              목록으로 돌아가기
              <Image
                width={24}
                height={24}
                alt="버튼 이미지"
                src="/images/ic_back.svg"
              />
            </button>
          </Link>
        </footer>
      </li>
    </ul>
  );
}