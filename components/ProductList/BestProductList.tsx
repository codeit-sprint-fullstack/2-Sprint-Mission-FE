import styles from './BestProductList.module.css';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { ProductType } from '@/types/type';

interface BestProductListProps {
  bestProducts: ProductType[];
  bestPageSize: number;
}
export default function BestProductList({
  bestProducts,
  bestPageSize
}: BestProductListProps) {
  return (
    <div className={styles.wrapper}>
      <h1>베스트 상품</h1>
      <div className={styles[`best-products`]}>
        {bestProducts.slice(0, bestPageSize).map((product) => (
          <div key={product.id}>
            <Link href={`/items/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
