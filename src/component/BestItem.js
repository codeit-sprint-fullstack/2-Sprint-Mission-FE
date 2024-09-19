import '../css/BestItem.css';
import img_default from '../assets/img/img_default.png';

export default function BestItem({ products }) {

  return (
      <div className='best-item'>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className='item'>
              <img className='img' 
              src={product.images} 
              alt={product.name}
              onError={(e) => e.target.src = img_default} />
              <p className='best-name'>{product.name}</p>
              <p className='best-price'>{product.price.toLocaleString()}원</p>
              <p className='best-favoriteCount'>♡ {product.favoriteCnt}</p>
            </div>
          ))
        ) : (
          <p>상품이 없습니다.</p> 
        )}
      </div>
  );
}
