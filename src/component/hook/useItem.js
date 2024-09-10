import { useEffect, useState } from "react";
import axios from "axios";

const useItem = (page = 1, pageSize = 10, orderBy = "recent") => {
  const [item, setItem] = useState([]);
  const [allProduct, setAllProduct] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      setLoadingData(true);
      try {
        const response = await axios.get(
          "https://panda-market-api.vercel.app/products",
          {
            params: { page, pageSize, orderBy },
          }
        );

        if (response.data && Array.isArray(response.data.list)) {
          setItem(response.data.list);
          setAllProduct(response.data.allProduct);
        } else {
          setItem([]);
          setAllProduct(0);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setItem([]);
        setAllProduct(0);
      }
      setLoadingData(false);
    };

    fetchItem();
  }, [page, pageSize, orderBy]);

  return { item, allProduct, loadingData };
};

export default useItem;
