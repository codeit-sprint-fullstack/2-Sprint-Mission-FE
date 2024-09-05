import SortOrder from "./SortOredr";
import '../css/SalesProductTitle.css';

export default function SalesProductTitle() {
  return (
    <div className="salesProductTitle">
      <h1 className='title'>판매 중인 상품</h1>
      <input
      className="searchArea"
      type="text"
      placeholder="검색할 상품을 입력해주세요"
      ></input>
      <button className="registButton">상품 등록하기</button>
      <SortOrder />
    </div>
  )
}