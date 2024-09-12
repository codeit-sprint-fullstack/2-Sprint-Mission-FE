import { Link } from "react-router-dom";
import styles from './HomePage.module.css';
// import '../style.css';
// import '../reset.css';

function HomePage() {
  return (<main className={styles.main}>
		<article className={styles.sub}>
			<section className={[styles.section, styles.section_sec_top].join(" ")} style={{backgroundImage: `url("/images/Img_home_top.png")`}}>
				<div className={styles.description}>
					<h2>일상의 모든 물건을<br />거래해 보세요</h2>
					<Link to="/items" className={styles.a_button}>구경하러 가기</Link>
				</div>
				<div className={styles.img_home_top}></div>
			</section>
			<section className={[styles.section, styles.section_left].join(" ")}>
				<img src="/images/Img_home_01.png" alt="인기 상품" className={styles.img_home_middle}/>
				<div className={styles.description}>
					<h3>Hot item</h3>
					<h2>인기 상품을<br />확인해 보세요</h2>
					<p>
						가장 HOT한 중고거래 물품을<br />
						판다 마켓에서 확인해 보세요
					</p>
				</div>
				<div className={[styles.cBoth, styles.no_float].join(" ")}></div>
			</section>
			<section className={[styles.section, styles.section_right].join(" ")}>
				<img src="/images/Img_home_02.png" alt="Search" className={styles.img_home_middle}/>
				<div className={styles.description}>
					<h3>Search</h3>
					<h2>구매를 원하는<br />상품을 검색하세요</h2>
					<p>
						구매하고 싶은 물품은 검색해서<br />
						쉽게 찾아보세요
					</p>
				</div>
				<div className={[styles.cBoth, styles.no_float].join(" ")}></div>
			</section>
			<section className={[styles.section, styles.section_left].join(" ")}>
				<img src="/images/Img_home_03.png" alt="Register" className={styles.img_home_middle}/>
				<div className={styles.description}>
					<h3>Register</h3>
					<h2>판매를 원하는<br />상품을 등록하세요</h2>
					<p>
						어떤 물건이든 판매하고 싶은 상품을<br />
						쉽게 등록하세요
					</p>
				</div>
				<div className={[styles.cBoth, styles.no_float].join(" ")}></div>
			</section>
			<section className={[styles.section, styles.section_sec_bottom_divider].join(" ")}>
			</section>
			<section className={[styles.section, styles.section_sec_bottom].join(" ")} style={{backgroundImage: `url("/images/Img_home_bottom.png")`}}>
				<h2>믿을 수 있는<br />판다마켓 중고 거래</h2>
				<div className={styles.img_home_bottom}></div>
			</section>
		</article>
	</main>);
}

export default HomePage;
