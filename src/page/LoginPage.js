import { Link } from 'react-router-dom';
import '../css/LoginPage.css';
import logo from '../assets/img/login/panda.png';
import eye from '../assets/img/login/btn_visibility_on.png';
import googleIcon from "../assets/img/login/google.png";
import kakaoIcon from "../assets/img/login/kakao.png";

export default function LoginPage() {
    return(
        <div className="login-body">
            <main>
            <div className="login-logo-title">
                <Link to="/">
                    <img className="login-logo" src={logo} alt="panda-logo" />
                </Link>
                <Link to="/"><h1 className="login-title">판다마켓</h1></Link>
            </div>
            <div className="input">
                <div className="label-input">
                    <label className="input-title" htmlFor="email">이메일</label>
                    <input id="email" className="input-area" placeholder="이메일을 입력해주세요" type="email"/>
                    <span className="err-message">잘못된 이메일 형식입니다.</span>
                </div>
                <div className="password-input">
                    <label className="input-title" htmlFor="password-field">비밀번호</label>
                    <input id="password-field" className="input-area" placeholder="비밀번호를 입력해주세요" type="password"/>
                    <div className="eyes">
                        <img id="toggle" className="eye" src={eye} alt='eyes' />
                    </div>
                    <span className="Perr-message">비밀번호를 8자 이상 입력해주세요</span>
                </div>
                {/* <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const passwordField = document.getElementById('password-field');
                        const toggle = document.getElementById('toggle');
                        const typeSwitch = Object.freeze({
                            password: 'text',
                            text: 'passwowrd'
                        });

                        toggle.addEventListener('click', function() {
                            passwordField.type = typeSwitch[passwordField.type];
                        });
                    });
                </script> */}
                <Link className="loginpage-btn" to="/items">
                    <p className="loginpage-text">로그인</p>
                </Link>
                <div className="easy-login">
                    <p>간편 로그인하기</p>
                    <div className="icon">
                        <Link to="https://www.google.com/">
                            <img className="google-icon" src={googleIcon} alt="googleIcon" />
                        </Link>
                        <Link to="https://www.kakaocorp.com/page/">
                            <img className="kakao-icon" src={kakaoIcon} alt="kakaoIcon" />
                        </Link>
                    </div>
                </div>
                <div className="sign-in">
                    <p>판다마켓이 처음이신가요?</p>
                    <Link to="/signup">회원가입</Link>
                </div>
            </div>
        </main>
        <div id="modal">
            <div id="modal-content">
                <p id="modal-text">비밀번호가 일치하지 않습니다.</p>
                <button id="modal-close">확인</button>
            </div>
        </div>

        </div>
    )
}