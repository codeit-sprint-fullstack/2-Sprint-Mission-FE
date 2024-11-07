import styles from './ProductCard.module.css';
import Image from 'next/image';
import formatPrice from '@/lib/formatPrice';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [imageSrc, setImageSrc] = useState(
    product?.images?.[0] || '/images/Property 1=md-1.png'
  );

  const handleError = () => {
    setImageSrc('/images/Property 1=md-1.png');
  };

  return (
    <div className={styles.product}>
      <div className={styles[`img-wrap`]}>
        <img
          className={styles.img}
          src={imageSrc}
          onError={handleError}
          alt="상품 이미지"
        />
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.price}>{formatPrice(product.price)}원</span>
        <div className={styles.favorite}>
          <Image
            src="/images/ic_heart.png"
            width={16}
            height={16}
            alt="좋아요 아이콘"
          />
          <span className={styles.favoriteCount}>{product.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}
