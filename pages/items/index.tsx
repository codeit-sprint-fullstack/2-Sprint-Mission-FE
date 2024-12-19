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
import { ProductType } from '@/types/type';

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
        bestProducts
      }
    };
  } catch (err) {
    console.error('데이터를 불러오는 중 문제가 발생하였습니다.', err);
    return {
      props: {
        error: '서버에서 데이터를 가져오는 중 문제가 발생했습니다.'
      }
    };
  }
}

interface ProductProps {
  products: ProductType[];
  bestProducts: ProductType[];
  error: string;
}

export default function Product({
  products,
  bestProducts: initialBestProducts,
  error: serverError
}: ProductProps) {
  const [bestProducts] = useState<ProductType[]>(initialBestProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductType[]>(products);

  const resizeContext = useResize();
  if (!resizeContext) return <div>Error: Resize context is not available!</div>;
  const { bestProduct, defaultProduct } = resizeContext;

  const pageSize: number = defaultProduct;
  const bestPageSize: number = bestProduct;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('recent');

  const [loading, setLoading] = useState(true);

  const sortProducts = (products: ProductType[], sortOrder: string) => {
    let sortedProducts = [...products];

    if (sortOrder === 'recent') {
      sortedProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortOrder === 'favorite') {
      sortedProducts.sort((a, b) => b.favoriteCount - a.favoriteCount);
    }

    return sortedProducts;
  };

  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    const sortedProducts = sortProducts(products, sortOrder);
    setFilteredProducts(sortedProducts);
  }, [sortOrder, products]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );

      const sortedFiltered = sortProducts(filtered, sortOrder);
      setFilteredProducts(sortedFiltered);
      setCurrentPage(1);
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const currnetProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) return <Spinner />;
  if (serverError) return <ErrorMessage message={serverError} />;

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
