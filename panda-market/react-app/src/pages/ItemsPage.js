import { useEffect, useState, useCallback } from "react";
import '../items.css';
import Footer from "../Footer.js";
import Header from "../Header.js";
import useAsync from "../hooks/useAsync.js";
import BestItemsList from "../BestItemsList.js";
import ItemsList from "../ItemsList.js";
import PageNum from "../PageNum.js";
import { getProducts } from "../apis/itemsService.js";

const loadItems = async function (params) { // * { page, pageSize, orderBy, keyword }
	return await getProducts(params);
}

const initialPageBestSize = window.innerWidth > 1200 ? 4 : (window.innerWidth > 744 ? 2 : 1);
const initialPageSize = window.innerWidth > 1200 ? 10 : (window.innerWidth > 744 ? 6 : 4);

function ItemsPage() {
	const [pageBestSize, setPageBestSize] = useState(initialPageBestSize);
	const [bestItems, setBestItems] = useState([]);
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(10); // TODO: find pageNumMax from loadItemsAsync data.
	const [items, setItems] = useState([]);
	const [orderBy, setOrderBy] = useState("recent");
	const [keyword, setKeyword] = useState("");
	const [isLoadingItems, errorLoadingItems, loadItemsAsync] = useAsync(loadItems);

	const handleSearch = useCallback(async () => {
		try {
			const result1 = await loadItemsAsync({ page: (pageNum-1)*pageSize + 1, pageSize, orderBy, keyword });
			console.log(result1);
			if (!result1) return;
			setPageNumMax(Math.ceil(result1.totalCount / pageSize));
			setPageNum(1);
			setItems(result1.list);
		}
		catch (err) {
			console.error(err);
		}
	}, [pageNum, pageSize, orderBy, keyword]);

	const handleResize = useCallback(function () {
		if (window.innerWidth > 1200) {
			setPageBestSize(4);
			setPageSize(10);
		}
		else if (window.innerWidth > 744) {
			setPageBestSize(2);
			setPageSize(6);
		}
		else {
			setPageBestSize(1);
			setPageSize(4);
		}
	}, []);

	useEffect(() => {
		console.log(`useEffect with dependancy []`);
		window.addEventListener("resize", handleResize);
		window.dispatchEvent(new Event('resize'));

		return () => {
			console.log(`[] unmounted.`);
		};
	}, [handleResize]);

	useEffect(() => {
		console.log(`useEffect with dependancy [pageBestSize, pageSize, pageNum, orderBy]`);
		(async function () {
			try {
				const result0 = await loadItemsAsync({ page: (pageNum-1)*pageBestSize + 1, pageSize: pageBestSize, orderBy: "favorite", keyword: "" });
				console.log('result0', result0);
				if (!result0) return;

				const result1 = await loadItemsAsync({ page: (pageNum-1)*pageSize + 1, pageSize, orderBy, keyword });
				console.log('result1', result1);
				if (!result1) return;

				setPageNumMax(Math.ceil(result1.totalCount / pageSize));
				setBestItems(result0.list);
				setItems(result1.list);
			}
			catch (err) {
				console.error(err);
			}
		})();

		return () => {
			console.log(`[pageBestSize, pageSize, pageNum, orderBy] unmounted.`);
		};
	}, [pageBestSize, pageSize, pageNum, orderBy]);

	return (
	<div>
		<Header/>
		<main>
			<BestItemsList bestItems={bestItems}/>
			<ItemsList items={items} orderBy={orderBy} setOrderBy={setOrderBy} keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch}/>
			<PageNum pageNum={pageNum} setPageNum={setPageNum} pageNumMax={pageNumMax}/>
		</main>
		<Footer/>
	</div>);
}

export default ItemsPage;
