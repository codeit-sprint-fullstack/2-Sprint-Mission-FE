import Link from 'next/link';
import styles from './GNB.module.css';
import createButton from './Button';
import { useRouter } from 'next/router';

const LoginButton = createButton({
  style: 'btn_small_40',
});

export default function GNB() {
	const router = useRouter();
	const isBoard = router.pathname.startsWith('/board');
	const isItems = router.pathname.startsWith('/items');

  return (
    <header className={styles.header}>
      <div className={styles.GNBcontents}>
        <div className={styles.GNBLeft}>
          <Link href="/">
            <div className={styles.logoImg}>
              <img className={styles.logo1} src="/logo_1.png" alt="logo" />
              <img className={styles.logo2} src="/logo_2.png" alt="logo" />
            </div>
          </Link>
          <div className={styles.menu}>
            <Link href="/board" className={`${styles.linkStyle} ${isBoard ? styles.isActive : ''}`}>
              <p>자유게시판</p>
            </Link>
            <Link href="/items" className={`${styles.linkStyle} ${isItems ? styles.isActive : ''}`}>
              <p>중고마켓</p>
            </Link>
          </div>
        </div>
        <div className={styles.GNBRight}>
          <LoginButton>로그인</LoginButton>
        </div>
      </div>
    </header>
  );
}
