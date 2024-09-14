import '../css/ItemList.css';
import img_default from '../assets/img/img_default.png';

export default function ItemList({ products }) {

  return (
			<div className='item-list'>
			{products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className='item'>
              <img className='item-img' 
                src={product.images} 
                alt={product.name}
                onError={(e) => e.target.src = img_default} />
              <p className='item-name'>{product.name}</p>
              <p className='item-price'>{product.price.toLocaleString()}원</p>
              <p className='item-favoriteCount'>♡ {product.favoriteCnt}</p>
            </div>
          ))
        ) : (
          <p>상품이 없습니다.</p> 
        )}
			</div>
  );
}