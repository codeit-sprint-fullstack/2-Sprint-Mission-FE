import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import useAsync from "./hooks/useAsync";
import { getProducts } from "./apis/itemsService";
import BestItemsList from "./BestItemsList";
import ItemsList from "./ItemsList";
import PageNum from "./PageNum";

function ItemsComp() {
	const [pageBestSize, setPageBestSize] = useState(1);
	const [bestItems, setBestItems] = useState([]);
	const [pageSize, setPageSize] = useState(2);
	const [pageNum, setPageNum] = useState(1);
	const [items, setItems] = useState([]);
	const [orderBy, setOrderBy] = useState("recent");
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		window.addEventListener("resize", function () {
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
		});
		window.dispatchEvent(new Event('resize'));
	}, []);

	async function loadBest({ page, pageSize, orderBy, keyword }) {
		return await getProducts({ page, pageSize, orderBy, keyword });
	}

	async function loadItems({ page, pageSize, orderBy, keyword }) {
		return await getProducts({ page, pageSize, orderBy, keyword });
	}

	useEffect(async () => {
		const [isLoadingBest, errorLoadingBest, loadBestAsync] = useAsync(loadBest);
		const [isLoadingItems, errorLoadingItems, loadItemsAsync] = useAsync(loadItems);

		try {
			const result0 = await loadBestAsync({ page: (pageNum-1)*pageBestSize + 1, pageBestSize, orderBy: "favorite", keyword: "" });
			if (!result0) return;
			setBestItems(result0.list);

			const result1 = await loadItemsAsync({ page: (pageNum-1)*pageSize + 1, pageSize, orderBy, keyword });
			if (!result1) return;
			setItems(result1.list);
		}
		catch (err) {
			console.error(err);
		}
	}, [pageBestSize, pageSize, pageNum, orderBy]);

	useEffect(async () => {
		const [isLoadingItems, errorLoadingItems, loadItemsAsync] = useAsync(loadItems);

		try {
			const result1 = await loadItemsAsync({ page: (pageNum-1)*pageSize + 1, pageSize, orderBy, keyword });
			if (!result1) return;
			setItems(result1.list);
		}
		catch (err) {
			console.error(err);
		}
	}, [keyword]);

	return (
	<>
		<Header/>
		<main>
			<BestItemsList bestItems={bestItems}/>
			<ItemsList items={items} orderBy={orderBy} setOrderBy={setOrderBy} pageNum={pageNum} setKeyword={setKeyword}/>
			<PageNum pageNum={pageNum} setPageNum={setPageNum}/>
		</main>
		<Footer/>
	</>);
}

export default ItemsComp;
