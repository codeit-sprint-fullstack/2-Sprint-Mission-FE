import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingMain.css';
import imgHomeTop from '../assets/Img_home_top.svg';
import imgHotItem from '../assets/Img_home_01.svg';
import imgSearchItem from '../assets/Img_home_02.svg';
import imgRegisterItem from '../assets/Img_home_03.svg';
import imgHomeBottom from '../assets/Img_home_bottom.svg';

// 화면 크기를 나타내는 상수 정의
const PC_BREAKPOINT = 1200;
const MOBILE_BREAKPOINT = 743;

const LandingMain = () => {
  // viewportWidth 상태를 선언하고, 초기값을 window.innerWidth로 설정
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // 화면 크기 변화에 따라 viewportWidth를 업데이트하는 useEffect 훅
  useEffect(() => {
    // 창 크기가 변경될 때 호출되는 함수
    const handleResize = () => {
      setViewportWidth(window.innerWidth); // 상태 업데이트
    };

    // 창 크기 변화 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // PC 또는 모바일 기준에 따라 <br> 태그 삽입 여부 결정
  const shouldHaveBreak = viewportWidth >= PC_BREAKPOINT || viewportWidth <= MOBILE_BREAKPOINT;

  return (
    <main className="landing-main">
      {/* 상단 섹션 */}
      <section className="landing-main__top">
        <div className="landing-main__top-content">
          <h1 className="landing-main__title">
            일상의 모든 물건을
            {/* 화면 크기에 따라 줄바꿈 태그 삽입 */}
            <span> {shouldHaveBreak ? <br /> : null}</span>
            거래해 보세요
          </h1>
          {/* 중고마켓 페이지로 이동하는 CTA 버튼 */}
          <Link to="/items">
            <button className="landing-main__cta-button">구경하러 가기</button>
          </Link>
        </div>
        <img className="landing-main__top-image" src={imgHomeTop} alt="Top Banner" />
      </section>

      {/* 중간 섹션: Hot item, Search, Register 부분 */}
      <section className="landing-main__middle">
        <article className="landing-main__hot-item">
          <img className="landing-main__middle-image" src={imgHotItem} alt="Hot items" />
          <div className="landing-main__hot-item__content">
            <h3>Hot item</h3>
            <h1>
              인기 상품을
              <span> {shouldHaveBreak ? <br /> : null}</span>
              확인해 보세요
            </h1>
            <h2>
              가장 HOT한 중고거래 물품을<br />
              판다 마켓에서 확인해보세요
            </h2>
          </div>
        </article>

        <article className="landing-main__search">
          <div className="landing-main__search__content">
            <h3>Search</h3>
            <h1>
              구매를 원하는
              <span>{shouldHaveBreak ? <br /> : null}</span>
              상품을 검색하세요
            </h1>
            <h2>
              구매하고 싶은 물품은 검색해서<br />
              쉽게 찾아보세요
            </h2>
          </div>
          <img className="landing-main__middle-image" src={imgSearchItem} alt="Search" />
        </article>

        <article className="landing-main__register">
          <img className="landing-main__middle-image" src={imgRegisterItem} alt="Register" />
          <div className="landing-main__register__content">
            <h3>Register</h3>
            <h1>
              판매를 원하는
              <span> {shouldHaveBreak ? <br /> : null}</span>
              상품을 등록하세요
            </h1>
            <h2>
              어떤 물건이든 판매하고 싶은 상품을<br />
              쉽게 등록하세요
            </h2>
          </div>
        </article>

        {/* 중간 섹션의 하단 마진을 위한 요소 */}
        <div className="landing-main__middle-bottom-margin"></div>
      </section>

      {/* 하단 섹션 */}
      <section className="landing-main__bottom">
        <h1>
          믿을 수 있는<br />
          판다마켓 중고 거래
        </h1>
        <img className="landing-main__bottom-image" src={imgHomeBottom} alt="Bottom Banner" />
      </section>
    </main>
  );
};

export default LandingMain;
