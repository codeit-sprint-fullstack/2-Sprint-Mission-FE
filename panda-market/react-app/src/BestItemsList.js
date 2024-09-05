import Item from './Item';

function BestItemsList({ bestItems }) {
	return (
		<section className="sec-best-items">
			<h2>베스트 상품</h2>
			<ul className="items best">
				{bestItems.map(item => <Item item={item}/>)}
			</ul>
		</section>
	);
}

export default BestItemsList;
