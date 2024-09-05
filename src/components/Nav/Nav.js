import "./style/Nav.css";
import Logo from "./Logo.js";
import NavMenuBar from "./NavMenuBar.js";
import NavMenu from "./NavMenu.js";
import Profile from "./Profile.js";
function Nav() {
  return (
    <nav>
      <Logo id="logo" />
      <NavMenuBar id="nav-menubar">
        <>자유게시판</>
        <>중고마켓</>
      </NavMenuBar>
      <Profile id="profile" />
    </nav>
  );
}
export default Nav;
