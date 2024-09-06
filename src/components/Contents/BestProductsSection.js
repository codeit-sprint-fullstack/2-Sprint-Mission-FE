import "./style/BestProductsSection.css";
import CategoryTitle from "./CategoryTitle.js";
import BestProductsList from "./BestProductsList.js";

function BestProductsSection({ bestList }) {
  return (
    <div id="best-products-section">
      <CategoryTitle>베스트 상품</CategoryTitle>
      <BestProductsList bestList={bestList} />
    </div>
  );
}
export default BestProductsSection;
