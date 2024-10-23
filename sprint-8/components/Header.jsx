import styles from '@/styles/CommonsPage.module.css';
import { useViewport } from "@/context/ViewportProvider";
import Link from 'next/link';
import Image from 'next/image';

// function getLinkStyle({ isActive }) {
// 	return {
// 		color: isActive ? "#3692FF" : "black",
// 		textDecoration: isActive ? "underline" : "none"
// 	};
// }

function Header() {
	const viewport = useViewport();

  return (<header className={styles.header}>
		<div className={styles.sub}>
			<div className={styles.sub_header}>
				<Link href="/"><div className={styles.logo}><Image fill src={viewport === "phone" ? "/images/logo-text-only.png" : "/images/Property-1=lg.png"} alt="판다마켓 Logo"/></div></Link>
				<nav>
					<ul>
						<li><Link href="/boards">자유게시판</Link></li>
						<li><Link href="/items">중고마켓</Link></li>
					</ul>
				</nav>
			</div>
			<Link href="/login" className={styles.a_button}>로그인</Link>
		</div>
	</header>);
}

export default Header;
