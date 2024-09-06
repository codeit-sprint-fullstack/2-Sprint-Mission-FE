import Item from './Item';

function BestItemsList({ bestItems }) {
	return (
		<section className="sec-best-items">
			<div className="items-head"><h2>베스트 상품</h2><div>{" "}</div></div>
			<ul className="items best">
				{bestItems.map(item => <Item item={item}/>)}
			</ul>
		</section>
	);
}

export default BestItemsList;
