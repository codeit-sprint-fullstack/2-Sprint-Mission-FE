import './BestItemsList.css';
import Item from './Item';

function BestItemsList({ bestItems, pageNum, pageBestSize }) {
	return (
		<ul className="best-items">
			{bestItems.map((item) => {
				return (<Item item={item}/>);
			})}
		</ul>
	);
}

export default BestItemsList;
