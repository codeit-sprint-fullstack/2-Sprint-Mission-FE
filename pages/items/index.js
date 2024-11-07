import styles from '@/styles/Product.module.css';
import { useState, useEffect } from 'react';
import { getProductList, getProductCount } from '@/lib/api/ProductService';
import ProductList from '@/components/ProductList/ProductList';
import BestProductList from '@/components/ProductList/BestProductList';
import ProductHeader from '@/components/ProductList/ProductHeader';
import Pagination from '@/components/Common/Pagination';
import { useResize } from '@/lib/contexts/useResize';
import Spinner from '@/components/Common/Spinner';
import ErrorMessage from '@/components/Common/ErrorMessage';

export async function getServerSideProps() {
  try {
    const totalCount = await getProductCount();
    const products = await getProductList({ page: 1, pageSize: totalCount });

    const bestProducts = await getProductList({
      page: 1,
      pageSize: 4,
      orderBy: 'favorite'
    });

    return {
      props: {
        products,
        bestProducts,
        totalCount
      }
    };
  } catch (err) {
    console.error('데이터를 불러오는 중 문제가 발생하였습니다.', err);
    throw new Error(
      '서버에서 데이터를 가져오는 중 문제가 발생했습니다.' + err.message
    );
  }
}

export default function Product({
  products,
  bestProducts: initialBestProducts,
  totalCount
}) {
  const [bestProducts] = useState(initialBestProducts);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const { bestProduct, defaultProduct } = useResize();
  const pageSize = defaultProduct;
  const bestPageSize = bestProduct;

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProductList({
          page: 1,
          pageSize: totalCount
        });
        setFilteredProducts(fetchedProducts);
      } catch (err) {
        setError('상품 목록을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortProducts = (products, sortOrder) => {
    let sortedProducts = [...products];

    if (sortOrder === 'recent') {
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOrder === 'favorite') {
      sortedProducts.sort((a, b) => b.favoriteCount - a.favoriteCount);
    }

    return sortedProducts;
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );

      const sortedFiltered = sortProducts(filtered, sortOrder);
      setFilteredProducts(sortedFiltered);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    const sortedProducts = sortProducts(filteredProducts, sortOrder);
    setFilteredProducts(sortedProducts);
  }, [sortOrder]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const currnetProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) return <Spinner />;
  if (!error) return <ErrorMessage message={error} />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <BestProductList
          bestProducts={bestProducts || []}
          bestPageSize={bestPageSize}
        />
        <div className={styles.products}>
          <ProductHeader
            keyword={keyword}
            onSearch={setKeyword}
            onKeyDown={handleSearch}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <ProductList products={currnetProducts || []} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
