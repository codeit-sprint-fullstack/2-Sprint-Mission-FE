import Link from 'next/link';
import styles from './BestArticleList.module.css';
import Image from 'next/image';

export default function BestArticleList({ articles }) {
  return (
    <ul className={styles.bestArticleList}>
      {articles.map((article) => (
        <li key={article.id} className={styles.bestArticleItem}>
          <div className={styles.bestArticleWrapper}>
            <div className={styles.bestArticleHeader}>
              <div className={styles.bestBadgeWrapper}>
                <Image
                  src="/images/articles/img_best_badge.png"
                  alt="베스트 아이콘"
                  fill
                  sizes="10.2rem"
                  className={styles.bestBadgeImage}
                  priority
                />
              </div>
            </div>

            <div className={styles.bestArticleContent}>
              <Link href={`/articles/${article.id}`} passHref>
                <h3 className={styles.bestArticleTitle}>{article.title}</h3>
              </Link>
              <Link href={`/articles/${article.id}`} passHref>
                <div className={styles.articleImageWrapper}>
                  <Image
                    src="/images/articles/img_default_article.png"
                    alt="기본 게시글 이미지"
                    fill
                    sizes="7.2rem"
                    className={styles.bestArticleImage}
                  />
                </div>
              </Link>
            </div>

            <div className={styles.bestArticleFooter}>
              <div className={styles.bestArticleInfo}>
                <span className={styles.nickname}>{article.nickname}</span>
                <span className={styles.likes}>
                  <span className={styles.likesIcon}>
                    <div className={styles.heartIconWrapper}>
                      <Image
                        src="/images/articles/ic_heart.svg"
                        alt="좋아요 아이콘"
                        fill
                        sizes="1.6rem"
                        className={styles.bestArticleImage}
                      />
                    </div>
                  </span>
                  {article.likes > 9999 ? '9999+' : article.likes}
                </span>
              </div>
              <span className={styles.date}>{article.formattedDate}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
