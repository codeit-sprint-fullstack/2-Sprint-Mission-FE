import "./RendingSection2.css";
import checkImg from "../assets/sectionCheckImg.svg";
import searchImg from "../assets/sectionSearchImg.svg";
import registerImg from "../assets/sectionRegisterImg.svg";

export default function RendingSection2() {
  return (
    <section className="rendingSection2">
      <div className="check">
        <div className="checkBox">
          <img className="checkImg" alt="checkImg" src={checkImg} />
          <div className="checkTextBox">
            <h5>Hot item</h5>
            <div className="checkOneText">
              <h2>
                인기 상품을
                <br className="sectionBr" />
                확인해 보세요
              </h2>
              <h4>
                가장 HOT한 중고거래 물품을
                <br />
                판다 마켓에서 확인해 보세요
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="search">
        <div className="searchBox">
          <div className="searchTextBox">
            <h5>Search</h5>
            <div className="searchOneText">
              <h2>
                구매를 원하는
                <br className="sectionBr" />
                상품을 검색하세요
              </h2>
              <h4>
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </h4>
            </div>
          </div>
          <img className="searchImg" alt="searchImg" src={searchImg} />
        </div>
      </div>
      <div className="register">
        <div className="registerBox">
          <img className="registerImg" alt="registerImg" src={registerImg} />
          <div className="registerTextBox">
            <h5>Register</h5>
            <div className="registerOneText">
              <h2>
                판매를 원하는
                <br className="sectionBr" />
                상품을 등록하세요
              </h2>
              <h4>
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록학세요
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
