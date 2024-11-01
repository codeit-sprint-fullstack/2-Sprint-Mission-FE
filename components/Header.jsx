import logoImg from "../images/icon/pandalogo.svg";
import userIcon from "../images/etc/userIcon.svg";
import styles from "../components/css/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthProvider";

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src={logoImg} alt="판다마켓 로고" />
            </Link>
          </div>
          <div className={styles.board}>
            <span id="free-board">
              <Link href="/board">자유게시판</Link>
            </span>
            <span id="used-market">
              <Link href="/used-market">중고마켓 </Link>
            </span>
          </div>
          <div className={styles.user}>
            {user ? (
              <>
                <div className={styles.user_inform}>
                  <Image src={userIcon} alt="유저 이미지" />
                  <span>{user.nickname}님</span>
                </div>
                <button onClick={handleLogout} className={styles.sign_btn}>
                  로그아웃
                </button>
              </>
            ) : (
              <Link href="/signin">
                <button className={styles.sign_btn}>로그인</button>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
