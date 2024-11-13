import styles from './Auth.module.css';
import Image from 'next/image';

export default function SocialLogin() {
  return (
    <div className={styles.socialLogin}>
      <p>간편 로그인하기</p>
      <div className={styles.socialIcons}>
        <a href="https://www.google.com/">
          <div className={styles.iconWrapper}>
            <Image
              src="/images/auth/ic_google.png"
              alt="Google 로그인"
              fill
              style={{ objectFit: 'contain' }}
              sizes='2.4rem'
            />
          </div>
        </a>
        <a href="https://www.kakaocorp.com/page/">
          <div className={styles.iconWrapper}>
            <Image
              src="/images/auth/ic_kakaotalk.png"
              alt="Kakaotalk 로그인"
              fill
              style={{ objectFit: 'contain' }}
              sizes='2.4rem'
            />
          </div>
        </a>
      </div>
    </div>
  );
}
