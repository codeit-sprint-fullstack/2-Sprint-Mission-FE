import styles from './ArticleInfo.module.css';
import Image from 'next/image';

export default function ArticleInfo({ article }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{article.title}</h1>
      
      <div className={styles.articleInfo}>
        <div className={styles.writerInfo}>
          <div className={styles.nicknameWrapper}>
            <div className={styles.profileIcon}>
              <Image
                src="/images/user_profile.png"
                alt="프로필 이미지"
                fill
                sizes="4rem"
                className={styles.profileImage}
              />
            </div>
            <span className={styles.nickname}>{article.author || '익명'}</span>
            <span className={styles.date}>{article.formattedDate}</span>
          </div>

        </div>

        <div className={styles.likesWrapper}>
          <div className={styles.likesIcon}>
            <Image
              src="/images/articles/ic_heart.svg"
              alt="좋아요 아이콘"
              fill
              sizes="3.2rem"
              className={styles.heartImage}
            />
          </div>
          <span className={styles.likesCount}>{article.likes > 9999 ? '9999+' : article.likes}</span>
        </div>
      </div>
      
      <div className={styles.content}>{article.content}</div>
    </div>
  );
}
