import { TItem } from '@/types/types.js';
import Item from './Item.jsx';
import styles from '@/styles/ItemsPage.module.css';

function BestItemsList({ bestItems }: {
	bestItems: TItem[]
}) {
	return (
		<section className={[styles.section, styles.sec_best_items].join(" ")}>
			<div className={styles.items_head}><h2>베스트 상품</h2><div>{" "}</div></div>
			<ul className={[styles.items, styles.best].join(" ")}>
				{bestItems.map(item => <Item key={item.id} item={item}/>)}
			</ul>
		</section>
	);
}

export default BestItemsList;
