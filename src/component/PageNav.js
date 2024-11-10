import "../page/HomeStyle/global.css";
import "../page/HomeStyle/home.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../page/images/logo/logo.svg";
import Avatar from "./Avatar.js";
import { useEffect, useState } from "react";
import axios from "../lib/axios.js";
import style from "./PageNav.module.css";

export function PublicNav() {
  const location = useLocation();
  const [user, setUser] = useState(null); // 유저 상태 관리

  const accessToken = localStorage.getItem("accessToken");
  // const refreshToken = localStorage.getItem("refreshToken");

  // async function refreshAccessToken() {
  //   try {
  //     const res = await axios.post("/auth/refresh-token", {
  //       refreshToken,
  //     });

  //     console.log("리프레시토큰", res);
  //     localStorage.setItem("accessToken", res.data.accessToken);
  //     return res.data.accessToken;
  //   } catch (error) {
  //     console.error(error);
  //     return alert("새로고침 혹은,다시로그인해주세요");
  //   }
  // }

  async function getMe(token) {
    try {
      const res = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (e) {
      // if (e.response && e.response.status === 401) {
      //   // JWT expired
      //   const newAccessToken = await refreshAccessToken();
      //   if (newAccessToken) {
      //     await getMe(newAccessToken); // 새로운 토큰으로 다시 시도
      //   } else {
      //     alert("리프레시토큰이 없습니다. 다시로그인해주세요");
      //     setUser(null); // refreshToken이 없거나 실패한 경우
      //   }
      // } else {
      console.error(e);
      // alert("새로고침 혹은,다시 로그인해주세요");
      setUser(null);
      // }
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
