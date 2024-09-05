import { Fragment, useState, useEffect, useCallback } from "react";
import "../css/App.css";
import ic_arrow_down from '../assets/img/ic_arrow_down.png';
import ic_search from '../assets/img/ic_search.png';
import Footer from "./Footer";
import Nav from "./Nav";
import BestItem from "./BestItem";
import ItemList from "./ItemList";
import { getProductList } from "../api/ProductService";
import Pagination from "./Pagination";

function App() {
  const [order, setOrder] = useState("favorite");
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [bestItems, setBestItems] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalCount, setTotalCount] = useState(1); 

  // BestItem 데이터만 한 번 로드
  useEffect(() => {
    const fetchBestItems = async () => {
      const { list: productList } = await getProductList({ orderBy: "favorite" });
      setBestItems(productList.sort((a, b) => b.favorite - a.favorite).slice(0, 4));
    };

    fetchBestItems();
  }, []);

  const sortedProducts = products.sort((a, b) => a[order] - b[order]);

  const handleNewesClick = () => {
    setOrder("recent");
    setIsToggle(false);
    setCurrentPage(1);
  };

  const handleBestClick = () => {
    setOrder("favorite");
    setIsToggle(false);
    setCurrentPage(1);
  };

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const toggleSortMenu = () => setIsToggle(!isToggle);

  const handleGetProductList = useCallback(async (orderQuery) => {
    let queryParams = { orderBy: orderQuery, page: currentPage, pageSize: 10 };

    if (keyword) {
      queryParams.keyword = keyword;
    }

    const { list: productList, totalCount: fetchedTotalCount } = await getProductList(queryParams);
    setProducts(productList);
    setTotalCount(fetchedTotalCount);
    // console.log(productList);
  }, [keyword, currentPage]);

  useEffect(() => {
    handleGetProductList(order, currentPage);
  }, [order, keyword, currentPage, handleGetProductList]);

  return (
    <Fragment>
      <Nav className="Nav" />
      <div className="section">
        <div className="best-section">
          <p className="best-title">베스트 상품</p>
          <BestItem
            products={bestItems}
            className="BestItem"
          />
        </div>
        <div className="item-section">
          <div className="item-search">
            <p className="item-title">판매 중인 상품</p>
            <div className="sort">
              <div className='search-group'>
                <img className='search-icon' src={ic_search} alt='ic_search' />
                <input
                  className="search"
                  placeholder="검색할 상품을 입력해주세요"
                  value={keyword}
                  onChange={handleKeywordChange}
                ></input>
              </div>
              <button className="item-register">상품 등록하기</button>
              <div className="sort-menu">
                <button className="sort-toggle" onClick={toggleSortMenu}>
                  {order === 'favorite' ? <p>좋아요순</p> : <p>최신순</p>}
                  <img className='arrow' src={ic_arrow_down} alt='ic_arrow_down'></img>
                </button>
                {isToggle && (
                  <div className="sort-options">
                    <button className="sort-button" onClick={handleNewesClick}>최신순</button>
                    <span />
                    <button className="sort-button" onClick={handleBestClick}>좋아요순</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ItemList products={sortedProducts} className="ItemList" />
        </div>
      </div>
      <Pagination className='Pagination' page={currentPage} setPage={setCurrentPage} totalCount={totalCount} />
      <Footer className="Footer" />
    </Fragment>
  );
}

export default App;
