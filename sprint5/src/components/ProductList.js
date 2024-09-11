import '../css/ProductList.css';
import { useState } from 'react';
import useQuery from '../hooks/useQuery';
import { getProductList } from '../api';
import Pagination from './Pagination';
import ProductListBar from './ProductListBar';
import useResize from '../hooks/useResize';
import { SortProvider, useSort } from '../contexts/SortContext';

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

function ProductListContent() {
  const { sortOrder } = useSort();
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProductList = () =>
    getProductList({
      page: currentPage,
      pageSize,
      orderBy: sortOrder,
      keyword
    });

  const [data, isLoading, error] = useQuery(fetchProductList);

  // 페이지 사이즈 조정
  const pageSize = useResize();

  // 조건부 렌더링 처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.list) return <div>No data found</div>;

  // 데이터 정렬 및 필터링
  const sortedItems = data.list.sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt); // 날짜 비교로 수정
    }
    if (sortOrder === 'favorite') {
      return b.favoriteCount - a.favoriteCount;
    }
    return 0;
  });

  const filteredItems = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(keyword.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section>
      <ProductListBar keyword={keyword} onSearch={setKeyword} />
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

export default function ProductList() {
  return (
    <SortProvider>
      <ProductListContent />
    </SortProvider>
  );
}
