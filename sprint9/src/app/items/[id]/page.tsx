import ProductDetail from "@/src/components/items/ProductDetail";
import WriteInquiry from "@/src/components/items/WriteInquiry";
import InquiryList from "@/src/components/items/InquiryList";
import { getProduct } from "@/src/api/productServices";

interface ArticleDetailPageProps {
  params: { id: string };
}

export default async function ArticleDetailPage({
  params
}: ArticleDetailPageProps) {
  const { id } = params;
  const data = await getProduct(id); // 서버 사이드에서 데이터 바로 가져오기

  return (
    <>
      <ProductDetail data={data} />
      <WriteInquiry />
      {/* <InquiryList productId={id} /> */}
    </>
  );
}
