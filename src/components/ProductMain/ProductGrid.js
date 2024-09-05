import ProductItem from "./ProductItem";

function ProductGrid( { products } ) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid;