import ProductDetail from "@/src/components/items/ProductDetail";
import WriteInquiry from "@/src/components/items/WriteInquiry";
import InquiryList from "@/src/components/items/InquiryList";
import { getProduct } from "@/src/api/productServices";
import { getComment } from "@/src/api/commentServices";

interface ProductDetailPageProps {
  params: { id: string };
}

export default async function ProductDetailPage({
  params: { id }
}: ProductDetailPageProps) {
  const productData = await getProduct(id); // 서버 사이드에서 데이터 바로 가져오기
  const commentData = await getComment(id, 10); // 서버 사이드에서 데이터 바로 가져오기

  return (
    <>
      <ProductDetail data={productData} />
      <WriteInquiry />
      <InquiryList comments={commentData} />
    </>
  );
}
