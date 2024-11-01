import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { useRouter } from "next/router";

export default function Market() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <h1>상세 페이지</h1>
      <ProductDetails productId={id} />
    </>
  );
}
