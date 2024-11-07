import styles from './ErrorMessage.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function ErrorMessage({ message }) {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/images/Property 1=sm@3x-1.png"
        width={300}
        height={300}
        alt="에러 이미지"
      />
      <div className={styles.content}>
        <span>{message}</span>
        <button className={styles[`back-list`]}>
          <Link href="/">홈으로 돌아가기</Link>
          <Image
            src="/images/ic_back.png"
            width={24}
            height={24}
            alt="목록 아이콘"
          />
        </button>
      </div>
    </div>
  );
}
