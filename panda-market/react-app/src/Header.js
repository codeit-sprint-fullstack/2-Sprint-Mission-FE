import { NavLink } from "react-router-dom";

function getLinkStyle({ isActive }) {
	return {
		color: isActive ? "#3692FF" : "black",
		textDecoration: isActive ? "underline" : "none"
	};
}

function Header() {
  return (<header>
		<div className="sub">
			<div className="sub-header">
				<NavLink href="/"><img className="logo" src="/images/Property-1=lg.png" alt="판다마켓 Logo"/></NavLink>
				<nav>
					<ul>
						<li><NavLink to="/boards" style={getLinkStyle}>자유게시판</NavLink></li>
						<li><NavLink to="/items" style={getLinkStyle}>중고마켓</NavLink></li>
					</ul>
				</nav>
			</div>
			<a href="/login" className="button">로그인</a>
		</div>
	</header>);
}

export default Header;
