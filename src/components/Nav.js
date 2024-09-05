import logoImg from '../image/homepage_logo.png'
import profileImg from '../image/profileImg.png'
import '../css/Nav.css'

export default function Nav() {
  return (
    <header>
      <div className="logoAndMenu">
        <a href="/"><img src={logoImg} alt="판다마켓 로고" /></a>
        <ul className="navMenu">
          <li className="menuList">자유게시판</li>
          <li className="menuList">중고마켓</li>
        </ul>
      </div>
      <a className="profile" href="./login/"><img src={profileImg} alt="프로필이미지" />김코드</a>
    </header>
  );
}