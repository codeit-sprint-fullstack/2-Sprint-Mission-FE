import Image from 'next/image';
import styles from './ArticleList.module.css';
import Link from 'next/link';
import formatDate from '@/lib/formatDate';

export default function ArticleList({ articles }) {
  return (
    <ul className={styles.ul}>
      {articles.map((article) => {
        const formattedDate = formatDate(article.createdAt);

        return (
          <li key={article.id} className={styles.article}>
            <Link className={styles.link} href={`/articles/${article.id}`}>
              <div className={styles.title}>
                <h3>{article.title}</h3>
                <div className={styles.sample}>
                  <Image
                    width={48}
                    height={44.57}
                    src="/images/sample_img.svg"
                    alt="샘플 이미지"
                  />
                </div>
              </div>
              <div className={styles.user}>
                <div className={styles.profile}>
                  <Image
                    fill
                    src="/images/ic_profile.svg"
                    alt="프로필 이미지"
                  />
                </div>
                <h3>총명한 판다</h3>
                <h3>{formattedDate}</h3>
                <div className={styles.heart}>
                  <Image fill src="/images/ic_heart.svg" alt="좋아요 이미지" />
                </div>
                <h3>9999+</h3>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
