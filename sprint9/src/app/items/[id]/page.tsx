"use Client";

import ProductDetail from "@/src/components/items/ProductDetail";
import WriteInquiry from "@/src/components/items/WriteInquiry";
import InquiryList from "@/src/components/items/InquiryList";
export default function ArticleDetailPage() {
  return (
    <>
      <h1>Item ID</h1>
      <ProductDetail />
      <WriteInquiry />
    </>
  );
}
