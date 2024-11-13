import styles from './NotArticleReview.module.css';
import Image from 'next/image';

export default function NotArticleReview() {
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
