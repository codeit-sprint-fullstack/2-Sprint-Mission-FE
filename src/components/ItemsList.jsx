import { Link } from "react-router-dom";
import Item from "./Item.jsx";
import styles from '../pages/ItemsPage.module.css';



function ItemsList({ items, isLoadingItems, orderBy, setOrderBy, keyword, setKeyword }) {
	const handleKeywordChange = (e) => {
		setKeyword(e.target.value);
	}

	function SelectOrder() {
		return (
			<select className={styles.select_order_by} value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
				<option value="recent">최신순</option>
				<option value="favorite">좋아요순</option>
			</select>
		);
	}

	function RegisProduct() {
		return (<Link to="/registration"><div className={styles.post_product}>상품 등록하기</div></Link>);
	}

	function ItemList() {
		return (
			<ul className={[styles.items, styles.normal].join(" ")}>
				{items.map(item => <Item key={item.id} item={item}/>)}
			</ul>
		);
	}

	return (
		<section className={[styles.section, styles.sec_items].join(" ")}>
			<div className={styles.items_head}>
				{window.innerWidth > 744 ?
				<>
					<h2>판매 중인 상품</h2>
					<div className={styles.query_heads}>
						<div className={styles.input_wrapper}>
							<input type="text" value={keyword} onChange={handleKeywordChange}/>
							<img src="/images/ic_search.svg" alt="Search" disabled={isLoadingItems} />
						</div>
						<RegisProduct/>
						<SelectOrder/>
					</div>
				</>
				:<>
					<div className={styles.query_heads}>
						<h2>판매 중인 상품</h2>
						<RegisProduct/>
					</div>
					<div className={styles.query_heads}>
						<div className={styles.input_wrapper}>
							<input type="text" value={keyword} onChange={handleKeywordChange}/>
							<img src="/images/ic_search.svg" alt="Search" disabled={isLoadingItems} />
						</div>
						<SelectOrder/>
					</div>
				</>
				}
			</div>
			<ItemList/>
		</section>
	);
}

export default ItemsList;
