import Image from 'next/image';
import styles from './BestArticle.module.css';
import formatDate from '@/lib/formatDate';

export default function BestArticle({ article }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.badge}>
        <Image width={16} height={16} src="/ic_medal.png" alt="medal" />
        <p>Best</p>
      </div>
      <div className={styles.titles}>
        <p className={styles.title}>{article.title}</p>
        <Image borderRadius={10} width={72} height={72} src="/no_image.png" alt="no image" />
      </div>
      <div className={styles.articleInfo}>
        <div className={styles.names}>
          <p>똑똑한판다</p>
          <Image width={16} height={16} src="/ic_heart.png" alt="heart" />
          <p>{article.favorites}</p>
        </div>
        <p className={styles.date}>{formatDate(new Date(article.createdAt))}</p>
      </div>
    </div>
  );
}
