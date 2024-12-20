import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
	function HeroSection() {
		return (
			<section className={[styles.section, styles.section_sec_top].join(" ")} style={{backgroundImage: `url("/images/Img_home_top.png")`}}>
				<div className={styles.description}>
					<h2>일상의 모든 물건을<br />거래해 보세요</h2>
					<Link href="/items" className={styles.a_button}>구경하러 가기</Link>
				</div>
				<div className={styles.img_home_top}></div>
			</section>
		);
	}

	function FeaturesSection() {
		return (
			<>
				<section className={[styles.section, styles.section_left].join(" ")}>
					<div className={styles.img_home_middle}>
						<Image fill src="/images/Img_home_01.png" alt="인기 상품" />
					</div>
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
					<div className={styles.img_home_middle}>
						<Image fill src="/images/Img_home_02.png" alt="Search" />
					</div>
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
					<div className={styles.img_home_middle}>
						<Image fill src="/images/Img_home_03.png" alt="Register" />
					</div>
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
			</>
		);
	}

	function CTASection() {
		return (
			<section className={[styles.section, styles.section_sec_bottom].join(" ")} style={{backgroundImage: `url("/images/Img_home_bottom.png")`}}>
				<h2>믿을 수 있는<br />판다마켓 중고 거래</h2>
				<div className={styles.img_home_bottom}></div>
			</section>
		);
	}

	return (
		<>
			<Head>
				<title>판다 마켓</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<article className={styles.sub}>
					<HeroSection/>
					<FeaturesSection/>
					<section className={[styles.section, styles.section_sec_bottom_divider].join(" ")}>
					</section>
					<CTASection/>
				</article>
			</main>
		</>
	);
}
