import ProductItem from './ProductItem';
import '../css/BestProduct.css';

export default function BestProduct({ items }) {

  return (
    <div className='bestItemSection'>
      <h1 className='title'>베스트 상품</h1>
      <div className='bestItems'>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <ProductItem item={item} />
            </li>
          )
        })}
      </div>
    </div>
  );
}