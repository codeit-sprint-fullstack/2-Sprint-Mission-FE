import { useState, useEffect } from "react";

export default function useGetDataPatch({
  type,
  count = 1,
  order = RECENT,
  page = 0,
  keyword = "",
  id = "297f335f-b678-4653-9fe0-186a0e99d037"
}) {
  const [data, setData] = useState();
  const [dataList, setDataList] = useState([]);
  const [totalCount, setTotalCount] = useState();
}
