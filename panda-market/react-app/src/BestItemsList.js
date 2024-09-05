import './BestItemsList.css';
import Item from './Item';

function BestItemsList({ bestItems }) {
	return (
		<ul className="best-items">
			{bestItems.map(item => <Item item={item}/>)}
		</ul>
	);
}

export default BestItemsList;
