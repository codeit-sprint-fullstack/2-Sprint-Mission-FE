import pandaLogo from '../assets/panda-logo.svg';
import kimCode from '../assets/kim-code.svg';
import './Nav.css';

function Nav() {
  return (
    <div className="header">
      <div className="nav">
        <div className="title">
          <a href="./">
            <img className="pandamarket-img" src={pandaLogo} alt="판다 로고" />
          </a>
          <div className='select'>
            <p className="freeBoard">자유게시판</p>
            <p className="secondHand">중고마켓</p>
          </div>
        </div>
        <div className="login">
          <a href="/login">
            <img className='kim-code' src={kimCode} alt="김코드" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Nav;