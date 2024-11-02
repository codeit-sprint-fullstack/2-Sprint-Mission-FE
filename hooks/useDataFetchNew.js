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
  id
}) {
  function convertName() {
    let url;
    switch (type) {
      case ARTICLE_BEST_LIST:
        url = `/articles?keyword=${keyword}&order=${order}&page=${page}&pageSize=${count}`;
        return url;
      case ARTICLE_STANDARD_LIST:
        url = `/articles?keyword=${keyword}&order=${order}&page =${page}&pageSize=${count}`;
        return url;
      case ARTICLE_WITH_COMMENTS:
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
        case ARTICLE_WITH_COMMENTS:
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
  if (type === ARTICLE_WITH_COMMENTS) {
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
