import Image from 'next/image';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Article.module.css';
import { getArticle, getArticleCommentList } from '@/lib/api/ArticleService';
import ArticleCommentAdd from '@/components/ArticleDetail/ArticleCommentAdd';
import ArticleCommentList from '@/components/ArticleDetail/ArticleCommentList';
import formatDate from '@/lib/formatDate';
import ArticleDropdown from '@/components/ArticleDetail/ArticleDropdown';

export async function getServerSideProps(context) {
  const articleId = context.params['id'];

  const article = await getArticle(articleId);
  const articleComments = await getArticleCommentList(articleId);

  return {
    props: {
      article,
      articleComments
    }
  };
}

export default function Article({ article, articleComments }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();

  if (!article) return null;

  const handleBackList = () => router.push('/');
  const handleMenuClick = () => setDropdownOpen((prev) => !prev);

  return (
    <div className={styles.wrapper}>
      <div className={styles.article}>
        <div className={styles[`article-header`]}>
          <div className={styles[`article-title`]}>
            <h1>{article.title}</h1>
            <div className={styles.menu}>
              <Image
                src="/images/ic_kebab.png"
                width={24}
                height={24}
                onClick={() => handleMenuClick(!dropdownOpen)}
                alt="메뉴 아이콘"
              />
              {dropdownOpen && (
                <div ref={dropdownRef} className={styles.dropdown}>
                  <ArticleDropdown />
                </div>
              )}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles[`user-info`]}>
              <Image
                className={styles.image}
                src="/images/size=large.png"
                width={40}
                height={40}
                alt="유저 아이콘"
              />
              <p className={styles.name}>판매왕 판다</p>
              <p className={styles.date}>{formatDate(article.createdAt)}</p>
            </div>
            <div className={styles[`like-wrap`]}>
              <div className={styles.like}>
                <Image
                  src="/images/ic_heart.png"
                  width={32}
                  height={32}
                  alt="좋아요 아이콘"
                />
                <p>+9999</p>
              </div>
            </div>
          </div>
        </div>
        <p>{article.content}</p>
      </div>
      <ArticleCommentAdd />
      <ArticleCommentList articleComments={articleComments} />
      <button className={styles[`back-list`]} onClick={handleBackList}>
        목록으로 돌아가기
        <Image
          src="/images/ic_back.png"
          width={24}
          height={24}
          alt="목록 아이콘"
        />
      </button>
    </div>
  );
}
