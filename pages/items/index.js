// /pages/items/index.js
import { useEffect, useState } from 'react';
import ProductList from '@/components/Items/ProductList';
import useMaxItems from '@/hooks/useMaxItems';
import { useProductList } from '@/lib/hooks/useProductHooks';

export default function ItemPage() {
  const maxProductCount = useMaxItems() || 10; // 기본 값을 10으로 설정
  const { data: products, isLoading, isError } = useProductList(1, maxProductCount, "recent");

  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    if (products) {
      setDisplayedProducts(products.slice(0, maxProductCount));
    }
  }, [products, maxProductCount]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <div>
      <ProductList products={displayedProducts} />
    </div>
  );
}
