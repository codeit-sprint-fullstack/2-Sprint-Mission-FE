import React from "react";
import { Link } from "react-router-dom";
import "./LandingMain.css";
import topImg from "../assets/Img_home_top.svg";
import hotItemImg from "../assets/Img_home_01.svg";
import searchImg from "../assets/Img_home_02.svg";
import registerImg from "../assets/Img_home_03.svg";
import bottomImg from "../assets/Img_home_bottom.svg";

const LandingMain = () => {
  return (
    <div className="landing-main">
      <section className="landing-top">
        <div className="landing-top-content">
          <p className="landing-top-title">
            일상의 모든 물건을
            <br />
            거래해 보세요
          </p>
          <Link to="/items">
            <button className="landing-top-button">구경하러 가기</button>
          </Link>
        </div>
        <img className="landing-top-img" src={topImg} alt="Top Image" />
      </section>

      <section className="landing-middle">
        <article className="landing-middle-hot-item">
          <div className="landing-middle-hot-item-div">
            <img
              className="landing-middle-hot-item-img"
              src={hotItemImg}
              alt="HotItem Image"
            />
            <div className="landing-middle-hot-item-content">
              <p className="hot-item">Hot item</p>
              <p className="hot-item-title">
                인기 상품을
                <br />
                확인해 보세요
              </p>
              <p className="hot-item-description">
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </article>

        <article className="landing-middle-search">
          <div className="landing-middle-search-div">
            <img
              className="landing-middle-search-img"
              src={searchImg}
              alt="Search Image"
            />
            <div className="landing-middle-search-content">
              <p className="search">Search</p>
              <p className="search-title">
                구매를 원하는
                <br />
                상품을 검색하세요
              </p>
              <p className="search-description">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>
        </article>

        <article className="landing-middle-register">
          <div className="landing-middle-search-div">
            <img
              className="landing-middle-register-img"
              src={registerImg}
              alt="Register Image"
            />
            <div className="landing-middle-register-content">
              <p className="register">Register</p>
              <p className="register-title">
                판매를 원하는
                <br />
                상품을 등록하세요
              </p>
              <p className="register-description">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="landing-bottom">
        <div className="landing-bottom-content">
          <p className="landing-bottom-title">
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </p>
        </div>
        <img
          className="landing-bottom-img"
          src={bottomImg}
          alt="Bottom Image"
        />
      </section>
    </div>
  );
};

export default LandingMain;
