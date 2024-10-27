import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import useResponsiveItemCount from "./useResponsiveItemCount";

export default function useDataFetch({
  type,
  count = 1,
  order = "recent",
  page = 0,
  keyword = "",
  id
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
        url = `/articles/${id}/withcomments?order=${order}&page=${page}&pageSize=${count}`;
        return url;
    }
  }
  const [data, setData] = useState();
  const [dataList, setDataList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const url = convertName(type);
  useEffect(() => {
    const dataFetch = async () => {
      console.log(url);
      const response = await axios.get(url);
      let comments, totalCount, article, articles, products, articleComments;
      switch (type) {
        case "articleWithComments":
          ({ article, articleComments } = response.data);
          ({ comments, totalCount } = articleComments);
          console.log(article);
          console.log(comments);
          console.log(totalCount);
          setData(article);
          setDataList(comments);
          setTotalCount(totalCount);
          break;
      }
    };
    if (id) dataFetch();
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
