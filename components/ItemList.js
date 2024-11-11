import Image from 'next/image';
import style from './styles/ItemList.module.css';
import img_default from '@/public/img_default.png';
import Link from 'next/link';

export default function BestItem({ products }) {

  return (
      <div className={style.itemList}>
        {products.length > 0 ? (
          products.map((product) => (
            <Link href={`/items/${product.id}`} key={product.id} className={style.itemSection}>
              <div>
                <Image className={style.itemImg} 
                // src={product.images.length > 0 ? product.images[0] : img_default} 
                src={img_default} 
                alt={product.name}
                onError={(e) => e.target.src = img_default} 
                width={300}
                height={300}
                priority
                />
                <p className={style.itemName}>{product.name}</p>
                <p className={style.itemPrice}>{product.price.toLocaleString()}원</p>
                <p className={style.itemFavoriteCount}>♡ {product.favoriteCnt}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>상품이 없습니다.</p> 
        )}
      </div>
  );
}