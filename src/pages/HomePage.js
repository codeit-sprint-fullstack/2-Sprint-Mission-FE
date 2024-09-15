import { Link } from 'react-router-dom'
import homeTopImg from '../image/Img_home_top.png'
import home1Img from '../image/Img_home_01.png'
import home2Img from '../image/Img_home_02.png'
import home3Img from '../image/Img_home_03.png'
import homeBottomImg from '../image/Img_home_bottom.png'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <main className={styles.mainSection}>
    <section id={styles.topSection} className={styles.topBottomSection}>
      <div id={styles.topWrapper} className={styles.wrapper}>
        <div className={styles.textSection}>
          <h1>
            일상의 모든 물건을<br />
            거래해 보세요
          </h1>
          <p><Link id={styles.shoppingButton} className={styles.button} to='/items'>구경하러 가기</Link></p>
        </div>
        <img src={homeTopImg} alt="판다마켓 홈 상단" />
      </div>
    </section>

    <section id={styles.centerSection} className={styles.wrapper}>
      <div id={styles.hotItem} className={styles.centerMainSection}>
        <img src={home1Img} alt="인기 상품" />
        <div className={styles.centerContent}>
          <h2 className={styles.title}>Hot item</h2>
          <h1>
            인기 상품을<br />
            확인해보세요
          </h1>
          <p className={styles.contentDescription}>
            가장 HOT한 중고거래 물품을<br />
            판다 마켓에서 확인해보세요
          </p>
        </div>
      </div>

      <div id={styles.search} className={styles.centerMainSection}>
        <div className={styles.centerContent}>
          <h2 className={styles.title}>Search</h2>
          <h1>
            구매를 원하는<br />
            상품을 검색하세요
          </h1>
          <p className={styles.contentDescription}>
            구매하고 싶은 물품은 검색해서<br />
            쉽게 찾아보세요
          </p>
        </div>
        <img src={home2Img} alt="검색 기능" />
      </div>

      <div id={styles.register} className={styles.centerMainSection}>
        <img src={home3Img} alt="상품 등록" />
        <div className={styles.centerContent}>
          <h2 className={styles.title}>Register</h2>
          <h1>
            판매를 원하는<br /> 
            상품을 등록하세요
          </h1>
          <p className={styles.contentDescription}>
            어떤 물건이든 판매하고 싶은 상품을<br />
            쉽게 등록하세요
          </p>
        </div>
      </div>
    </section>

    <section id={styles.bottomSection} className={styles.topBottomSection}>
      <div id={styles.bottomWrapper} className={styles.wrapper}>
        <div className={styles.textSection}>
          <h1>
            믿을 수 있는<br />
            판다마켓 중고 거래
          </h1>
        </div>
        <img src={homeBottomImg} alt="판다마켓 홈 하단" />
      </div>  
    </section>
  </main>
  )
}