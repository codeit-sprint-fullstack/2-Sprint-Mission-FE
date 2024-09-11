/** @format */
import logo from "../assets/logo.svg";
import "../styles/Header.css";
function Header() {
  return (
    <header>
      <div className='text-header'>
        <a href='/'>
          <img src={logo} alt='home' />
        </a>
        <a href='/' id='secondHandBoard'>
          중고마켓
        </a>
        <a href='/' id='secondHandBoard'>
          자유계시판
        </a>
      </div>
    </header>
  );
}
export default Header;
