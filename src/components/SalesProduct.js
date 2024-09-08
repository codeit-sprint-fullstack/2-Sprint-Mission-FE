import ProductItem from "./ProductItem";
import '../css/SalesProduct.css'
import SalesProductTitle from "./SalesProductTitle";
import { useCallback, useEffect, useState } from 'react';
import { getProductList } from '../api';
import Pagination from "./Pagination";

export default function SalesProduct() {
  const [salesItems, setSalesItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent')
  const [searchText, setSearchText] = useState('')
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)

  const handleSortOrderChange = (order) => setSortOrder(order);
  

  const handleLoadSalesItem = useCallback(
    async (params) => {
      const data = await getProductList(params);
      if (!data) return;

      setSalesItems(data.list);
      setTotalCount(data.totalCount);
    },
    [getProductList]
  );

  const handleSearch = (keyword) => setSearchText(keyword);
  useEffect(() => {
    handleLoadSalesItem({
      page: currentPage,
      pageSize: 10,
      orderBy: sortOrder,
      keyword: searchText,
    });
  }, [currentPage, sortOrder, searchText]);
  
  return (
    <div className='salesItemSection'>
      <SalesProductTitle 
        onSearchChange={handleSearch} 
        onSortOrderChange={handleSortOrderChange} 
      />
      <div className='salesItems'>
        {salesItems.map((item) => {
          return (
            <li key={item.id}>
              <ProductItem item={item} />
            </li>
          )
        })}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalCount={totalCount} />
    </div>
  );
}