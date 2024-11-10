import Link from "next/link";
import Image from "next/image";
import pandaLogo from "../../public/panda-logo.svg";
import loginButton from "../../public/login-button.svg";
import styles from "./Header.module.css";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.title}>
          <Link href="/">
            <Image
              className={styles.panda_market_img}
              src={pandaLogo}
              alt="판다 로고"
              priority
            />
          </Link>
          <div className={styles.select}>
            <p className={styles.free_board}>
              <Link
                href="/board"
                className={
                  router.pathname.startsWith("/board")
                    ? styles.active_button
                    : styles.board
                }
              >
                자유게시판
              </Link>
            </p>
            <p className={styles.second_hand}>
              <Link
                href="/used-market"
                className={
                  router.pathname.startsWith("/used-market")
                    ? styles.active_button
                    : styles.used_market
                }
              >
                중고마켓
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.login}>
          <Link href="/login">
            <Image
              className={styles.login_button}
              src={loginButton}
              alt="로그인 버튼"
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
