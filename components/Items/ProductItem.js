import Image from 'next/image';
import heartIcon from '@/public/images/ic_heart.svg';
import defaultProductImg from '@/public/images/items/img_default_product.png';
import styles from './ProductItem.module.css';

export default function ProductItem({ product, type, priority = false }) {
  // 기본 이미지가 아니라면 product.images[0]을 사용
  const isDefaultImage = !(product.images && product.images[0]?.includes('sprint-fe-project.s3.ap-northeast-2.amazonaws.com'));
  const imageUrl = isDefaultImage ? defaultProductImg : product.images[0];

  const imageSize = type === 'best' ? '(min-width: 1200px) 28.2rem, 34.4rem' : '22.1rem';

  return (
    <div className={`${styles['product-item']}`}>
      <div className={`${styles['image-wrapper']} ${type === 'best' ? styles['best'] : ''}`}>
        <Image
          src={imageUrl}
          alt={product.name}
          className={styles['product-image']}
          priority={priority && !isDefaultImage}
          fill
          sizes={imageSize}
        />
      </div>
      <p className={styles['product-title']}>{product.name}</p>
      <p className={styles['product-price']}>{product.price.toLocaleString()}원</p>
      <div className={styles['product-favorite']}>
        <div className={styles['heart-icon-wrapper']}>
          <Image 
            src={heartIcon} 
            alt="좋아요" 
            className={styles['heart-icon']} 
            fill
            sizes={"1.6rem"}
          />
        </div>
        {product.favoriteCount}
      </div>
    </div>
  );
}