import styles from './pages/ItemsPage.module.css';

function Item({item}) {
	const { id, name, images, price, favoriteCount } = item;
	return (<li key={id}>
		<img src={images[0]} alt={name}/>
		<div className={styles.name}>{name}</div>
		<div className={styles.price}>{price.toLocaleString('en-US')}원</div>
		<div className={styles.favorite_count}><span className={styles.heart}>♡</span>{" "}{favoriteCount}</div>
	</li>);
}

export default Item;
