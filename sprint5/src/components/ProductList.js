import '../css/ProductList.css';
import { useCallback, useState, useEffect } from 'react';
import useAsync from '../hooks/useAsync';
import { getProductList } from '../api';
import Pagination from './Pagination';
import ProductListBar from './ProductListBar';

function ProductListItem({ item }) {
  const { images, name, price, favoriteCount } = item;

  return (
    <div className="product-item">
      <img className="product-item-img" src={images} alt={name} />
      <div className="product-info">
        <span className="product-name">{name}</span>
        <span className="product-price">{price}원</span>
        <span className="product-favorite">♡ {favoriteCount}</span>
      </div>
    </div>
  );
}

export default function ProductList() {
  const [items, setItems] = useState([]);
  const [isLoading, loadingError, getProductAsync] = useAsync(getProductList);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState('recent');
  const [filteredItems, setFilteredItems] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handlePageSize = () => {
      if (window.innerWidth >= 1200) {
        setPageSize(10);
      } else if (window.innerWidth >= 744) {
        setPageSize(6);
      } else {
        setPageSize(4);
      }
    };
    handlePageSize();
    window.addEventListener('resize', handlePageSize);

    return () => window.removeEventListener('resize', handlePageSize);
  }, []);

  const handleLoad = useCallback(
    async (options) => {
      const result = await getProductAsync(options);
      if (!result) return;

      const products = result;

      const sortedList = products.sort((a, b) => {
        if (sortOrder === 'recent') {
          return b.createdAt - a.createdAt;
        } else if (sortOrder === 'favorite') {
          return b.favoriteCount - a.favoriteCount;
        }
        return 0;
      });

      setItems(sortedList);
    },
    [getProductAsync, sortOrder]
  );

  useEffect(() => {
    handleLoad({ page: currentPage, pageSize: pageSize });
  }, [currentPage, pageSize, handleLoad]);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, keyword]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section>
      <ProductListBar
        value={sortOrder}
        onChange={setSortOrder}
        keyword={keyword}
        onSearch={setKeyword}
      />
      <div className="products">
        <div className="product-list">
          {currentItems.map((item) => (
            <div key={item.id}>
              <ProductListItem item={item} />
            </div>
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
