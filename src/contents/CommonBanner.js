import styles from "./CommonBanner.module.css";
import checkImage from "./image/check_image.png";
import searchImage from "./image/search_image.png";
import registerImage from "./image/register_image.png";
function CommonBanner({ name }) {
  if (!name) {
    return;
  }
  const br = <br />;
  const checkSeltor = {
    image: checkImage,
    title: "Hot item",
    subtitle: (
      <>
        인기 상품을
        <br /> 확인해보세요
      </>
    ),
    description: (
      <>
        가장 HOT한 중고거래 물품을 <br />
        판다 마켓에서 확인해 보세요
      </>
    )
  };
  const searchSeletor = {
    image: searchImage,
    title: "Search",
    subtitle: (
      <>
        구매를 원하는 <br />
        상품을 검색하세요
      </>
    ),
    description: (
      <>
        구매하고 싶은 물품은 검색해서 <br />
        쉽게 찾아보세요
      </>
    )
  };
  const registerSeletor = {
    image: registerImage,
    title: "Register",
    subtitle: (
      <>
        판매를 원하는 <br />
        상품을 등록하세요
      </>
    ),
    description: (
      <>
        어떤 물건이든 판매하고 싶은 상품을 <br />
        등록하세요
      </>
    )
  };
  const selector = {
    check: checkSeltor,
    search: searchSeletor,
    register: registerSeletor
  };
  const bannerClass =
    name === "search" ? `${styles.banner} ${styles.reverse}` : styles.banner;
  const textBoxSize =
    name === "check"
      ? styles.checkSize
      : name === "search"
      ? styles.searchSize
      : styles.registerSize;
  return (
    <div className={bannerClass}>
      <img
        className={styles.image}
        src={selector[name].image}
        alt={`${name} 이미지`}
      />
      <div className={`${styles.textBox} ${textBoxSize}`}>
        <div className={styles.title}>{selector[name].title}</div>
        <div className={styles.subtitleAndDescriptionConatiner}>
          <div className={styles.subtitle}>{selector[name].subtitle}</div>
          <div className={styles.description}>{selector[name].description}</div>
        </div>
      </div>
    </div>
  );
}
export default CommonBanner;
