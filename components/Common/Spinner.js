import Image from 'next/image';
import spinnerImg from '@/public/images/spinner.svg';
import styles from './Spinner.module.css';

export default function Spinner({ className = styles.loading }) {
  return (
    <div className={styles.spinnerContainer}>
      <Image
        className={`${styles.spinner} ${className}`}
        src={spinnerImg}
        alt="로딩 중"
        fill
      />
    </div>
  );
}
