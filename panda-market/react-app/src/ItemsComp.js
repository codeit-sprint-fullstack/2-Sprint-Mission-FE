import { useEffect, useState } from "react";
import Footer from "./Footer.js";
import Header from "./Header.js";
import useAsync from "./hooks/useAsync.js";
import itemsService from "./apis/itemsService.js";
import BestItemsList from "./BestItemsList.js";
import ItemsList from "./ItemsList.js";
import PageNum from "./PageNum.js";

const loadBest = async function (params) { // * { page, pageSize, orderBy, keyword }
	return await itemsService.getProducts(params);
}

const loadItems = async function (params) { // * { page, pageSize, orderBy, keyword }
	return await itemsService.getProducts(params);
}

const initialPageBestSize = window.innerWidth > 1200 ? 4 : (window.innerWidth > 744 ? 2 : 1);
const initialPageSize = window.innerWidth > 1200 ? 10 : (window.innerWidth > 744 ? 6 : 4);

function ItemsComp() {
	const [pageBestSize, setPageBestSize] = useState(initialPageBestSize);
	const [bestItems, setBestItems] = useState([]);
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [pageNum, setPageNum] = useState(1);
	const [items, setItems] = useState([]);
	const [orderBy, setOrderBy] = useState("recent");
	const [keyword, setKeyword] = useState("");
	const [isLoadingBest, errorLoadingBest, loadBestAsync] = useAsync(loadBest);
	const [isLoadingItems, errorLoadingItems, loadItemsAsync] = useAsync(loadItems);

	const handleSearch = async () => {
		try {
			const result1 = await loadItemsAsync({ page: (pageNum-1)*pageSize + 1, pageSize, orderBy, keyword });
			console.log(result1);
			if (!result1) return;
			setItems(result1.list);
		}
		catch (err) {
			console.error(err);
		}
	};

	let pageNumMax = 10; // TODO: find pageNumMax from loadItemsAsync data.
	const centerize = async (pageN) => {
		setPageNum(pageN);
		const pagenation = document.querySelector(".pagenation");
		if (pageN <= 1) {
			pagenation.innerHTML = `<div class="disabled">&lt;</div><div class="selected">1</div>${pageNumMax < 2 ? "" : `<div>2</div>`}${pageNumMax < 3 ? "" : `<div>3</div>`}${pageNumMax < 4 ? "" : `<div>4</div>`}${pageNumMax < 5 ? "" : `<div>5</div>`}<div${pageNumMax <= 5 ? ` class="disabled"` : ""}>&gt;</div$>`;
		}
		else if (pageN <= pageNumMax && pageN === 2) {
			pagenation.innerHTML = `<div class="disabled">&lt;</div><div>1</div><div class="selected">2</div>${pageNumMax < 3 ? "" : `<div>3</div>`}${pageNumMax < 4 ? "" : `<div>4</div>`}${pageNumMax < 5 ? "" : `<div>5</div>`}<div${pageNumMax <= 5 ? ` class="disabled"` : ""}>&gt;</div$>`;
		}
		else if (pageN <= pageNumMax && pageN === 3) {
			pagenation.innerHTML = `<div class="disabled">&lt;</div><div>1</div><div>2</div><div class="selected">3</div>${pageNumMax < 4 ? "" : `<div>4</div>`}${pageNumMax < 5 ? "" : `<div>5</div>`}<div${pageNumMax <= 5 ? ` class="disabled"` : ""}>&gt;</div$>`;
		}
		else if (pageN < pageNumMax - 2 && pageN > 3) {
			pagenation.innerHTML = `<div>&lt;</div><div>${pageN - 2}</div><div>${pageN - 1}</div><div class="selected">${pageN}</div><div>${pageN + 1}</div><div>${pageN + 2}</div><div>&gt;</div>`;
		}
		else if (pageN === pageNumMax - 2) {
			pagenation.innerHTML = `<div>&lt;</div><div>${pageN - 2}</div><div>${pageN - 1}</div><div class="selected">${pageN}</div><div>${pageN + 1}</div><div>${pageN + 2}</div><div class="disabled">&gt;</div>`;
		}
		else if (pageN === pageNumMax - 1) {
			pagenation.innerHTML = `<div>&lt;</div><div>${pageN - 3}</div><div>${pageN - 2}</div><div>${pageN - 1}</div><div class="selected">${pageN}</div><div>${pageN + 1}</div><div class="disabled">&gt;</div>`;
		}
		else if (pageN >= pageNumMax) {
			pagenation.innerHTML = `<div>&lt;</div><div>${pageNumMax - 4}</div><div>${pageNumMax - 3}</div><div>${pageNumMax - 2}</div><div>${pageNumMax - 1}</div><div class="selected">${pageNumMax}</div><div class="disabled">&gt;</div>`;
		}
	};

	useEffect(() => {
		console.log(`useEffect with dependancy []`, document.querySelector("#root").innerHTML);
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

		const searchButton = document.querySelector(".input-wrapper img");
		searchButton.addEventListener("click", handleSearch);
		const searchInput = document.querySelector(".input-wrapper input");
		searchInput.addEventListener("input", (e) => {
			if (e.code === "Enter") {
				e.preventDefault();
				handleSearch();
			}
		});
		const pagenation = document.querySelector(".pagenation");
		pagenation.addEventListener("click", (event) => {
			const pages = document.querySelectorAll(".pagenation>div");
			const target = event.target;
			const pageN = Number(target.innerText);
			if (isNaN(pageN)) {
				if (!target.classList.contains("disabled")) {
					if (target.innerText === "&lt;" || target.innerText === "<") {
						centerize(Number(pages[1].innerText) - 1);
					}
					else if (target.innerText === "&gt;" || target.innerText === ">") {
						centerize(Number(pages[5].innerText) + 1);
					}
				}
			}
			else {
				centerize(pageN);
			}
		});
		centerize(pageNum);

		return () => {
			console.log(`[] unmounted.`);
		};
	}, []);

	useEffect(async () => {
		console.log(`useEffect with dependancy [pageBestSize, pageSize, pageNum, orderBy]`, document.querySelector("#root").innerHTML);
		try {
			console.log("pageBestSize", pageBestSize);
			const result0 = await loadBestAsync({ page: (pageNum-1)*pageBestSize + 1, pageSize: pageBestSize, orderBy: "favorite", keyword: "" });
			if (!result0) return;
			console.log("Best Items: ", result0);

			const result1 = await loadItemsAsync({ page: (pageNum-1)*pageSize + 1, pageSize, orderBy, keyword });
			if (!result1) return;
			console.log("Items: ", result1);

			setBestItems(result0.list);
			setItems(result1.list);
			centerize(pageNum);
		}
		catch (err) {
			console.error(err);
		}

		return () => {
			console.log(`[pageBestSize, pageSize, pageNum, orderBy] unmounted..`);
			setBestItems([]);
			setItems([]);
		};
	}, [pageBestSize, pageSize, pageNum, orderBy]);

	return (
	<div>
		<Header/>
		<main>
			<BestItemsList bestItems={bestItems}/>
			<ItemsList items={items} orderBy={orderBy} setOrderBy={setOrderBy} keyword={keyword} setKeyword={setKeyword} onSearch={handleSearch}/>
			<PageNum pageNum={pageNum} setPageNum={setPageNum}/>
		</main>
		<Footer/>
	</div>);
}

export default ItemsComp;
