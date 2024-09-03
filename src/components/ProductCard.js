import '../css/ProductCard.css';
import { priceFunc } from '../own_func';

function ProductCard({ item, classNames }) {
  const { favoriteCount, price, name, images } = item;
  const imgUrl = images[0];
  const priceString = priceFunc(price);
  const cn = `card ` + classNames;

  return (
    <div className={cn}>
      <img src={imgUrl} alt={name} className="product-img" />
      <div className="product-info">
        <h5 className="title">{name}</h5>
        <p className="price">{priceString}원</p>
        <p className="like">❤️ {favoriteCount}</p>
      </div>
    </div>
  );
}

export default ProductCard;
