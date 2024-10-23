import ArticelDropdown from './ArticleDropdown';
import styles from './ArticleReview.module.css';
import Image from 'next/image';

export default function ArticleReview({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.noneSection}>
        <Image
          width={140}
          height={140}
          src="/images/Img_reply_empty.svg"
          alt="빈 이미지"
        />
        <span>
          아직 댓글이 없어요.
          <br />
          지금 댓글을 달아보세요.
        </span>
      </div>
    );
  }

  return (
    <ul className={styles.ul}>
      {reviews.map((review) => {
        const formattedDate = new Date(review.createdAt)
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
          .replace(/\s/g, '')
          .replace(/\./g, '.')
          .slice(0, -1);

        return (
          <li key={review.id} className={styles.li}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.content}>{review.content}</h3>
              <ArticelDropdown />
            </div>
            <div className={styles.sectionFooter}>
              <div className={styles.profile}>
                <Image fill src="/images/ic_profile.svg" alt="프로필 이미지" />
              </div>
              <div className={styles.userTxt}>
                <h3>총명한 판다</h3>
                <h3>{formattedDate}</h3>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
