export default function Header() {
  return (
    <header>
      <div className="top-bar">
        <div className="top-bar-elements">
          <img
            className="site-logo"
            src="./images/logo.png"
            alt="사이트 로고"
          />
          <a className="auth" href=".../login/index.html">
            로그인
          </a>
        </div>
      </div>
    </header>
  );
}
