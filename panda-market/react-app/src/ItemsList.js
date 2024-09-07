import Item from "./Item.js";

function ItemsList({ items, orderBy, setOrderBy, keyword, setKeyword, onSearch }) {
	return (
		<section className="sec-items">
			<div className="items-head">
				{window.innerWidth > 744 ? <><h2>판매 중인 상품</h2>
				<div className="items-head-query">
					<div className="input-wrapper">
						<input type="text" value={keyword} onKeyDown={(e) => {
							if (e.code === "Enter") {
								e.preventDefault();
								onSearch();
							}
						}} onChange={(e) => setKeyword(e.target.value)}/>
						<img src="/images/ic_search.svg" alt="Search" onClick={onSearch}/>
					</div>
					<div className="post-product">상품 등록하기</div>
					<select className="select-order-by" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
						<option value="recent">최신순</option>
						<option value="favorite">좋아요순</option>
					</select>
				</div></>
				: <><div className="head-row">
					<h2>판매 중인 상품</h2>
					<div className="post-product">상품 등록하기</div>
				</div>
				<div className="head-row">
					<div className="input-wrapper">
						<input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
						<img src="/images/ic_search.svg" alt="Search"/>
					</div>
					<select className="select-order-by" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
						<option value="recent">최신순</option>
						<option value="favorite">좋아요순</option>
					</select>
				</div></>}
			</div>
			<ul className="items normal">
				{items.map(item => <Item item={item}/>)}
			</ul>
		</section>
	);
}

export default ItemsList;
