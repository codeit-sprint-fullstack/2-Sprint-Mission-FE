function HomeMain() {
  return (<main>
		<article className="sub">
			<section className="sec-top" style={{backgroundImage: `url("/images/Img_home_top.png")`}}>
				<div className="description">
					<h2>일상의 모든 물건을<br />거래해 보세요</h2>
					<a href="/items" className="button">구경하러 가기</a>
				</div>
				<div className="img-home-top"></div>
			</section>
			<section className="left">
				<img src="/images/Img_home_01.png" alt="인기 상품" className="img-home-middle"/>
				<div className="description">
					<h3>Hot item</h3>
					<h2>인기 상품을<br />확인해 보세요</h2>
					<p>
						가장 HOT한 중고거래 물품을<br />
						판다 마켓에서 확인해 보세요
					</p>
				</div>
				<div className="cBoth no-float"></div>
			</section>
			<section className="right">
				<img src="/images/Img_home_02.png" alt="Search" className="img-home-middle"/>
				<div className="description">
					<h3>Search</h3>
					<h2>구매를 원하는<br />상품을 검색하세요</h2>
					<p>
						구매하고 싶은 물품은 검색해서<br />
						쉽게 찾아보세요
					</p>
				</div>
				<div className="cBoth no-float"></div>
			</section>
			<section className="left">
				<img src="/images/Img_home_03.png" alt="Register" className="img-home-middle"/>
				<div className="description">
					<h3>Register</h3>
					<h2>판매를 원하는<br />상품을 등록하세요</h2>
					<p>
						어떤 물건이든 판매하고 싶은 상품을<br />
						쉽게 등록하세요
					</p>
				</div>
				<div className="cBoth no-float"></div>
			</section>
			<section className="sec-bottom-divider">
			</section>
			<section className="sec-bottom" style={{backgroundImage: `url("/images/Img_home_bottom.png")`}}>
				<h2>믿을 수 있는<br />판다마켓 중고 거래</h2>
				<div className="img-home-bottom"></div>
			</section>
		</article>
	</main>);
}

export default HomeMain;
