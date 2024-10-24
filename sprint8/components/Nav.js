import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import style from '@/styles/Nav.module.css';
import logo from '@/public/assets/pndamarket_logo.png';

export default function Nav() {
  function menuActiveStyle(location) {
    const pathname = usePathname();
    return pathname && pathname.startsWith(location) ? style.active : '';
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.logoMenu}>
          <Image
            priority={true}
            src={logo}
            className={style.logo}
            alt="pandamarket logo"
          />
          <div className={style.menus}>
            <Link
              href="/free-board"
              className={`${style.menu} ${menuActiveStyle('/free-board')}`}
            >
              자유게시판
            </Link>
            <Link
              href="/market"
              className={`${style.menu} ${menuActiveStyle('/market')}`}
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
