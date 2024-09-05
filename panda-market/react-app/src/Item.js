function Item({item}) {
	const { id, name, images, price, favoriteCount } = item;
	return (<li key={id}>
		<img src={images[0]} alt={name}/>
		<div className="name">{name}</div>
		<div className="price">{price.toLocaleString('en-US')}원</div>
		<div className="favorite-count">♡ {favoriteCount}</div>
	</li>);
}

export default Item;
