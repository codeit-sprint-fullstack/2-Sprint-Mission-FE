import styles from './Nav.module.css';
import Image from 'next/image';
import nav_panda from '@/public/nav_panda.svg';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className="navPanda">
        <Image src={nav_panda} alt="navPanda" />
      </div>
      <div className={styles.menu}>
        <h3>자유게시판</h3>
        <h3>중고마켓</h3>
      </div>
      <button type="submit" className={styles.login}>
        로그인
      </button>
    </nav>
  );
}
