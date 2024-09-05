import Item from "./Item";

function ItemsList({ items }) {
	return (
		<ul className="items">
			{items.map((item) => {
				return (<Item item={item}/>);
			})}
		</ul>
	);
}

export default ItemsList;
