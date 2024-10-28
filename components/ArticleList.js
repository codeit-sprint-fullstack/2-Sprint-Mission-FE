import Image from 'next/image';
import styles from './ArticleList.module.css';
import formatDate from '@/lib/formatDate';
import Link from 'next/link';

export default function ArticleList({ article }) {
  return (
    <Link href={`/board/${article.id}`} className={styles.linkStyle}>
      <div className={styles.wrapper}>
        <div className={styles.mains}>
          <p className={styles.title}>{article.title}</p>
          <Image width={72} height={72} src="/no_image.png" alt="no image" />
        </div>
        <div className={styles.subs}>
          <div className={styles.names}>
            <Image width={24} height={24} src="/ic_profile.png" alt="profile" />
            <p>똑똑한판다</p>
            <p>{formatDate(new Date(article.createdAt))}</p>
          </div>
          <div className={styles.favorites}>
            <Image width={24} height={24} src="/ic_heart.png" alt="heart" />
            <p>{article.favorites}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
