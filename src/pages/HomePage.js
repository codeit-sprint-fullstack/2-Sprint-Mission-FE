import './HomePage.css';
import homeTopImg from '../assets/images/Img_home_top.png';
import hotItemImg from '../assets/images/img_hot-item.png';
import searchItemImg from '../assets/images/img_search.png';
import registerItemImg from '../assets/images/img_register.png';
import homeBottomImg from '../assets/images/Img_home_bottom.png';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <div className="banner-wrapper">
        <div className="banner-top">
          <div className="banner-top-message">
            <span>일상의 모든 물건을<br />거래해 보세요</span>
            <Link to="/items" className="btn-items">구경하러 가기</Link>
          </div>
          <div className="banner-top-img"><img src={homeTopImg} alt="top banner" />
          </div>
        </div>
      </div>
      <section className="section-wrapper">
        <div className="section section-left">
          <div className="contents-box-left">
            <div>
              <img className="main-section-img" src={hotItemImg} alt="hot item"/>
            </div>
            <div className="section-message section-message1">
              <span className="section-title">Hot Item</span>
              <span className="section-subtitle">인기 상품을<br />확인해 보세요</span>
              <span className="section-description">가장 HOT한 중고거래 물품을<br />판다 마켓에서 확인해 보세요</span>
            </div>
          </div>
        </div>
        <div className="section section-right">
          <div className="contents-box-right">
            <div className="section-message section-message2">
              <span className="section-title">Search</span>
              <span className="section-subtitle">구매를 원하는<br />상품을 검색하세요</span>
              <span className="section-description">구매하고 싶은 물품은 검색해서<br />쉽게 찾아보세요</span>
            </div>
            <div>
              <img className="main-section-img" src={searchItemImg} alt="search items" />
            </div>
          </div>
        </div>
        <div className="section section-left">
          <div className="contents-box-left">
            <div>
              <img className="main-section-img" src={registerItemImg} alt="register item" />
            </div>
            <div className="section-message section-message3">
              <span className="section-title">Register</span>
              <span className="section-subtitle">판매를 원하는<br />상품을 등록하세요</span>
              <span className="section-description">어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요</span>
            </div>
          </div>
        </div>
      </section>
      <div className="banner-wrapper">
        <div className="banner-bottom">
          <div className="banner-bottom-message">
            <span>믿을 수 있는<br />판다마켓 중고거래</span>
          </div>
          <div className="banner-bottom-img"><img src={homeBottomImg} alt="bottom banner" />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;