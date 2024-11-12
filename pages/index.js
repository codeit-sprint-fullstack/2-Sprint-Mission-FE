import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.layout}>
      <section className={styles.banner}>
        <div className={styles[`banner-top-container`]}>
          <div className={styles[`banner-content`]}>
            <h1 className={styles.heading}>
              일상의 모든 물건을 <br className={styles.br} />
              거래해보세요
            </h1>
            <button className={styles.button}>
              <Link href="/items">구경하러 가기</Link>
            </button>
          </div>
          <Image
            src="/images/Img_home_top@2x.png"
            width={746}
            height={340}
            alt="상위 배너 이미지"
            priority
          />
        </div>
      </section>

      <main className={styles.main}>
        <section className={styles[`main-section`]}>
          <div className={styles[`main-container`]}>
            <Image
              src="/images/Img_home_01@2x.png"
              width={588}
              height={444}
              alt="메인 이미지1"
            />
            <div className={styles.content}>
              <div className={styles.bg}>Hot item</div>
              <div className={styles.description}>
                <h1 className={styles.heading}>
                  인기 상품을 <br className={styles.br} />
                  확인해 보세요
                </h1>
                <p>
                  가장 HOT한 중고거래 물품을 <br />
                  판다 마켓에서 확인해 보세요
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles[`main-section`]}>
          <div className={styles[`main-container`]}>
            <div className={styles.content}>
              <div className={styles.bg}>Search</div>
              <div className={styles.description}>
                <h1 className={styles.heading}>
                  구매를 원하는 <br className={styles.br} />
                  상품을 검색하세요
                </h1>
                <p>
                  구매하고 싶은 물품은 검색해서 <br />
                  쉽게 찾아보세요
                </p>
              </div>
            </div>
            <Image
              src="/images/Img_home_02@2x.png"
              width={588}
              height={444}
              alt="메인 이미지2"
            />
          </div>
        </section>

        <section className={styles[`main-section`]}>
          <div className={styles[`main-container`]}>
            <Image
              src="/images/Img_home_03@2x.png"
              width={588}
              height={444}
              alt="메인 이미지3"
            />
            <div className={styles.content}>
              <div className={styles.bg}>Register</div>
              <div className={styles.description}>
                <h1 className={styles.heading}>
                  판매를 원하는 <br className={styles.br} />
                  상품을 등록하세요
                </h1>
                <p>
                  어떤 물건이든 판매하고 싶은 상품을 <br />
                  쉽게 등록하세요
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className={styles.banner}>
        <div className={styles[`banner-bottom-container`]}>
          <h1 className={styles.heading}>
            믿을 수 있는 <br className={styles.br} />
            판다마켓 중고 거래
          </h1>
          <Image
            src="/images/Img_home_bottom@2x.png"
            width={746}
            height={379}
            alt="하위 배너 이미지"
          />
        </div>
      </section>
    </div>
  );
}
