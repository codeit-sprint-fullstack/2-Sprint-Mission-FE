import Item from "./Item.js";
import styles from './pages/ItemsPage.module.css';

function ItemsList({ items, orderBy, setOrderBy, keyword, setKeyword, onSearch }) {
	return (
		<section className={[styles.section, styles.sec_items].join(" ")}>
			<div className={styles.items_head}>
				{window.innerWidth > 744 ? <><h2>판매 중인 상품</h2>
				<div className={styles.items_head_query}>
					<div className={styles.input_wrapper}>
						<input type="text" value={keyword} onKeyDown={(e) => {
							if (e.code === "Enter") {
								e.preventDefault();
								onSearch();
							}
						}} onChange={(e) => setKeyword(e.target.value)}/>
						<img src="/images/ic_search.svg" alt="Search" onClick={onSearch}/>
					</div>
					<div className={styles.post_product}>상품 등록하기</div>
					<select className={styles.select_order_by} value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
						<option value="recent">최신순</option>
						<option value="favorite">좋아요순</option>
					</select>
				</div></>
				: <><div className={styles.head_row}>
					<h2>판매 중인 상품</h2>
					<div className={styles.post_product}>상품 등록하기</div>
				</div>
				<div className={styles.head_row}>
					<div className={styles.input_wrapper}>
						<input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
						<img src="/images/ic_search.svg" alt="Search"/>
					</div>
					<select className={styles.select_order_by} value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
						<option value="recent">최신순</option>
						<option value="favorite">좋아요순</option>
					</select>
				</div></>}
			</div>
			<ul className={[styles.items, styles.normal].join(" ")}>
				{items.map(item => <Item item={item}/>)}
			</ul>
		</section>
	);
}

export default ItemsList;
