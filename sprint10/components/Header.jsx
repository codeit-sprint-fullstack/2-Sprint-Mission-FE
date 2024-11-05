import { Link, Link } from "react-router-dom";
import styles from '@/styles/CommonsPage.module.css';
import { useViewport } from "@/context/ViewportProvider.jsx";
import { useUser } from "@/context/UserProvider.jsx";

function getLinkStyle({ isActive }) {
	return {
		color: isActive ? "#3692FF" : "black",
		textDecoration: isActive ? "underline" : "none"
	};
}

function Header() {
	const viewport = useViewport();
	const user = useUser();

  return (<header className={styles.header}>
		<div className={styles.sub}>
			<div className={styles.sub_header}>
				<Link href="/"><img className={styles.logo} src={viewport === "phone" ? "/images/logo-text-only.png" : "/images/Property-1=lg.png"} alt="판다마켓 Logo"/></Link>
				<nav>
					<ul>
						<li><Link href="/boards" style={getLinkStyle}>자유게시판</Link></li>
						<li><Link href="/items" style={getLinkStyle}>중고마켓</Link></li>
					</ul>
				</nav>
			</div>
			{user ? <Link href="/profile"><div className={styles.userInfo}><img src={user?.user?.image ? user.user.image : "/images/ic_unknown.png"} alt="Profile" /> {user?.user?.nickname}</div></Link> : <Link href="/login" className={styles.a_button}>로그인</Link>}
		</div>
	</header>);
}

export default Header;
