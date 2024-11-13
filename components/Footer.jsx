import styles from '@/styles/CommonsPage.module.css';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (<footer className={styles.footer}>
		<div className={styles.sub}>
			<div className={styles.sub_footer}>
				<div className={styles.codeit_2024}>@codeit - 2024</div>
				<div className={styles.privacy_policy_and_FAQ}>
					<Link href="/privacy">Privacy Policy</Link>
					<Link href="/faq">FAQ</Link>
				</div>
				<div className={styles.sns_icons}>
					<Link target="_blank" href="https://facebook.com/"><div className={styles.snsImageContainer}><Image fill src="/images/ic_facebook.svg" alt="facebook link"/></div></Link>
					<Link target="_blank" href="https://X.com/"><div className={styles.snsImageContainer}><Image fill src="/images/ic_twitter.svg" alt="X-twitter link"/></div></Link>
					<Link target="_blank" href="https://www.youtube.com/"><div className={styles.snsImageContainer}><Image fill src="/images/ic_youtube.svg" alt="youtube link"/></div></Link>
					<Link target="_blank" href="https://www.instagram.com/"><div className={styles.snsImageContainer}><Image fill src="/images/ic_instagram.svg" alt="instagram link"/></div></Link>
				</div>
			</div>
		</div>
	</footer>);
}

export default Footer;
