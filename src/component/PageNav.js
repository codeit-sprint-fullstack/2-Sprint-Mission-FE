import "../page/HomeStyle/global.css";
import "../page/HomeStyle/home.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../page/images/logo/logo.svg";

function PageNav() {
  const location = useLocation();

  return (
    <>
      <header>
        <div className="headerNav">
          <Link to="/">
            <img src={logo} alt="판다마켓 로고" />
          </Link>
          <Link to="/freeboard">
            <button className="FreeBoard">자유게시판</button>
          </Link>
          <Link to="/items">
            <button className={location.pathname === "/items" ? "InPage" : ""}>
              중고마켓
            </button>
          </Link>
        </div>
        <Link to="/login">
          <button id="loginLink" className="button">
            로그인
          </button>
        </Link>
      </header>
    </>
  );
}

export default PageNav;
