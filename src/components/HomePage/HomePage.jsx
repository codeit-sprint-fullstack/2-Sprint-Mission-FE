import React from "react";
import "./Homepage.css";
import bannerImg from "../../images/home/top_banner.png";
import hotItem from "../../images/home/hotitem.png";
import search from "../../images/home/search.png";
import register from "../../images/home/register.png";
import bottomBanner from "../../images/home/bottom_banner.png";

const HomePage = () => {
  return (
    <>
      <section id="top" className="banner">
        <div className="wrapper">
          <h1>
            일상의 모든 물건을 <span className="space"></span>거래 해보세요
          </h1>
          <a href="items.html">
            <div id="lookforbtn" className="button">
              구경하러 가기
            </div>
          </a>
        </div>
        <div className="banner-img">
          <img src={bannerImg} alt="top 배너 이미지" />
        </div>
      </section>
      <section id="features">
        <div className="feature odd-feature">
          <img src={hotItem} alt="인기 상품" className="feature-img" />
          <div className="feature-content odd-feature-content">
            <h5 className="feature-subtitle">Hot item</h5>
            <h2 className="feature-title">
              인기 상품을
              <br />
              확인해 보세요
            </h2>
            <p className="feature-description">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>
        <div className="feature even-feature">
          <div className="feature-content even-feature-content">
            <h5 className="feature-subtitle">Search</h5>
            <h2 className="feature-title">
              구매를 원하는
              <br />
              상품을 검색하세요
            </h2>
            <p className="feature-description">
              구매하고 싶은 물품은 검색해서
              <br /> 쉽게 찾아보세요
            </p>
          </div>
          <img src={search} alt="검색 기능" className="feature-img" />
        </div>

        <div className="feature odd-feature">
          <img src={register} alt="판매 등록" className="feature-img" />
          <div className="feature-content odd-feature-content">
            <h5 className="feature-subtitle">Register</h5>
            <h2 className="feature-title">
              판매를 원하는
              <br />
              상품을 등록하세요
            </h2>
            <p className="feature-description">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section id="bottom" className="banner">
        <div className="wrapper">
          <h1>
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h1>
        </div>
        <div className="banner-img">
          <img src={bottomBanner} alt="bottom 배너 이미지" />
        </div>
      </section>
    </>
  );
};

export default HomePage;
