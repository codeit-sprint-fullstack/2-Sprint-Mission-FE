import Image from 'next/image';
import heartIcon from '@/public/images/ic_heart.svg';
import defaultProductImg from '@/public/images/items/img_default_product.png';
import styles from './ProductItem.module.css';

export default function ProductItem({ product, type }) {
  // 코드잇 서버에 해당되지 않는 이미지는 디폴트 이미지로 처리
  const imageUrl = product.images && product.images[0]?.includes('sprint-fe-project.s3.ap-northeast-2.amazonaws.com')
    ? product.images[0]
    : defaultProductImg;

  return (
    <div className={`${styles['product-item']} ${styles[type]}`}>
      <Image
        src={imageUrl}
        alt={product.name}
        width={221}
        height={221}
        className={styles['product-image']}
      />
      <p className={styles['product-title']}>{product.name}</p>
      <p className={styles['product-price']}>{product.price.toLocaleString()}원</p>
      <p className={styles['product-favorite']}>
        <Image src={heartIcon} className={styles['heart-icon']} alt="좋아요" width={16} height={16} /> 
        {product.favoriteCount}
      </p>
    </div>
  );
}
