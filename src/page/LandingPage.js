import '../css/LandingPage.css';
import home_1 from '../assets/img/landing/Img_home_01.png';
import home_2 from '../assets/img/landing/Img_home_02.png';
import home_3 from '../assets/img/landing/Img_home_03.png';
import home_top from '../assets/img/landing/Img_home_top.png';
import home_bottom from '../assets/img/landing/Img_home_bottom.png';
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="landing-body">
            <div className="home-top">
                <div className="home-top-img">
                    <div className="top">
                        <h1>
                            일상의 모든 물건을<br />
                            거래해 보세요
                        </h1>
                        <Link to="/items">
                            <button className="item-btn">구경하러 가기</button>
                        </Link>
                    </div>
                    <img src={home_top} alt="home-top" />
                </div>
            </div>
            <div className="best-item-section">
                <div className="section">
                    <div className="section1-hot-item">
                        <img className="hot-img" src={home_1} alt="hot-img" />
                        <div className="hot-item">
                            <p className="section-category">Hot item</p>
                            <h1 className="section-title">
                                인기 상품을<br />
                                확인해 보세요
                            </h1>
                            <p className="section-description">
                                가장 HOT한 중고거래 물품을<br />
                                판다 마켓에서 확인해 보세요
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="search-section">
                <div className="section">
                    <div className="section2-search">
                        <div className="landing-search">
                            <p className="section-category">Search</p>
                            <h1 className="section-title">
                                구매를 원하는<br />
                                상품을 검색하세요
                            </h1>
                            <p className="section-description">
                                구매하고 싶은 물품은 검색에서<br />
                                쉽게 찾아보세요
                            </p>
                        </div>
                        <img className="search-img" src={home_2} alt="search-img" />
                    </div>
                </div>
            </div>
            <div className="register-section">
                <div className="section">
                    <div className="section3-register">
                        <img className="register-img" src={home_3} alt="register-img" />
                        <div className="register">
                            <p className="section-category">Register</p>
                            <h1 className="section-title">
                                판매를 원하는<br />
                                상품을 등록하세요
                            </h1>
                            <p className="section-description">
                                어떤 물건이든 판매하고 싶은 상품을<br />
                                쉽게 등록하세요
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-bottom">
                <div className="home-bottom-img">
                    <div className="bottom">
                        <h1>
                            믿을 수 있는<br />
                            판다마켓 중고 거래
                        </h1>
                    </div>
                    <img src={home_bottom} alt="home-bottom" />
                </div>
            </div>
        </div>
    );
}