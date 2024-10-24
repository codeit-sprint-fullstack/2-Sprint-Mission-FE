import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.mainBanner}>
        <div className={styles.mainContents}>
          <div className={styles.mainText}>
            <span>일상의 모든 물건을 거래해 보세요</span>
            <span className={styles.shopButton}>구경하러 가기</span>
          </div>
        </div>
      </div>
      <div className={styles.banners}>
        <div className={styles.midBanner}>
          <div className={styles.bannerLeftAligned}>
            <div className={styles.banImg}>
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 588px"
                src="/sBanner1.png"
                alt="banner1"
              />
            </div>
            <div className={styles.leftsided}>
              <div className={styles.title}>Hot item</div>
              <div className={styles.subtitle}>인기 상품을 확인해보세요</div>
              <div className={styles.text}>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </div>
            </div>
          </div>
          <div className={styles.rightAligned}>
            <div className={styles.bannerRightAligned}>
              <div className={styles.rightsided}>
                <div className={styles.title}>Search</div>
                <div className={styles.subtitle}>
                  구매를 원하는 상품을 검색하세요
                </div>
                <div className={styles.text}>
                  구매하고 싶은 물품은 검색해서
                  <br />
                  쉽게 찾아보세요
                </div>
              </div>
              <div className={styles.rightsidedImg}>
                <div className={styles.banImg}>
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, 588px"
                    src="/sBanner2.png"
                    alt="banner2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bannerLeftAligned}>
            <div className={styles.banImg}>
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 588px"
                src="/sBanner3.png"
                alt="banner3"
              />
            </div>
            <div className={styles.leftsided}>
              <div className={styles.title}>Register</div>
              <div className={styles.subtitle}>
                판매를 원하는 상품을 등록하세요
              </div>
              <div className={styles.text}>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBanner}>
        <div className={styles.mainContents}>
          <div className={styles.mainTextBottom}>
            <span>
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
