import ProductItem from "./ProductItem";
import '../css/SalesProduct.css'
import SalesProductTitle from "./SalesProductTitle";

export default function SalesProduct({ items }) {

  return (
    <div className='salesItemSection'>
      <SalesProductTitle />
      <div className='salesItems'>
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