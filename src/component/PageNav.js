import "../page/HomeStyle/global.css";
import "../page/HomeStyle/home.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../page/images/logo/logo.svg";
import Avatar from "./Avatar.js";
import { useEffect, useState } from "react";
import axios from "../lib/axios.js";
import style from "./PageNav.module.css";

export function PublicNav() {
  const location = useLocation();
  const [user, setUser] = useState(null); // 유저 상태 관리
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  async function getMe(token) {
    try {
      const res = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (e) {
      console.error(e);
      setUser(null);
    }
  }

  useEffect(() => {
    if (accessToken) {
      getMe(accessToken);
    }
  }, [accessToken]);

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
        {user ? (
          <div className={style.userContainer}>
            <Avatar className={style.userImg} src={user.image} size="small" />
            <div className={style.userNickname}>{user.nickname}</div>
          </div>
        ) : (
          <Link to="/login">
            <button id="loginLink" className="button">
              로그인
            </button>
          </Link>
        )}
      </header>
    </>
  );
}

export default PublicNav;
