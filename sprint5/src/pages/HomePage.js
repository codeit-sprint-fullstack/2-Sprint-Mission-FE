import './HomePage.css';
import bannerTopImg from '../images/Img_home_top.png';
import bannerBottomImg from '../images/Img_home_bottom.png';
import mainTopImg from '../images/Img_home_01.png';
import mainMiddleImg from '../images/Img_home_02.png';
import mainBottomImg from '../images/Img_home_03.png';

export default function HomePage() {
  return (
    <>
      <section className="banner">
        <div className="banner-top">
          <div className="banner-elements">
            <div className="banner-content">
              <h1 className="banner-heading">
                일상의 모든 물건을
                <br />
                거래해 보세요
              </h1>
              <a className="banner-top-button" href="/items">
                구경하러 가기
              </a>
            </div>
            <img
              className="banner-top-img"
              src={bannerTopImg}
              alt="상위 배너 이미지"
            />
          </div>
        </div>
      </section>

      <main>
        <section className="main-area">
          <div className="main-top">
            <div className="main-top-elements">
              <img className="main-img" src={mainTopImg} alt="메인 이미지1" />
              <div className="main-content">
                <div className="main-bg">Hot item</div>
                <h1 className="main-heading">
                  인기 상품을
                  <br />
                  확인해 보세요
                </h1>
                <p className="main-description">
                  가장 HOT한 중고거래 물품을
                  <br />
                  판다 마켓에서 확인해 보세요
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="main-area">
          <div className="main-middle">
            <div className="main-middle-elements">
              <div className="main-content">
                <div className="main-bg">Search</div>
                <h1 className="main-heading">
                  구매를 원하는
                  <br />
                  상품을 검색하세요
                </h1>
                <p className="main-description">
                  구매하고 싶은 물품은 검색해서
                  <br />
                  쉽게 찾아보세요
                </p>
              </div>
              <img
                className="main-img"
                src={mainMiddleImg}
                alt="메인 이미지2"
              />
            </div>
          </div>
        </section>

        <section className="main-area">
          <div className="main-bottom">
            <div className="main-bottom-elements">
              <img
                className="main-img"
                src={mainBottomImg}
                alt="메인 이미지3"
              />
              <div className="main-content">
                <div className="main-bg">Register</div>
                <h1 className="main-heading">
                  판매를 원하는
                  <br />
                  상품을 등록하세요
                </h1>
                <p className="main-description">
                  어떤 물건이든 판매하고 싶은 상품을
                  <br />
                  쉽게 등록하세요
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="banner">
        <div className="banner-bottom">
          <div className="banner-elements">
            <h1 className="banner-heading">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h1>
            <img
              className="banner-bottom-img"
              src={bannerBottomImg}
              alt="하위 배너 이미지"
            />
          </div>
        </div>
      </section>
    </>
  );
}
