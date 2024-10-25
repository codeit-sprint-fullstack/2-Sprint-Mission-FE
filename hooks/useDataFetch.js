import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import useResponsiveItemCount from "./useResponsiveItemCount";
export default function useDataFetch({
  model,
  returnName,
  count = 1,
  order = "newest",
  page = 0,
  keyword = ""
}) {
  const [dataList, setDataList] = useState([]);
  const [dataCount, setDataCount] = useState();
  const url = `/${model}?keyword=${keyword}&order=${order}&page=${page}&pageSize=${count}`;
  useEffect(() => {
    const dataFetch = async () => {
      const response = await axios.get(url);
      const responseData = response.data[model];
      const totalCount = response.data.totalCount;
      setDataList(responseData);
      setDataCount(totalCount);
    };
    dataFetch();
  }, [order, count, keyword, page]);
  return { [returnName.list]: dataList, [returnName.count]: dataCount };
}
