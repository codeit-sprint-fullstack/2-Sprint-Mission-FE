import { useState } from 'react';
import styles from './ArticleDetail.module.css';
import Image from 'next/image';
import ArticleReview from './ArticleReview';
import Link from 'next/link';
import ArticelDropdown from './ArticleDropdown';

export default function ArticleDetail({ article, id }) {
  const [articleReview, setArticleReview] = useState([]);
  const [value, setValue] = useState('');

  async function postArticleReview() {
    const res = await fetch(`http://localhost:5000/articleComments`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        content: value,
        articleId: id
      })
    });

    if (res.ok) {
      const newReview = await res.json();
      setArticleReview((prevReviews) => [...prevReviews, newReview]);
      setValue('');
    } else {
      console.error('Failed to post review:', await res.text());
    }
  }

  const formattedDate = new Date(article.createdAt)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .replace(/\s/g, '')
    .replace(/\./g, '.')
    .slice(0, -1);

  function handleChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!value) return;

    postArticleReview();
  }

  return (
    <ul className={styles.ul}>
      <li key={article.id} className={styles.li}>
        <header className={styles.header}>
          <div className={styles.title}>
            <h3>{article.title}</h3>
            <ArticelDropdown articleId={article.id} />
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <h4>댓글 달기</h4>
            <textarea
              name="content"
              value={value}
              onChange={handleChange}
              placeholder="댓글을 입력해주세요."
            ></textarea>
            <button
              className={value ? styles.btnAction : styles.btnDisabled}
              disabled={!value}
              type="submit"
            >
              등록
            </button>
          </form>
        </main>
        <footer className={styles.footer}>
          <ArticleReview reviews={articleReview} articleId={id} />
          <Link href="/" className={styles.link}>
            <button className={styles.returnBtn}>
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
