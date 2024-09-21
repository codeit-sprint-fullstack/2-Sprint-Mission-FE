import React from "react";
import "../style/LandingPageTopBanner.css";
import "../style/LandingPageMiddleBanner.css";
import "../style/LandingPageBottomBanner.css";

function LandingPage() {
  return (
    <div>
      <div className="top">
        <div className="topLeft">
          <div className="topDetail">
            일상의 모든 물건을
            <br className="topDetailBr" />
            거래해 보세요
          </div>
          <button
            className="topButton"
            onClick={() => (window.location.href = "/items")}
          >
            구경하러 가기
          </button>
        </div>
        <div className="topRight">
          <img
            src="/img/topBannerImg.png"
            alt="topImg"
            className="topImg"
          ></img>
        </div>
      </div>
      <div className="middle">
        <div className="middle1">
          <div className="middleLeft1">
            <img
              src="/img/middleBannerImg1.png"
              alt="middleImg1"
              className="middleImg1"
            ></img>
          </div>
          <div className="middleRight1">
            <div className="middleDetail1">Hot item</div>
            <div className="middleDetail2">
              인기 상품을 <br className="middleDetailBr" />
              확인해 보세요
            </div>
            <div className="middleDetail3">
              가장 HOT한 중고거래 물품을 <br />
              판다 마켓에서 확인해 보세요
            </div>
          </div>
        </div>
        <div className="middle2">
          <div className="middleLeft2">
            <div className="middleDetail1">Search</div>
            <div className="middleDetail2">
              구매를 원하는 <br className="middleDetailBr" />
              상품을 검색하세요
            </div>
            <div className="middleDetail3">
              구매하고 싶은 물품은 검색해서 <br />
              쉽게 찾아보세요
            </div>
          </div>
          <div className="middleRight2">
            <img
              src="/img/middleBannerImg2.png"
              alt="middleImg2"
              className="middleImg2"
            ></img>
          </div>
        </div>
        <div className="middle3">
          <div className="middleLeft3">
            <img
              src="/img/middleBannerImg3.png"
              alt="middleImg3"
              className="middleImg3"
            ></img>
          </div>
          <div className="middleRight1">
            <div className="middleDetail1">Register</div>
            <div className="middleDetail2">
              판매를 원하는 <br className="middleDetailBr" />
              상품을 등록하세요
            </div>
            <div className="middleDetail3">
              어떤 물건이든 판매하고 싶은 상품을 <br />
              쉽게 등록하세요
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="bottomLeft">
          <div className="bottomDetail">
            믿을 수 있는
            <br className="bottomDetailBr" />
            판다마켓 중고 거래
          </div>
        </div>
        <div className="bottomRight">
          <img
            src="/img/bottomBannerImg.png"
            alt="bottomImg"
            className="bottomImg"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
