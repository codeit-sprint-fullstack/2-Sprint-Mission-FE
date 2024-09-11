import "./HomeStyle/global.css";
import "./HomeStyle/home.css";
import { Link } from "react-router-dom";
import logo from "./images/logo/logo.svg"

function PageNav() {
  return (
    <>
      <header>
        <div className="headerNav">
          <Link to="/">
            <img src={logo} alt="판다마켓 로고" />
          </Link>
          <button>자유게시판</button>
          <button>중고마켓</button>
        </div>
        <a href="login.html" id="loginLink" className="button">
          로그인
        </a>
      </header>
    </>
  );
}

export default PageNav;
