import logo from "@/public/panda.png";
import style from "./styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import defaultImage from "@/public/ic_profile.png";

export default function Header() {
  const { user, isPending } = useAuth();
  const router = useRouter();
  const currentPath = router.pathname;

  const isItemsPage = currentPath === "/items";
  const isArticlePage = currentPath === "/articles";

  console.log('User: ', user);

  return (
    <div className={style.header}>
      <div className={style.nav}>
        <div className={style.logoTitle}>
          <Link className={style.link} href="/">
            <Image className={style.logo} src={logo} alt="panda icon" />
          </Link>
          <Link className={style.link} href="/">
            <h1 className={style.title}>판다마켓</h1>
          </Link>
          <Link
            className={`${style.page} ${isArticlePage ? style.active : ""}`}
            href="/articles"
          >
            자유게시판
          </Link>
          <Link
            className={`${style.page} ${isItemsPage ? style.active : ""}`}
            href="/items"
          >
            중고마켓
          </Link>
        </div>

        {!isPending && user ? (
          <div className={style.userProfile}>
            <Image className={style.userImage} alt="user image" src={user.image ? user.image : defaultImage}></Image>
            <span className={style.username}>{user.nickname}</span>
          </div>
        ) : (
          <Link className={style.link} href="/login">
            <button className={style.login}>로그인</button>
          </Link>
        )}
      </div>
    </div>
  );
}
