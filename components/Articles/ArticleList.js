import styles from './ArticleList.module.css';
import Image from 'next/image';

export default function ArticleList({ articles }) {
  return (
    <ul className={styles.articleList}>
      {articles.map((article) => (
        <li key={article.id} className={styles.articleItem}>
          <div className={styles.articleWrapper}>
            {/* 제목과 이미지 양 끝 정렬 */}
            <div className={styles.articleTop}>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <div className={styles.articleImageWrapper}>
                <Image
                  src={article.imageUrl}
                  alt="게시글 이미지"
                  fill
                  sizes="8rem"
                  className={styles.articleImage}
                />
              </div>
            </div>

            {/* 닉네임, 날짜와 좋아요 정보 양 끝 정렬 */}
            <div className={styles.articleBottom}>
              <div className={styles.articleInfo}>
                {/* 프로필 이미지와 닉네임 */}
                <div className={styles.nicknameWrapper}>
                  <div className={styles.profileIcon}>
                  <Image
                    src="/images/user_profile.png"
                    alt="프로필 이미지"
                    fill
                    sizes="2.4rem"
                  />
                  </div>
                  <span className={styles.nickname}>{article.nickname}</span>
                </div>
                <span className={styles.date}>{article.formattedDate}</span>
              </div>
              <div className={styles.likes}>
                <div className={styles.likesIcon}>
                  <Image
                    src="/images/articles/ic_heart.png"
                    alt="좋아요 아이콘"
                    fill
                    sizes="2.4rem"
                  />
                </div>
                {article.likes > 9999 ? '9999+' : article.likes}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
