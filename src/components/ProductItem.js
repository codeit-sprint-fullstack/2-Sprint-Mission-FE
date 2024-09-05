import priceFunc from "../PriceFunc";
import '../css/ProductItem.css'

export default function ProductItem({ item }) {
  return (
    <div>
      <img className='img' src={item.images} alt='' />
      <div className='textSection'>
        <h2 className='name'>{item.name}</h2>
        <p className='price'>{priceFunc(item.price)}원</p>
        <p className='favoriteCount'>♡ {item.favoriteCount}</p>
      </div>
    </div>
  )
} 