import Image from 'next/image';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/ArticleDetail.module.css';
import { getArticle, getArticleCommentList } from '@/lib/api/ArticleService';
import ArticleCommentAdd from '@/components/ArticleDetail/ArticleCommentAdd';
import ArticleCommentList from '@/components/ArticleDetail/ArticleCommentList';
import formatDate from '@/lib/formatDate';
import ArticleDropdown from '@/components/ArticleDetail/ArticleDropdown';

export async function getServerSideProps(context) {
  try {
    const articleId = context.params['id'];

    const article = await getArticle(articleId);
    const articleComments = await getArticleCommentList(articleId);

    return {
      props: {
        article,
        articleComments
      }
    };
  } catch (err) {
    console.error('데이터를 불러오는 중 문제가 발생하였습니다.', err.message);
    throw new Error(
      '서버에서 데이터를 가져오는 중 문제가 발생했습니다.' + err.message
    );
  }
}

export default function ArticleDetail({ article, articleComments }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();

  if (!article) return <div>No article found for this ID.</div>;

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
              <p className={styles.name}>{article.writer.nickname}</p>
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
                <p>{article.likeCount}</p>
              </div>
            </div>
          </div>
        </div>
        <p>{article.content}</p>
      </div>
      <ArticleCommentAdd />
      <ArticleCommentList articleComments={articleComments.list || []} />
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
