import bannerTopImg from '../images/Img_home_top.png';
import bannerBottomImg from '../images/Img_home_bottom.png';
import mainTopImg from '../images/Img_home_01.png';
import mainMiddleImg from '../images/Img_home_02.png';
import mainBottomImg from '../images/Img_home_03.png';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <section className={styles.banner}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.heading}>
              일상의 모든 물건을 <br className={styles.br} />
              거래해 보세요
            </h1>
            <button className={styles.button}>
              <Link to="/items">구경하러 가기</Link>
            </button>
          </div>
          <img
            className={styles.topImg}
            src={bannerTopImg}
            alt="상위 배너 이미지"
          />
        </div>
      </section>

      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <img className={styles.mainImg} src={mainTopImg} alt="메인 이미지1" />
          <div className={styles.content}>
            <div className={styles.bg}>Hot item</div>
            <h1 className={styles.heading}>
              인기 상품을 <br className={styles.br} />
              확인해 보세요
            </h1>
            <p className={styles.description}>
              가장 HOT한 중고거래 물품을 <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        <div className={styles.mainContainer}>
          <div className={styles.content}>
            <div className={styles.bg}>Search</div>
            <h1 className={styles.heading}>
              구매를 원하는 <br className={styles.br} />
              상품을 검색하세요
            </h1>
            <p className={styles.description}>
              구매하고 싶은 물품은 검색해서 <br />
              쉽게 찾아보세요
            </p>
          </div>
          <img
            className={styles.mainImg}
            src={mainMiddleImg}
            alt="메인 이미지2"
          />
        </div>

        <div className={styles.mainContainer}>
          <img
            className={styles.mainImg}
            src={mainBottomImg}
            alt="메인 이미지3"
          />
          <div className={styles.content}>
            <div className={styles.bg}>Register</div>
            <h1 className={styles.heading}>
              판매를 원하는 <br className={styles.br} />
              상품을 등록하세요
            </h1>
            <p className={styles.description}>
              어떤 물건이든 판매하고 싶은 상품을 <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </main>

      <section className={styles.banner}>
        <div className={styles.container}>
          <h1 className={styles.heading}>
            믿을 수 있는 <br className={styles.br} />
            판다마켓 중고 거래
          </h1>
          <img
            className={styles.bottomImg}
            src={bannerBottomImg}
            alt="하위 배너 이미지"
          />
        </div>
      </section>
    </div>
  );
}
