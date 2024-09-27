import { useEffect, useState, useCallback } from "react";
import styles from './ItemsPage.module.css';
import useAsync from "../hooks/useAsync.js";
import BestItemsList from "../BestItemsList.jsx";
import ItemsList from "../ItemsList.jsx";
import PageNum from "../PageNum.jsx";
import { getProducts } from "../apis/itemsService.js";
import { useViewport } from "../context/ViewportProvider.jsx";

const loadItems = async function (params) { // * { page, pageSize, orderBy, keyword }
	return await getProducts(params);
}


function ItemsPage() {
	const viewport = useViewport();
	const initialPageBestSize = viewport === "PC" ? 4 : viewport === "tablet" ? 2 : 1;
	const initialPageSize = viewport === "PC" ? 10 : viewport === "tablet" ? 6 : 4;
	const [pageBestSize, setPageBestSize] = useState(initialPageBestSize);
	const [bestItems, setBestItems] = useState([]);
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(10);
	const [items, setItems] = useState([]);
	const [orderBy, setOrderBy] = useState("recent");
	const [keyword, setKeyword] = useState("");
	const [isLoadingItems, errorLoadingItems, loadItemsAsync] = useAsync(loadItems);

	const handleSearch = useCallback(async () => {
		try {
			const result1 = await loadItemsAsync({ page: (pageNum-1)*pageSize, pageSize, orderBy, keyword });
			console.log(result1);
			if (!result1) {
				if (errorLoadingItems) {
					setItems([]);
				}
				return;
			}
			setPageNumMax(Math.ceil(result1.totalCount / pageSize));
			setPageNum(1);
			setItems(result1.list);
		}
		catch (err) {
			console.error(err);
		}
	}, [pageNum, pageSize, orderBy, keyword, errorLoadingItems, loadItemsAsync]);

	const handleResize = useCallback(function (viewport) {
		if (viewport === "PC") {
			setPageBestSize(4);
			setPageSize(10);
		}
		else if (viewport === "tablet") {
			setPageBestSize(2);
			setPageSize(6);
		}
		else {
			setPageBestSize(1);
			setPageSize(4);
		}
	}, []);

	useEffect(() => {
		handleResize(viewport);
	}, [viewport, handleResize]);

	useEffect(() => {
		console.log(`useEffect with dependancy [pageBestSize, pageSize, pageNum, orderBy]`);
		(async function () {
			try {
				const result0 = await loadItemsAsync({ page: (pageNum-1)*pageBestSize, pageSize: pageBestSize, orderBy: "favorite", keyword: "" });
				console.log('result0', result0);
				if (!result0) return;

				const result1 = await loadItemsAsync({ page: (pageNum-1)*pageSize, pageSize, orderBy, keyword });
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
	}, [pageBestSize, pageSize, pageNum, orderBy, keyword, loadItemsAsync]);

	return (
		<main className={styles.main}>
			<BestItemsList bestItems={bestItems}/>
			<ItemsList items={items} isLoadingItems={isLoadingItems} orderBy={orderBy} setOrderBy={setOrderBy} keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch}/>
			<PageNum pageNum={pageNum} setPageNum={setPageNum} pageNumMax={pageNumMax}/>
		</main>
	);
}

export default ItemsPage;
