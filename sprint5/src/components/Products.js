function ProductList({ item }) {
  return (
    <div>
      <img src={item.images} alt={`the picture of ${item.title}`} />
      <p>{item.name}</p>
      <p>{item.price}</p>
      <p>{item.favoriteCount}</p>
    </div>
  );
}

function Products({ items }) {
  if (!Array.isArray(items)) {
    return <div>thi is not an array</div>;
  }
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ProductList item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default Products;
