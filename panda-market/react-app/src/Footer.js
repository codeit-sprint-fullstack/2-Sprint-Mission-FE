import { Link } from "react-router-dom";

function Footer() {
  return (<footer>
		<div className="sub">
			<div className="sub-footer">
				<div className="codeit-2024">@codeit - 2024</div>
				<div className="privacy-policy-and-FAQ">
					<Link href="/privacy">Privacy Policy</Link>
					<Link href="/faq">FAQ</Link>
				</div>
				<div className="sns-icons">
					<Link target="_blank" href="/"><img src="/images/ic_facebook.svg" alt="facebook link"/></Link>
					<Link target="_blank" href="/"><img src="/images/ic_twitter.svg" alt="X-twitter link"/></Link>
					<Link target="_blank" href="/"><img src="/images/ic_youtube.svg" alt="youtube link"/></Link>
					<Link target="_blank" href="/"><img src="/images/ic_instagram.svg" alt="instagram link"/></Link>
				</div>
			</div>
		</div>
	</footer>);
}

export default Footer;
