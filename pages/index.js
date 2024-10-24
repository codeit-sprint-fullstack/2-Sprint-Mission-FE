import Image from "next/image";
import style from "@/styles/Home.module.css";
import home1 from '@/public/landing/Img_home_01.png';
import home2 from '@/public/landing/Img_home_02.png';
import home3 from '@/public/landing/Img_home_03.png';
import home_top from '@/public/landing/Img_home_top.png';
import home_bottom from '@/public/landing/Img_home_bottom.png';
import Link from "next/link";

export default function Home() {
  return (
    <div className={style.landingBody}>
      <div className={style.homeTop}>
        <div className={style.homeTopImg}>
          <div className={style.top}>
            <h1>
              일상의 모든 물건을&nbsp;
              <br />
              거래해 보세요
            </h1>
            <Link href="/items">
              <button className={style.itemBtn}>구경하러 가기</button>
            </Link>
          </div>
          <Image className={style.topImg} src={home_top} alt="home-top" />
        </div>
      </div>
      <div className={style.bestItemSection}>
        <div className={style.section}>
          <div className={style.section1HotItem}>
            <Image className={style.hotImg} src={home1} alt="hot-img" />
            <div className={style.hotItem}>
              <p className={style.sectionCategory}>Hot item</p>
              <h1 className={style.sectionTitle}>
                인기 상품을&nbsp;
                <br />
                확인해 보세요
              </h1>
              <p className={style.sectionDescription}>
                가장 HOT한 중고거래 물품을&nbsp;
                <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.searchSection}>
        <div className={style.section}>
          <div className={style.section2Search}>
            <div className={style.landingSearch}>
              <p className={style.sectionCategory}>Search</p>
              <h1 className={style.sectionTitle}>
                구매를 원하는&nbsp;
                <br />
                상품을 검색하세요
              </h1>
              <p className={style.sectionDescription}>
                구매하고 싶은 물품은 검색에서&nbsp;
                <br />
                쉽게 찾아보세요
              </p>
            </div>
            <Image className={style.searchImg} src={home2} alt="search-img" />
          </div>
        </div>
      </div>
      <div className={style.registerSection}>
        <div className={style.section}>
          <div className={style.section3Register}>
            <Image className={style.registerImg} src={home3} alt="register-img" />
            <div className={style.register}>
              <p className={style.sectionCategory}>Register</p>
              <h1 className={style.sectionTitle}>
                판매를 원하는&nbsp;
                <br />
                상품을 등록하세요
              </h1>
              <p className={style.sectionDescription}>
                어떤 물건이든 판매하고 싶은 상품을&nbsp;
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.homeBottom}>
        <div className={style.homeBottomImg}>
          <div className={style.bottom}>
            <h1>
              믿을 수 있는&nbsp;
              <br />
              판다마켓 중고 거래
            </h1>
          </div>
          <Image className={style.bottomImg} src={home_bottom} alt="home-bottom" />
        </div>
      </div>
    </div>
  );
}
