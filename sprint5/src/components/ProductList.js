// function ProductListItem({ item }) {
//   const { images, name, price, favoriteCount } = item;
//   return (
//     <div className="ProductListItem">
//       <img className="ProductListItem-img" src={images} alt={name} />
//       <div>
//         <div>{name}</div>
//         <div>{price}</div>
//         <div>{favoriteCount}</div>
//       </div>
//     </div>
//   );
// }

// export default function ProductList({ items }) {
//   return (
//     <div className="ProductList">
//       {items.map((item) => {
//         return (
//           <div key={item.id}>
//             <ProductListItem item={item} />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

function ProductListItem({ item }) {
  const { images, name, price, favoriteCount, createdAt } = item;

  return (
    <div className="ProductListItem">
      <img src={images} alt={name} />
      <div>{name}</div>
      <div>{price}</div>
      <div>{favoriteCount}</div>
      <div>{createdAt}</div>
    </div>
  );
}

export default function ProductList({ items }) {
  return (
    <div className="ProductList">
      {items.map((item) => (
        <div key={item.id}>
          <ProductListItem item={item} />
        </div>
      ))}
    </div>
  );
}
