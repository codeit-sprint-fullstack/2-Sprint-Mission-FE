import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import useResponsiveItemCount from "./useResponsiveItemCount";
import { ORDER_STATE, MODEL_TYPE } from "@/constants";
const { RECENT } = ORDER_STATE;
const { ARTICLE_BEST_LIST, ARTICLE_STANDARD_LIST, ARTICLE_WITH_COMMENTS } =
  MODEL_TYPE;
export default function useDataFetch({
  type,
  count = 1,
  order = RECENT,
  page = 0,
  keyword = "",
  id = "297f335f-b678-4653-9fe0-186a0e99d037"
}) {
  function convertName() {
    let model, listName, countName, url;
    switch (type) {
      case ARTICLE_BEST_LIST:
        model = "articles";
        listName = "bestList";
        countName = "bestTotalCount";
        url = `/articles?keyword=${keyword}&order=${order}&page=${page}&pageSize=${count}`;
        return { model, listName, countName, url };
      case ARTICLE_STANDARD_LIST:
        model = "articles";
        listName = "standardList";
        countName = "standardTotalCount";
        url = `/articles?keyword=${keyword}&order=${order}&page =${page}&pageSize=${count}`;
        return { model, listName, countName, url };
      case ARTICLE_WITH_COMMENTS:
        model = "articles";
        listName = "comments";
        countName = "commentTotalCount";
        url = `/articles/${id}/withcomments?order=${order}&page=${page}&pageSize=${count}`;
        return { model, listName, countName, url };
    }
  }
  const { model, listName, countName, url } = convertName(type);
  const [data, setData] = useState({
    products: [],
    articles: [],
    articleComments: [],
    id: "",
    title: "",
    content: "",
    favoriteCount: 0,
    userId: "",
    createdAt: "",
    updatedAt: ""
  });
  useEffect(() => {
    const dataFetch = async () => {
      const response = await axios.get(url);
      const testData = response.data;
      setData(response.data);
    };
    dataFetch();
  }, [url, count, order, page, keyword]);
  return data || {};
}
