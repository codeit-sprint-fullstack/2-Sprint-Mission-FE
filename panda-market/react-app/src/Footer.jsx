import { Link } from "react-router-dom";
import styles from './pages/CommonsPage.module.css';

function Footer() {
  return (<footer className={styles.footer}>
		<div className={styles.sub}>
			<div className={styles.sub_footer}>
				<div className={styles.codeit_2024}>@codeit - 2024</div>
				<div className={styles.privacy_policy_and_FAQ}>
					<Link to="/privacy">Privacy Policy</Link>
					<Link to="/faq">FAQ</Link>
				</div>
				<div className={styles.sns_icons}>
					<Link target="_blank" rel="noopener noreferrer" to="https://facebook.com/"><img src="/images/ic_facebook.svg" alt="facebook link"/></Link>
					<Link target="_blank" rel="noopener noreferrer" to="https://X.com/"><img src="/images/ic_twitter.svg" alt="X-twitter link"/></Link>
					<Link target="_blank" rel="noopener noreferrer" to="https://www.youtube.com/"><img src="/images/ic_youtube.svg" alt="youtube link"/></Link>
					<Link target="_blank" rel="noopener noreferrer" to="https://www.instagram.com/"><img src="/images/ic_instagram.svg" alt="instagram link"/></Link>
				</div>
			</div>
		</div>
	</footer>);
}

export default Footer;
