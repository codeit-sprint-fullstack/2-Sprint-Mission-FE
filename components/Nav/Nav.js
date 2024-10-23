import styles from '@/components/Nav/Nav.module.css';
import GnbLogoImg from '@/public/images/logo_gnb.png';
import GnbLogoImgMobile from '@/public/images/logo_gnb_m.png';
import UserProfileImg from '@/public/images/user_profile.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Nav() {
  const isLoggedIn = false; // 현재는 임시로 로그인 안 된 상태로 설정
  const router = useRouter();

  // 현재 경로에 따른 링크 스타일을 적용
  function getLinkStyle(path) {
    return {
      color: router.pathname === path ? 'var(--primary-color)' : 'var(--nav-text-color)',
    };
  }
  return (
    <div className={styles.gnbWrapper}>
      <div className={styles.gnb}>
        <div className={styles.gnbLogo}>
          <Link href="/">
            <Image 
              src={GnbLogoImg} 
              width={153}
              height={51}
              alt="Logo" 
              className={styles.gnbLogoDesktop} 
            />
            <Image 
              src={GnbLogoImgMobile} 
              width={81}
              height={40}
              alt="Logo" 
              className={styles.gnbLogoMobile} 
            />
          </Link>
        </div>
        <nav className={styles.gnbNav}>
          <ul className={styles.gnbNavList}>
            <li><Link href="/" style={getLinkStyle('/')}>자유게시판</Link></li>
            <li><Link href="/items" style={getLinkStyle('/items')}>중고마켓</Link></li>
          </ul>
        </nav>

        <div className={styles.gnbUser}>
          {!isLoggedIn ? (
            <Link href="/login" className={styles.gnbBtnLogin}>로그인</Link>
          ) : (
            <div className={styles.gnbUserInfo}>
              <Image 
                src={UserProfileImg} 
                width={40}
                height={40}
                alt="User" 
                className={styles.userProfileImg} 
              />
              <span className={styles.userName}>김코드</span>
            </div>
          )}
        </div>
      </div>
    </div>    
  );
}