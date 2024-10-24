import { Fragment, useState, useEffect, useCallback } from "react";
import style from "../styles/Market.module.css";
import BestItem from "../components/BestItem";
import ItemList from "../components/ItemList";
import { getProductList } from "@/pages/api/ProductService";
import Pagination from "../components/Pagination";
import Link from "next/link";
import Sort from "@/components/Sort";
import Search from "@/components/Search";

const mobileSize = 743;
const tabletSize = 1199;
const MOBILE_PAGE_SIZE = 4;
const MOBIE_BEST_ITEM_SIZE = 1;
const TABLET_PAGE_SIZE = 6;
const TABLET_BEST_ITEM_SIZE = 2;
const DESKTOP_PAGE_SIZE = 10;
const DESKTOP_BEST_ITEM_SIZE = 4;

function MarketPage() {
  const [order, setOrder] = useState("favorite");
  const [products, setProducts] = useState([]);
  const [search, setSearch ] = useState("");
  const [bestItems, setBestItems] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);
  const [bestItemSize, setBestItemSize] = useState(DESKTOP_BEST_ITEM_SIZE);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= mobileSize) {
        setPageSize(MOBILE_PAGE_SIZE);
        setBestItemSize(MOBIE_BEST_ITEM_SIZE);
      } else if (window.innerWidth <= tabletSize) {
        setPageSize(TABLET_PAGE_SIZE);
        setBestItemSize(TABLET_BEST_ITEM_SIZE);
      } else {
        setPageSize(DESKTOP_PAGE_SIZE);
        setBestItemSize(DESKTOP_BEST_ITEM_SIZE);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // BestItem 데이터만 한 번 로드
  useEffect(() => {
    const fetchBestItems = async () => {
      const { data: productList } = await getProductList({
        orderBy: "favorite",
        pageSize: bestItemSize,
      });
      setBestItems(productList.sort((a, b) => b.favorite - a.favorite));
    };

    fetchBestItems();
  }, [bestItemSize]);

  const handleGetProductList = useCallback(
    async (orderQuery) => {
      let queryParams = {
        orderBy: orderQuery,
        page: currentPage,
        pageSize: pageSize,
      };

      if (search) {
        queryParams.search = search;
      }

      const { data: productList, totalCount: fetchedTotalCount } =
        await getProductList(queryParams);
      setProducts(productList);
      setTotalCount(fetchedTotalCount);
      console.log(productList);
    },
    [search, currentPage, pageSize]
  );

  useEffect(() => {
    handleGetProductList(order);
  }, [order, search, currentPage, pageSize, bestItemSize, handleGetProductList]);

  return (
    <Fragment>
      <div className={style.marketSection}>
        <div className={style.bestSection}>
          <p className={style.bestTitle}>베스트 상품</p>
          <BestItem products={bestItems} className={style.BestItem} />
        </div>
        <div className={style.itemSection}>
          <div className={style.itemSearch}>
            <p className={style.itemTitle}>판매 중인 상품</p>
            <div className={style.sort}>
              <Search 
                setSearch={setSearch} />
              <Link href='/registration'><button className={style.itemRegister}>상품 등록하기</button></Link>
              <Sort
                pageSize={pageSize}
                order={order}
                setOrder={setOrder}
                setCurrentPage={setCurrentPage}
                setIsToggle={setIsToggle}
                isToggle={isToggle}
              />
            </div>
          </div>
          <ItemList products={products} className={style.ItemList} />
        </div>
      </div>
      <Pagination
        className={style.Pagination}
        page={currentPage}
        setPage={setCurrentPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />
    </Fragment>
  );
}

export default MarketPage;