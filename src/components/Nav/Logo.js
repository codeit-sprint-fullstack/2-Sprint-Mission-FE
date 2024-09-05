import logoImg from "./img/Logo.png";
import "./style/Logo.css";
function Logo() {
  return (
    <a href="/">
      <img id="logo" src={logoImg} alt="로고 이미지" />
    </a>
  );
}
export default Logo;
