import Image from 'next/image';
import styles from './BackButton.module.css';

export default function BackButton({ onClick }) {
  return (
    <div className={styles.backButtonContainer}>
      <button className={styles.backButton} onClick={onClick}>
        목록으로 돌아가기
        <span className={styles.iconBack}>
          <Image
            src="/images/articles/ic_back.svg"
            alt="뒤로 가기 아이콘"
            fill
          />
        </span>
      </button>
    </div>
  );
}
