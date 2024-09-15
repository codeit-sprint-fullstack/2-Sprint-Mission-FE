import { useState, useEffect } from "react";

export default function useOptionProducts(
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
        `https://two-sprint-mission-be-ss9z.onrender.com/products?${query}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setItems(data);
        setTotalCount(139);
      } else {
        setItems([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductList({ page, pageSize, order });
  }, [page, pageSize, order]);
  return { items, totalCount, loading };
}
