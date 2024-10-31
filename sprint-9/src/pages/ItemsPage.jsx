import { useEffect, useState } from "react";
import styles from './ItemsPage.module.css';
import useAsync from "../hooks/useAsync.js";
import BestItemsList from "../components/BestItemsList.jsx";
import ItemsList from "../components/ItemsList.jsx";
import PageNum from "../components/PageNum.jsx";
import { getProducts } from "../apis/itemsService.js";
import { useViewport } from "../context/ViewportProvider.jsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PopUp from "../components/PopUp.jsx";

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
	const [orderBy, setOrderBy] = useState("recent");
	const [keyword, setKeyword] = useState("");
	const [isLoadingItems, error, loadItemsAsync, setError] = useAsync(getProducts);
	const { data: result0 } = useQuery({
		queryKey: ["items", page, pageBestSize, "favorite", ""],
		queryFn: () => loadItemsAsync({ page, pageSize: pageBestSize, orderBy: "favorite", keyword: "" }),
		placeholderData: keepPreviousData,
		staleTime: 5 * 60 * 1000,
	});
	console.log(result0);
	const { data: result1 } = useQuery({
		queryKey: ["items", page, pageSize, orderBy, keyword],
		queryFn: () => loadItemsAsync({ page, pageSize, orderBy, keyword }),
		placeholderData: keepPreviousData,
		staleTime: 5 * 60 * 1000,
	});
	console.log(result1);

	useEffect(() => {
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
	}, [viewport]);

	useEffect(() => {
    if (result0) {
      setBestItems(result0.list);
    }
  }, [result0]);

  useEffect(() => {
    if (result1) {
      setPageMax(Math.ceil(result1.totalCount / pageSize));
      setItems(result1.list);
    }
  }, [result1, pageSize]);

	return (
		<main className={styles.main}>
			<BestItemsList bestItems={bestItems} />
			<ItemsList items={items} isLoadingItems={isLoadingItems} orderBy={orderBy} setOrderBy={setOrderBy} keyword={keyword} setKeyword={setKeyword} />
			<PageNum page={page} setPage={setPage} pageMax={pageMax} />
			<PopUp error={error} setError={setError} />
		</main>
	);
}

export default ItemsPage;
