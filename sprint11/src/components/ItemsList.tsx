import Link from "next/link.js";
import Item from "./Item.jsx";
import styles from '@/styles/ItemsPage.module.css';
import { ChangeEvent } from "react";
import { TItem } from "@/types/types.ts";
import Image from "next/image.js";



function ItemsList({ items, isLoadingItems, sort, setSort, keyword, setKeyword }: {
	items: TItem[],
	isLoadingItems: boolean,
	sort: string,
	setSort: (sort: string) => void,
	keyword: string,
	setKeyword: (keyword: string) => void
}) {
	const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	}

	function SelectOrder() {
		return (
			<select className={styles.select_order_by} value={sort} onChange={(e) => setSort(e.target.value)}>
				<option value="recent">최신순</option>
				<option value="favorite">좋아요순</option>
			</select>
		);
	}

	function RegisProduct() {
		return (<Link href="/registration"><div className={styles.post_product}>상품 등록하기</div></Link>);
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
				{/* {window.innerWidth > 744 ?
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
				</> */}
				<>
					<div className={styles.query_heads}>
						<h2>판매 중인 상품</h2>
						<RegisProduct/>
					</div>
					<div className={styles.query_heads}>
						<div className={styles.input_wrapper}>
							<input type="text" value={keyword} onChange={handleKeywordChange}/>
							<button className={styles.img} disabled={isLoadingItems}><Image fill src="/images/ic_search.svg" alt="Search" /></button>
						</div>
						<SelectOrder/>
					</div>
				</>
			</div>
			<ItemList/>
		</section>
	);
}

export default ItemsList;
