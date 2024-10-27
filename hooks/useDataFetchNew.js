import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import useResponsiveItemCount from "./useResponsiveItemCount";

export default function useDataFetch({
  type,
  count = 1,
  order = "recent",
  page = 0,
  keyword = "",
  id = "297f335f-b678-4653-9fe0-186a0e99d037"
}) {
  function convertName() {
    let url;
    switch (type) {
      case "articleBestList":
        url = `/articles?keyword=${keyword}&order=${order}&page=${page}&pageSize=${count}`;
        return url;
      case "articleStandardList":
        url = `/articles?keyword=${keyword}&order=${order}&page =${page}&pageSize=${count}`;
        return url;
      case "articleWithComments":
        url = `/articles/${id}/withcomments?${keyword}order=${order}&page=${page}&pageSize=${count}`;
        return url;
    }
  }
  const [data, setData] = useState();
  const [dataList, setDataList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const url = convertName(type);
  useEffect(() => {
    const dataFetch = async () => {
      const response = await axios.get(url);
      let comments, totalCount, article, articles, products, articleComments;
      switch (type) {
        case "articleWithComments":
          ({ article, articleComments } = response.data);
          ({ comments, totalCount } = articleComments);
          setData(article);
          setDataList(comments);
          setTotalCount(totalCount);
          break;
      }
    };
    dataFetch();
  }, [url, count, order, page, keyword, type]);
  if (type === "articleWithComments") {
    return {
      article: data,
      setArticle: setData,
      articleComments: dataList,
      setArticleComments: setDataList,
      ArticleCommentsTotalCount: totalCount
    };
  }

  return { data, setData };
}
