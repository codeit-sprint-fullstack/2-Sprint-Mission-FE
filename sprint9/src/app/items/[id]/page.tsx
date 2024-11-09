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
  const productData = await getProduct(id);
  const commentData = await getComment(id, 10);

  return (
    <>
      <ProductDetail data={productData} />
      <WriteInquiry id={id} />
      <InquiryList comments={commentData} />
    </>
  );
}
