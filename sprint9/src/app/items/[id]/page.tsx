import ProductDetail from "@/src/components/items/ProductDetail";
import WriteInquiry from "@/src/components/items/WriteInquiry";
import InquiryList from "@/src/components/items/InquiryList";
import { getProduct } from "@/src/api/productServices";
import { getComment } from "@/src/api/commentServices";
import Modal from "@/src/components/Modal";
import TwoButtonModal from "@/src/components/items/TwoButtonModal";

interface ProductDetailPageProps {
  params: { id: number };
}

export default async function ProductDetailPage({
  params: { id }
}: ProductDetailPageProps) {
  const productData = await getProduct(id);
  const commentData = await getComment(id, 10);

  return (
    <>
      <TwoButtonModal />
      <ProductDetail data={productData} />
      <WriteInquiry id={id} />
      <InquiryList comments={commentData} />
    </>
  );
}
