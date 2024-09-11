function Header() {
  return (<header>
		<div className="sub">
			<div className="sub-header">
				<a href="/"><img className="logo" src="/images/Property-1=lg.png" alt="판다마켓 Logo"/></a>
				<nav>
					<ul>
						<li>자유게시판</li>
						<li>중고마켓</li>
					</ul>
				</nav>
			</div>
			<a href="/login" className="button">로그인</a>
		</div>
	</header>);
}

export default Header;
