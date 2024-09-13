import { Link } from "react-router-dom";
import Item from "./Item.js";
import styles from './pages/ItemsPage.module.css';

function ItemsList({ items, orderBy, setOrderBy, keyword, setKeyword, onSearch }) {
	return (
		<section className={[styles.section, styles.sec_items].join(" ")}>
			<div className={styles.items_head}>
				<h2>판매 중인 상품</h2>
				<div className={styles.head_blank}>{" "}</div>
				<div className={styles.input_wrapper}>
					<input type="text" value={keyword} onKeyDown={(e) => {
						if (e.code === "Enter") {
							e.preventDefault();
							onSearch();
						}
					}} onChange={(e) => setKeyword(e.target.value)}/>
					<img src="/images/ic_search.svg" alt="Search" onClick={onSearch}/>
				</div>
				<Link to="/registration"><div className={styles.post_product}>상품 등록하기</div></Link>
				<select className={styles.select_order_by} value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
					<option value="recent">최신순</option>
					<option value="favorite">좋아요순</option>
				</select>
			</div>
			<ul className={[styles.items, styles.normal].join(" ")}>
				{items.map(item => <Item key={item.id} item={item}/>)}
			</ul>
		</section>
	);
}

export default ItemsList;