"use client";

import { useEffect, useState } from "react";
import ProductDetail from "@/src/components/items/ProductDetail";
import WriteInquiry from "@/src/components/items/WriteInquiry";
import InquiryList from "@/src/components/items/InquiryList";
import { useParams } from "next/navigation";
import { getArticle } from "@/src/api/articleServices";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  async function fetchArticle(id: string) {
    const data = await getArticle(id);
    setData(data);
  }

  useEffect(() => {
    if (id) fetchArticle(String(id));
  }, [id]);

  return (
    <>
      <ProductDetail data={data} />
      <WriteInquiry />
    </>
  );
}
