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
            <div className={styles.gnbLogoDesktop}>
              <Image
                src={GnbLogoImg}
                alt="Logo"
                fill
                sizes = "15.3rem"
                className={styles.logoImage}
                priority 
              />
            </div>
            <div className={styles.gnbLogoMobile}>
              <Image
                src={GnbLogoImgMobile}
                alt="Logo"
                fill
                sizes = "8.1rem"
                className={styles.logoImage}
              />
            </div>
          </Link>
        </div>
        
        <nav className={styles.gnbNav}>
          <ul className={styles.gnbNavList}>
            <li><Link href="/articles" style={getLinkStyle('/articles')}>자유게시판</Link></li>
            <li><Link href="/items" style={getLinkStyle('/items')}>중고마켓</Link></li>
          </ul>
        </nav>

        <div className={styles.gnbUser}>
          {!isLoggedIn ? (
            <Link href="/login" className={styles.gnbBtnLogin}>로그인</Link>
          ) : (
            <div className={styles.gnbUserInfo}>
              <div className={styles.userProfileImg}>
                <Image 
                  src={UserProfileImg} 
                  alt="User"
                  fill 
                  sizes="4rem"
                  className={styles.profileImg} 
                />
              </div>
              <span className={styles.userName}>김코드</span>
            </div>
          )}
        </div>
      </div>
    </div>    
  );
}