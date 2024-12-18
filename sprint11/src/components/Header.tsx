import styles from '@/styles/CommonsPage.module.css';
import { useViewport } from "@/context/ViewportProvider.tsx";
import { useUser } from "@/context/UserProvider.tsx";
import Link from 'next/link';
import Image from 'next/image';

// function getLinkStyle({ isActive }: { isActive: boolean }) {
// 	return {
// 		color: isActive ? "#3692FF" : "black",
// 		textDecoration: isActive ? "underline" : "none"
// 	};
// }

function Header() {
	const viewport = useViewport();
	const user = useUser();

  return (<header className={styles.header}>
		<div className={styles.sub}>
			<div className={styles.sub_header}>
				<Link href="/"><Image width={viewport.device === "phone" ? 116 : 120} height={40} className={styles.logo} src={viewport.device === "phone" ? "/images/logo-text-only.png" : "/images/Property-1=lg.png"} alt="판다마켓 Logo"/></Link>
				<nav>
					<ul>
						<li><Link href="/boards">자유게시판</Link></li>
						<li><Link href="/items">중고마켓</Link></li>
					</ul>
				</nav>
			</div>
			{user ? <Link href="/profile"><div className={styles.userInfo}><Image width={40} height={40} src={user?.user?.image ? user.user.image : "/images/ic_unknown.png"} alt="Profile" /> {user?.user?.nickname}</div></Link> : <Link href="/login" className={styles.a_button}>로그인</Link>}
		</div>
	</header>);
}

export default Header;