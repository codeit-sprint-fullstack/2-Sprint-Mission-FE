import { useState, useEffect } from "react";
import { MODEL_TYPE, ORDER_STATE } from "@/constants";
import {
  getArticles,
  getProducts,
  getArticleWithComments,
  getProductWithComments
} from "@/api/api";
const {
  ARTICLE_LIST,
  ARTICLE_WITH_COMMENTS,
  PRODUCT_LIST,
  PRODUCT_WITH_COMMENTS
} = MODEL_TYPE;
const { RECENT, FAVORITESET } = ORDER_STATE;

export default function useGetData({
  type,
  count,
  order = RECENT,
  page = 0,
  keyword = "",
  id
}) {
  const [data, setData] = useState({});
  const [dataList, setDataList] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [totalPage, setTotalPage] = useState();
  const convertType = () => {
    switch (type) {
      case PRODUCT_LIST:
        return {
          getData: getProducts,
          params: {
            page,
            pageSize: count,
            order,
            keyword
          }
        };
      case PRODUCT_WITH_COMMENTS:
        return {
          getData: getProductWithComments,
          params: { id, params: { order, pageSize: count } }
        };
      case ARTICLE_LIST:
        return {
          getData: getArticles,
          params: {
            page,
            pageSize: count,
            order,
            keyword
          }
        };
      case ARTICLE_WITH_COMMENTS:
        return {
          getData: getArticleWithComments,
          params: { id, params: { order, pageSize: count } }
        };
    }
  };
  const { getData, params } = convertType();
  useEffect(() => {
    const applyGetData = async () => {
      if (!id && type === ARTICLE_WITH_COMMENTS) return;
      if (!id && type === PRODUCT_WITH_COMMENTS) return;
      const response = await getData(params);
      const data = response.data;
      const {
        products,
        articles,
        totalCount,
        articleComments,
        productComments,
        ...other
      } = response.data || {};
      const { article, product } = other || {};
      const { comments } = articleComments || productComments || {};
      const nextTotalPage = Math.ceil(totalCount / count);
      switch (type) {
        case PRODUCT_LIST:
          setDataList(products);
          setTotalPage(nextTotalPage);
          break;
        case ARTICLE_LIST:
          setDataList(articles);
          setTotalPage(nextTotalPage);
          break;
        case ARTICLE_WITH_COMMENTS:
          setData(article);
          setDataList(comments);
          break;
        case PRODUCT_WITH_COMMENTS:
          setData(product);
          setDataList(comments);
          break;
      }
    };
    if (
      (!count && type !== ARTICLE_WITH_COMMENTS) ||
      type !== PRODUCT_WITH_COMMENTS
    ) {
      setDataList([]);
      setTotalPage(0);
    } else applyGetData();
  }, [page, count, keyword, order, id]);
  if (type === PRODUCT_LIST) return { productList: dataList, totalPage };
  if (type === ARTICLE_LIST) return { articleList: dataList, totalPage };
  if (type === ARTICLE_WITH_COMMENTS)
    return { article: data, articleComments: dataList };
  if (type === PRODUCT_WITH_COMMENTS)
    return { product: data, productComments: dataList };
}
