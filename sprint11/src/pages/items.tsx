import { useEffect, useState } from "react";
import styles from '@/styles/ItemsPage.module.css';
// import useAsync from "@/hooks/useAsync.ts";
import BestItemsList from "@/components/BestItemsList.tsx";
import ItemsList from "@/components/ItemsList.tsx";
import PageNum from "@/components/PageNum.tsx";
import { getProducts } from "@/apis/itemsService.ts";
import { useViewport } from "@/context/ViewportProvider.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import PopUp from "@/components/PopUp.tsx";

// export async function getServerSideProps() {
// 	const { list: bestItems } = await getProducts({ page: 1, pageSize: 4, sort: "favorite", keyword: "" });
// 	const { list: items } = await getProducts({ page: 1, pageSize: 10, sort: "recent", keyword: "" });
// 	return {
// 		props: {
// 			bestItems,
// 			items,
// 		}
// 	}
// }

function ItemsPage() {
	const viewport = useViewport();
	const initialPageBestSize = viewport.device === "PC" ? 4 : viewport.device === "tablet" ? 2 : 1;
	const initialPageSize = viewport.device === "PC" ? 10 : viewport.device === "tablet" ? 6 : 4;
	const [pageBestSize, setPageBestSize] = useState(initialPageBestSize);
	const [bestItems, setBestItems] = useState([]);
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [page, setPage] = useState(1);
	const [pageMax, setPageMax] = useState(10);
	const [items, setItems] = useState([]);
	const [sort, setSort] = useState("recent");
	const [keyword, setKeyword] = useState("");
	// const [isLoadingItems, error, loadItemsAsync, setError] = useAsync(getProducts);
	const { data: result0 } = useQuery({
		queryKey: ["items", page, pageBestSize, "favorite", ""],
		queryFn: () => getProducts({ page, pageSize: pageBestSize, sort: "favorite", keyword: "" }),
		placeholderData: keepPreviousData,
		staleTime: 5 * 60 * 1000,
	});
	const { data: result1 } = useQuery({
		queryKey: ["items", page, pageSize, sort, keyword],
		queryFn: () => getProducts({ page, pageSize, sort, keyword }),
		placeholderData: keepPreviousData,
		staleTime: 5 * 60 * 1000,
	});

	useEffect(() => {
		if (viewport.device === "PC") {
			setPageBestSize(4);
			setPageSize(10);
		}
		else if (viewport.device === "tablet") {
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
			<ItemsList items={items} isLoadingItems={!!false} sort={sort} setSort={setSort} keyword={keyword} setKeyword={setKeyword} />
			<PageNum page={page} setPage={setPage} pageMax={pageMax} />
			{/* <PopUp error={error} setError={setError} /> */}
		</main>
	);
}

export default ItemsPage;
