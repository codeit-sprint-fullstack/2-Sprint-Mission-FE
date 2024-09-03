import '../css/ProductsOnSale.css';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import ProductOnSaleTitle from './ProductOnSaleTitle';

function ProductsOnSale({
  items,
  totalCount,
  onSearch,
  onSortOrderChange,
  onPageChange
}) {
  return (
    <section id="productOnSale">
      <ProductOnSaleTitle
        onSearch={onSearch}
        onSortOrderChange={onSortOrderChange}
      />
      <div id="productOnSaleItems">
        {items.map((item) => {
          return (
            <ProductCard classNames="productOnSale" item={item} key={item.id} />
          );
        })}
      </div>
      <Pagination totalCount={totalCount} onPageChange={onPageChange} />
    </section>
  );
}

export default ProductsOnSale;
