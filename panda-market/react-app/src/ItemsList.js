import Item from "./Item";

function ItemsList({ items, orderBy, setOrderBy, keyword, setKeyword }) {
	return (
		<section className="sec-items">
			<div className="items-head">
				<h2>판매 중인 상품</h2>
				<div>
					<div className="input-wrapper">
						<img src="/images/ic_search.svg" alt="Search"/>
						<input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
					</div>
					<div className="post-product">상품 등록하기</div>
					<select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
						<option value="recent">최신순</option>
						<option value="favorite">좋아요순</option>
					</select>
				</div>
			</div>
			<ul className="items normal">
				{items.map(item => <Item item={item}/>)}
			</ul>
		</section>
	);
}

export default ItemsList;
