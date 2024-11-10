import { useProductList } from '@/lib/hooks/useProductHooks';
import useMaxItems from '@/hooks/useMaxItems';
import ProductItem from './ProductItem';
import styles from './BestProductList.module.css';
import Link from 'next/link';

export default function BestProductList() {
  // 좋아요 순으로 베스트 상품 목록을 가져오기 위해 "BestproductCount" 사용
  const maxItems = useMaxItems("bestProductCount");
  const { data: bestProducts, isLoading, isError } = useProductList(1, maxItems, 'favorite');

  if (isLoading) return <p>베스트 상품을 불러오는 중입니다...</p>;
  if (isError) return <p>베스트 상품을 불러오는 데 문제가 발생했습니다.</p>;

  return (
    <div className={styles['product-list-container']}>
      <h3 className={styles['product-section-title']}>베스트 상품</h3>
      <div className={styles['product-grid']}>
        {bestProducts.map((product) => (
          <Link key={product.id} href={`/items/${product.id}`}>
            <ProductItem  product={product} type="best" />
          </Link>
        ))}
      </div>
    </div>
  );
}
