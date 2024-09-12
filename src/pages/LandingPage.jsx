import style from "./css/LandingPage.module.css";
import hotItem from "../Image/Img_home_01.png";
import search from "../Image/Img_home_02.png";
import register from "../Image/Img_home_03.png";
import { useViewport, VIEWPORT } from "../contexts/ViewportContext.jsx";

function LandingPage() {
  const viewport = useViewport();
  return (
    <main id={`${style["landingPage"]}`}>
      <section id={`${style["topBanner"]}`} className={`${style["banner"]}`}>
        <div className={`${style["section-wrap"]}`}>
          <h1 id={`${style["topBannerTitle"]}`}>
            일상의 모든 물건을 {viewport !== VIEWPORT.TABLET && <br />}
            거래해 보세요
          </h1>
          <a href="../items/" className={`button ${style["long-button"]}`}>
            구경하러 가기
          </a>
        </div>
      </section>
      <section className={`${style["cards"]}`}>
        <div className={`${style["card"]}`}>
          <img src={hotItem} alt="Hot Item" />
          <div className={`${style["card-text"]}`}>
            <h2>Hot item</h2>
            <h1>
              인기 상품을
              <br />
              확인해 보세요
            </h1>
            <p>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
        <div className={`${style["card"]} ${style["reverse"]}`}>
          <img src={search} alt="Search" />
          <div className={`${style["card-text"]}`}>
            <h2>Search</h2>
            <h1>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h1>
            <p>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>
        <div className={`${style["card"]}`}>
          <img src={register} alt="Register" />
          <div className={`${style["card-text"]}`}>
            <h2>Register</h2>
            <h1>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h1>
            <p>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>
      <section id={`${style["bottomBanner"]}`} className={`${style["banner"]}`}>
        <div className={`${style["section-wrap"]}`}>
          <h1>
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </h1>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
