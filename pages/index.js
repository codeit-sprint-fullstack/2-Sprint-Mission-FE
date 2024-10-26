import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import homeTopImg from "@/public/Img_home_top.svg";
import home1Img from "@/public/Img_home_01.svg";
import home2Img from "@/public/Img_home_02.svg";
import home3Img from "@/public/Img_home_03.svg";
import homeBottomImg from "@/public/Img_home_bottom.svg";

export default function Home() {
  return (
    <main className={styles.mainSection}>
      <section className={`${styles.topBottomSection} ${styles.topSection}`}>
        <div className={`${styles.wrapper} ${styles.topWrapper}`}>
          <div className={styles.textSection}>
            <h1>
              일상의 모든 물건을
              <br className={styles.topBreakLine} />
              거래해 보세요
            </h1>
            <p>
              <Link
                className={`${styles.button} ${styles.shoppingButton}`}
                href="/marketplace"
              >
                구경하러 가기
              </Link>
            </p>
          </div>
          <div className={styles.homeTopImg}>
            <Image fill src={homeTopImg} alt="판다마켓 홈 상단" />
          </div>
        </div>
      </section>

      <section className={`${styles.wrapper} ${styles.centerSection}`}>
        <div className={`${styles.centerMainSection} ${styles.hotItem}`}>
          <div className={styles.homeImg}>
            <Image fill src={home1Img} alt="인기 상품" />
          </div>
          <div className={styles.centerContent}>
            <h2 className={styles.title}>Hot item</h2>
            <h1>
              인기 상품을
              <br className={styles.breakLine} />
              확인해보세요
            </h1>
            <p className={styles.contentDescription}>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해보세요
            </p>
          </div>
        </div>

        <div className={`${styles.centerMainSection} ${styles.search}`}>
          <div className={styles.centerContent}>
            <h2 className={styles.title}>Search</h2>
            <h1>
              구매를 원하는
              <br className={styles.breakLine} />
              상품을 검색하세요
            </h1>
            <p className={styles.contentDescription}>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
          <div className={styles.homeImg}>
            <Image fill src={home2Img} alt="검색 기능" />
          </div>
        </div>

        <div className={`${styles.centerMainSection} ${styles.register}`}>
          <div className={styles.homeImg}>
            <Image fill src={home3Img} alt="상품 등록" />
          </div>
          <div className={styles.centerContent}>
            <h2 className={styles.title}>Register</h2>
            <h1>
              판매를 원하는
              <br className={styles.breakLine} />
              상품을 등록하세요
            </h1>
            <p className={styles.contentDescription}>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.topBottomSection} ${styles.bottomSection}`}>
        <div className={`${styles.wrapper} ${styles.bottomWrapper}`}>
          <div className={styles.textSection}>
            <h1>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h1>
          </div>
          <div className={styles.homeBottomImg}>
            <Image fill src={homeBottomImg} alt="판다마켓 홈 하단" />
          </div>
        </div>
      </section>
    </main>
  );
}
