import ProductItem from "./ProductItem.js";
import styles from "./SalesProduct.module.css";
import SalesProductTitle from "./SalesProductTitle.js";
import { useCallback, useEffect, useState } from "react";
import { getProductList } from "../api.js";
import Pagination from "./Pagination.js";

function getPageSize() {
  const width = window.innerWidth;

  if (width >= 1200) {
    return 10;
  } else if (width >= 744) {
    return 6;
  } else {
    return 4;
  }
}

export default function SalesProduct() {
  const [salesItems, setSalesItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("recent");
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(getPageSize);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 743);

  const handleSortOrderChange = (order) => setSortOrder(order);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
      setIsMobile(window.innerWidth <= 743);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLoadSalesItem = useCallback(async (params) => {
    const data = await getProductList(params);
    if (!data) return;

    setSalesItems(data.list);
    setTotalCount(data.totalCount);
  }, []);

  const handleSearch = (keyword) => setSearchText(keyword);
  useEffect(() => {
    handleLoadSalesItem({
      page: currentPage,
      pageSize: pageSize,
      orderBy: sortOrder,
      keyword: searchText,
    });
  }, [currentPage, pageSize, sortOrder, searchText, handleLoadSalesItem]);

  return (
    <div className={styles.salesItemSection}>
      <SalesProductTitle
        onSearchChange={handleSearch}
        onSortOrderChange={handleSortOrderChange}
        isMobile={isMobile}
      />
      <div className={styles.salesItems}>
        {salesItems.map((item) => {
          return (
            <li key={item.id}>
              <ProductItem item={item} classNames="SalesProduct" />
            </li>
          );
        })}
      </div>
      <Pagination
        page={currentPage}
        setPage={setCurrentPage}
        totalCount={totalCount}
        pageSize={pageSize}
      />
    </div>
  );
}
