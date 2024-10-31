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
	const [page, setPage] = useState(1);
	const [pageMax, setPageMax] = useState(10);
	const [items, setItems] = useState([]);
	const [sort, setSort] = useState("recent");
	const [keyword, setKeyword] = useState("");
	const [isLoadingItems, errorLoadingItems, loadItemsAsync] = useAsync(loadItems);

	const handleSearch = useCallback(async (keyword) => {
		try {
			setPage(1);
			const result1 = await loadItemsAsync({ page, pageSize, sort, keyword });
			console.log(result1);
			if (!result1) {
				if (errorLoadingItems) {
					setItems([{name: errorLoadingItems.name, description: errorLoadingItems.message}]);
				}
				return;
			}
			setPageMax(Math.ceil(result1.totalCount / pageSize));
			setItems(result1.list);
		}
		catch (err) {
			console.error(err);
		}
	}, [page, pageSize, sort, errorLoadingItems, loadItemsAsync]);

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
		(async function () {
			try {
				const result0 = await loadItemsAsync({ page, pageSize: pageBestSize, sort: "favorite", keyword });
				if (!result0) return;

				const result1 = await loadItemsAsync({ page, pageSize, sort, keyword });
				if (!result1) return;

				setPageMax(Math.ceil(result1.totalCount / pageSize));
				setBestItems(result0.list);
				setItems(result1.list);
			}
			catch (err) {
				console.error(err);
			}
		})();
	}, [pageBestSize, pageSize, page, sort, loadItemsAsync]);

	return (
		<main className={styles.main}>
			<BestItemsList bestItems={bestItems}/>
			<ItemsList items={items} isLoadingItems={isLoadingItems} orderBy={sort} setOrderBy={setSort} keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch}/>
			<PageNum pageNum={page} setPageNum={setPage} pageNumMax={pageMax}/>
		</main>
	);
}

export default ItemsPage;
