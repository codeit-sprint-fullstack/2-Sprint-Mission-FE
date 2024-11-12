import styles from './ProductList.module.css';
import Link from 'next/link';
import ProductCard from './ProductCard';

export default function ProductList({ products = [] }) {
  return (
    <div className={styles.products}>
      {products.map((product) => (
        <div key={product.id}>
          <Link href={`/items/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        </div>
      ))}
    </div>
  );
}
