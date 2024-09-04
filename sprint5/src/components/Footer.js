export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-elements">
          <div className="footer-info">@codeit-2024</div>
          <div className="footer-customer-service">
            <a href="./privacy">Privacy Policy</a>
            <a href="./faq">FAQ</a>
          </div>
          <div className="sns">
            <a href="https://www.facebook.com/?locale=ko_KR" target="_blank">
              <img
                className="sns-logo"
                src="./images/ic_facebook.png"
                alt="페이스북"
              />
            </a>
            <a href="https://x.com/?lang=ko" target="_blank">
              <img
                className="sns-logo"
                src="./images/ic_twitter.png"
                alt="트위터"
              />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <img
                className="sns-logo"
                src="./images/ic_youtube.png"
                alt="유튜브"
              />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <img
                className="sns-logo"
                src="./images/ic_instagram.png"
                alt="인스타그램"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
