// pages/index.js
import Image from 'next/image';
import Link from 'next/link';

function HomePage() {
  return (
    <>
      {/* 상단 배너 영역 */}
      <div className="banner-wrapper">
        <div className="banner-top">
          <div className="banner-top-message">
            <span>일상의 모든 물건을<br />거래해 보세요</span>
            <Link href="/items" className="btn-items">구경하러 가기</Link>
          </div>
          <div className="banner-top-img">
            <Image
              src="/images/home/Img_home_top.png"
              alt="top banner"
              fill
              style={{ objectFit: 'contain' }}
              sizes="99.6rem"
              priority
            />
          </div>
        </div>
      </div>
      {/* 섹션 영역 */}
      <section className="section-wrapper">
        <div className="section section-left">
          <div className="contents-box-left">
            <div className="main-section-img">
              <Image
                src="/images/home/img_hot-item.png"
                alt="hot item"
                fill
                sizes="
                (max-width: 74.3rem) 34.4rem,
                (min-width: 74.4rem) and (max-width: 119.9rem) 69.6rem,
                58.8rem
                "
                style={{ objectFit: 'contain' }}
              />
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
            <div className="main-section-img">
              <Image
                src="/images/home/img_search.png"
                alt="search items"
                fill
                style={{ objectFit: 'contain' }}
                sizes='58.8rem'
              />
            </div>
          </div>
        </div>
        <div className="section section-left">
          <div className="contents-box-left">
            <div className="main-section-img">
              <Image
                src="/images/home/img_register.png"
                alt="register item"
                fill
                style={{ objectFit: 'contain' }}
                sizes='58.8rem'
              />
            </div>
            <div className="section-message section-message3">
              <span className="section-title">Register</span>
              <span className="section-subtitle">판매를 원하는<br />상품을 등록하세요</span>
              <span className="section-description">어떤 물건이든 판매하고 싶은 상품을<br />쉽게 등록하세요</span>
            </div>
          </div>
        </div>
      </section>
      {/* 하단 배너 영역 */}
      <div className="banner-wrapper">
        <div className="banner-bottom">
          <div className="banner-bottom-message">
            <span>믿을 수 있는<br />판다마켓 중고거래</span>
          </div>
          <div className="banner-bottom-img">
            <Image
              src="/images/home/Img_home_bottom.png"
              alt="bottom banner"
              fill
              style={{ objectFit: 'contain' }}
              sizes="99.6rem"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
