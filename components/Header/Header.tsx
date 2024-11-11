import Link from "next/link";
import Image from "next/image";
import pandaLogo from "../../public/panda-logo.svg";
import profile from "../../public/ic_profile.svg";
import loginButton from "../../public/login-button.svg";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserInfo, postLogIn } from "@/api/axios";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{
    id: Number;
    nickname: string;
  } | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      fetchUserInfo(accessToken);
    }
  }, [router]);

  const fetchUserInfo = async (token: string) => {
    try {
      const data = await getUserInfo(token);
      setUserInfo(data);
    } catch (error) {
      console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
      setIsLoggedIn(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const token = await postLogIn({ email, password });
      if (token) {
        localStorage.setItem("accessToken", token);
        setIsLoggedIn(true);
        fetchUserInfo(token);
      }
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };

  console.log(userInfo);

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
          {isLoggedIn ? (
            <div className={styles.profile}>
              <Image
                className={styles.profile_icon}
                src={profile}
                alt="프로필"
              />
              <p className={styles.nickname}>{userInfo?.nickname}</p>
            </div>
          ) : (
            <Link href="/login">
              <Image
                className={styles.login_button}
                src={loginButton}
                alt="로그인 버튼"
                priority
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
