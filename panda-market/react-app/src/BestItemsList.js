import Item from './Item.js';
import styles from './pages/ItemsPage.module.css';

function BestItemsList({ bestItems }) {
	return (
		<section className={[styles.section, styles.sec_best_items].join(" ")}>
			<div className={styles.items_head}><h2>베스트 상품</h2><div>{" "}</div></div>
			<ul className={[styles.items, styles.best].join(" ")}>
				{bestItems.map(item => <Item key={item._id} item={item}/>)}
			</ul>
		</section>
	);
}

export default BestItemsList;
