import { useState, useEffect } from "react";

export default function useOprtionProducts(
  page = 1,
  pageSize = 10,
  order = "createdAt"
) {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  async function getProductList({ page, pageSize, order }) {
    setLoading(true);
    const query = `page=${page}&pageSize=${pageSize}&order=${order}`;
    try {
      const response = await fetch(
        `https://panda-market-api.vercel.app/products?${query}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data) {
        setItems(data.list);
        setTotalCount(data.totalCount);
      } else {
        setItems([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error("Error fetching items:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    getProductList({ page, pageSize, order });
  }, [page, pageSize, order]);
  return { items, totalCount, loading };
}
