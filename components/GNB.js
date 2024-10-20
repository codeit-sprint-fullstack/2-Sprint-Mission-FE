import Link from 'next/link';
import styles from './GNB.module.css';
import Image from 'next/image';
import createButton from './Button';

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? '#3692FF' : '',
  };
}

const LoginButton = createButton({
  style: 'btn_small_40',
});

export default function GNB() {
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
            <Link
              href="/board"
              className={styles.navLinkStyle}
              style={{ getLinkStyle }}
            >
              <p>자유게시판</p>
            </Link>
            <Link
              href="/items"
              className={styles.navLinkStyle}
              style={{ getLinkStyle }}
            >
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
