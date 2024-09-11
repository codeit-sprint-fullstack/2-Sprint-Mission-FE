import ProductItem from "./ProductItem";
import '../css/SalesProduct.css'
import SalesProductTitle from "./SalesProductTitle";
import { useCallback, useEffect, useState } from 'react';
import { getProductList } from '../api';
import Pagination from "./Pagination";

const TABLET_WIDTH = 1200
const MOBILE_WIDTH = 744
const PC_PAGE_SIZE = 10
const TABLET_PAGE_SIZE = 6
const MOBILE_PAGE_SIZE = 4
const SORT_ORDER_RECENT = 'recent'

function getPageSize() {
  const width = window.innerWidth;

  if (width >= TABLET_WIDTH) {
    return PC_PAGE_SIZE;
  } else if (width >= MOBILE_WIDTH) {
    return TABLET_PAGE_SIZE;
  } else {
    return MOBILE_PAGE_SIZE;
  }
}

export default function SalesProduct() {
  const [salesItems, setSalesItems] = useState([]);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER_RECENT)
  const [searchText, setSearchText] = useState('')
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(getPageSize);
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_WIDTH);

  const handleSortOrderChange = (order) => setSortOrder(order);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
      setIsMobile(window.innerWidth < MOBILE_WIDTH);
    };

    window.addEventListener("resize", handleResize);

    return () => {window.removeEventListener("resize", handleResize);};
  }, []);

  const handleLoadSalesItem = useCallback(
    async (params) => {
      const data = await getProductList(params);
      if (!data) return;

      setSalesItems(data.list);
      setTotalCount(data.totalCount);
    },
    []
  );

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
    <div className='salesItemSection'>
      <SalesProductTitle 
        onSearchChange={handleSearch} 
        onSortOrderChange={handleSortOrderChange} 
        isMobile={isMobile}
      />
      <div className='salesItems'>
        {salesItems.map((item) => {
          return (
            <li key={item.id}>
              <ProductItem item={item} classNames="SalesProduct" />
            </li>
          )
        })}
      </div>
      <Pagination page={currentPage} setPage={setCurrentPage} totalCount={totalCount} pageSize={pageSize} />
    </div>
  );
}