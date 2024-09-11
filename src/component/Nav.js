import pandaLogo from "../imgFile/판다마켓로고.png";
import kimAvatar from "../imgFile/김코드마크.png";
import "../style/Nav.css";

export function Navbar() {
  return (
    <div className="NavbarStyle">
      <div className="Nav">
        <img src={pandaLogo} alt="Logo" className="logoStyle" />
        <p>자유게시판</p>
        <p>중고 마켓</p>
      </div>
      <div className="Avatar">
        <img src={kimAvatar} alt="avatar" className="KimAvatar" />
        <span>김코드</span>
      </div>
    </div>
  );
}
