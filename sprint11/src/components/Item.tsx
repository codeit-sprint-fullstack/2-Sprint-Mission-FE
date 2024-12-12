import styles from '@/styles/ItemsPage.module.css';
import Image from 'next/image';
import Link from 'next/link';

function Item({item}) {
	const { id, name, description, images, price, favoriteCount } = item;
	return (<li>
		<div className={styles.imageWrapper}>
			<Image fill src={images[0]} alt={name}/>
		</div>
		<Link href={`/items/${id}`}><div className={styles.name}>{name}</div></Link>
		<div className={styles.description}>{description}</div>
		<div className={styles.price}>{price.toLocaleString('en-US')}원</div>
		<div className={styles.favorite_count}><span className={styles.heart}>♡</span>{" "}{favoriteCount}</div>
	</li>);
}

export default Item;
