import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import useAsync from "./hooks/useAsync";
import itemsService from "./apis/itemsService";
import BestItemsList from "./BestItemsList";
import ItemsList from "./ItemsList";
import PageNum from "./PageNum";

const loadBest = async function (params) { // * { page, pageSize, orderBy, keyword }
	return await itemsService.getProducts(params);
}

const loadItems = async function (params) { // * { page, pageSize, orderBy, keyword }
	return await itemsService.getProducts(params);
}

function ItemsComp() {
	const [pageBestSize, setPageBestSize] = useState(4);
	const [bestItems, setBestItems] = useState([]);
	const [pageSize, setPageSize] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const [items, setItems] = useState([]);
	const [orderBy, setOrderBy] = useState("recent");
	const [keyword, setKeyword] = useState("");
	const [isLoadingBest, errorLoadingBest, loadBestAsync] = useAsync(loadBest);
	const [isLoadingItems, errorLoadingItems, loadItemsAsync] = useAsync(loadItems);

	const handleSearch = async () => {
		try {
			const result1 = await loadItemsAsync({ page: (pageNum-1)*pageSize + 1, pageSize, orderBy, keyword });
			if (!result1) return;
			console.log(result1.data.list);
			setItems(result1.data.list);
		}
		catch (err) {
			console.error(err);
		}
	};

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

		const searchButton = document.querySelector(".input-wrapper>img");
		searchButton.addEventListener("click", handleSearch);
		const searchInput = document.querySelector(".input-wrapper>input");
		searchInput.addEventListener("input", (e) => {
			if (e.code === "Enter") {
				e.preventDefault();
				handleSearch();
			}
		})
	}, []);

	useEffect(async () => {
		try {
			console.log("pageBestSize", pageBestSize);
			const result0 = await loadBestAsync({ page: (pageNum-1)*pageBestSize + 1, pageSize: pageBestSize, orderBy: "favorite", keyword: "" });
			if (!result0) return;
			console.log("Best Items: ", result0.data.list);
			setBestItems(items => result0.data.list);

			const result1 = await loadItemsAsync({ page: (pageNum-1)*pageSize + 1, pageSize, orderBy, keyword });
			if (!result1) return;
			console.log("Items: ", result1.data.list);
			setItems(items => result1.data.list);
		}
		catch (err) {
			console.error(err);
		}
	}, [pageBestSize, pageSize, pageNum, orderBy]);

	return (
	<>
		<Header/>
		<main>
			<BestItemsList bestItems={bestItems}/>
			<ItemsList items={items} orderBy={orderBy} setOrderBy={setOrderBy} keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch}/>
			<PageNum pageNum={pageNum} setPageNum={setPageNum}/>
		</main>
		<Footer/>
	</>);
}

export default ItemsComp;
