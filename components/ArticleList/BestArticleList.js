import styles from './BestArticleList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import formatDate from '@/lib/formatDate';

export default function BestArticleList({ bestArticles = [], bestPageSize }) {
  return (
    <div className={styles.wrapper}>
      <h1>베스트 게시글</h1>
      <ul className={styles[`best-articles`]}>
        {bestArticles.slice(0, bestPageSize).map((article) => (
          <li className={styles.container} key={article.id}>
            <Image
              src="/images/img_badge.png"
              width={102}
              height={30}
              alt="베스트 게시글 로고"
            />
            <Link href={`/articles/${article.id}`}>
              <div className={styles.title}>
                <h1>{article.title}</h1>
                <div className={styles.image}>
                  <Image
                    src={article.image || '/images/Property 1=md-1.png'}
                    width={48}
                    height={48}
                    alt="상품 이미지(디폴트)"
                  />
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles[`user-info`]}>
                  <p>판매왕 판다</p>
                  <div className={styles.like}>
                    <Image
                      src="/images/ic_heart.png"
                      width={16}
                      height={16}
                      alt="좋아요"
                    />
                    <p>+9999</p>
                  </div>
                </div>
                <p>{formatDate(article.createdAt)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
