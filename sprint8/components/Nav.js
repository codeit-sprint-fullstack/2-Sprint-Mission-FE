import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import style from '@/styles/Nav.module.css';
import logo from '@/public/assets/pndamarket_logo.png';

export default function Nav() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <>
      <div className={style.container}>
        <div className={style.logoMenu}>
          <Image src={logo} className={style.logo} alt="pandamarket logo" />
          <div className={style.menus}>
            <Link
              href="/free-board"
              className={`${style.menu} ${
                pathname === '/free-board' ? style.active : ''
              }`}
            >
              자유게시판
            </Link>
            <Link
              href="/market"
              className={`${style.menu} ${
                pathname === '/market' ? style.active : ''
              }`}
            >
              중고마켓
            </Link>
          </div>
        </div>
        <button className={style.login}>로그인</button>
      </div>
    </>
  );
}
